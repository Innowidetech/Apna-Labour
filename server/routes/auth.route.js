const express = require('express');
const { googleLogin, otpLogin, registerOrLogin, verifyOtp, logout, forgotPassword, resetPassword, adminLogin,
    resendOtp } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();



//router.post('/registration', register);
router.post('/login', registerOrLogin);
router.post('/verify-otp', verifyOtp);
router.post("/resend-otp", resendOtp);
router.post('/logout', protect, logout);
router.post('/admin/login', adminLogin);
//router.post('/forgot-password', forgotPassword);
//router.post('/reset-password', resetPassword);

module.exports = router;
