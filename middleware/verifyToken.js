const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticateUser  = async (req, res, next) => {
  const token = req.cookies.token;
  // console.log(req.cookies.token);

  if (!token) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });

    // console.log(decoded);

    req.user = await User.findById(decoded.userId);
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });

  }

}