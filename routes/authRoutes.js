const express = require('express');
const { signUp, verifyEmail, login, logout, allEmployees } = require('../controllers/authController');
const { authenticateUser } = require('../middleware/verifyToken');
const { authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.post('/signup',signUp);
// router.post('/verify-email',verifyEmail);
router.post('/login',login);
router.get('/logout',authenticateUser,logout);

router.get('/all-employees',authenticateUser,authorizeRoles('Manager'),allEmployees)




module.exports = router;