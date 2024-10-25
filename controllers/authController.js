const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { generateTokenAndSetCookie } = require("../utils/generateTokenAndSetCookie");
const { sendVerificationEmail } = require("../helpers/mailer");


exports.signUp = async (req, res) => {
    try {

        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            throw new Error("All fields are required");
        }

        const userAlreadyExists = await User.findOne({ email });


        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            password: hashedPassword,
            name,
            
        });


        await user.save();

        generateTokenAndSetCookie(res, user._id);

        // await sendVerificationEmail(user.email, user.name, verificationToken);

        res.status(201).json({
            success: true,
            message: 'User saved successfully',
            user: {
                ...user._doc,
                password: undefined,
            }
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });

    }
}





exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("All fields are required");
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = generateTokenAndSetCookie(res, user._id);
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined,
                token
            },
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });

    }
}

exports.logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
};


exports.allEmployees = async (req, res) => {
    try {

        const employees = await User.find({ role: "Employee" }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, employees })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });

    }
}