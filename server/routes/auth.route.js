const express = require('express');
const { registerOrLogin, verifyOtp, logout, forgotPassword, resetPassword } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();

//router.post('/registration', register);
router.post('/login', registerOrLogin);
router.post('/verify-otp', verifyOtp);
router.post('/logout', protect, logout);
//router.post('/forgot-password', forgotPassword);
//router.post('/reset-password', resetPassword);

module.exports = router;
