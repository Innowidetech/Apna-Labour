const express = require('express');
const { googleLogin, otpLogin, verifyOtp, logout, forgotPassword, resetPassword, resendOtp } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();



//router.post('/registration', register);
router.post('/google-login', googleLogin);
router.post('/login', otpLogin);
router.post('/verify-otp', verifyOtp);
router.post("/resend-otp", resendOtp);
router.post('/logout', protect, logout);
//router.post('/forgot-password', forgotPassword);
//router.post('/reset-password', resetPassword);

module.exports = router;
