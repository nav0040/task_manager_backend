const jwt = require('jsonwebtoken');

exports.generateTokenAndSetCookie = (res,userId)=>{
    const token = jwt.sign({ userId}, process.env.JWT_SECRET,{
        expiresIn:"7d",
    });


    res.cookie('token',token,{
        secure: process.env.NODE_ENV === 'production',
        maxAge:7 * 24 * 60 * 60 * 1000,
        sameSite: 'None',
    });

    return token;
};