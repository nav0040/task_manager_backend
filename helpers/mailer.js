const nodemailer = require('nodemailer');
const { VERIFICATION_EMAIL_TEMPLATE } = require('./emailTemplate');

exports.sendVerificationEmail = async (email, name, verificationToken) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        // port: 587,
        // secure: false,
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const info = await transporter.sendMail({
        from: "Task Manager",
        to: email,
        subject: "Task Manager Account verification",
        // text: data.text,
        html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
        

    });

    console.log("Message Send: ", info.messageId);
    console.log("Preview Url: ", nodemailer.getTestMessageUrl(info));


}


exports.sendWelcomeEmail = async (email, name) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        // port: 587,
        // secure: false,
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const info = await transporter.sendMail({
        from: "Task Manager",
        to: email,
        subject: "Welcome to Task Manager",
        // text: data.text,
        html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
        

    });

    console.log("Message Send: ", info.messageId);
    console.log("Preview Url: ", nodemailer.getTestMessageUrl(info));


}