const User = require('../models/User');
const Customer = require('../models/Customer');
const Labourer = require('../models/Labourer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sendOtpToMobile } = require('../utils/twilio');
const { OAuth2Client } = require('google-auth-library');
const { addRevokedToken } = require('../utils/tokens');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { sendEmail } = require('../utils/nodemailer');
const otpTemplate = require('../utils/otpTemplate');




exports.registerOrLogin = async (req, res) => {
    try {
        const { email, mobileNumber, idToken } = req.body;

        let user;

        // 🔹 Case 1: Google Login
        if (idToken) {
            const ticket = await client.verifyIdToken({
                idToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const { sub: googleId, email } = payload;

            user = await User.findOne({ $or: [{ googleId }, { email }] });

            if (!user) {
                user = new User({
                    email,
                    googleId,
                    role: "Customer",
                    isActive: true,
                });
                await user.save();
            }

            const token = jwt.sign(
                { userId: user._id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            return res.status(200).json({
                message: "Google login successful",
                token,
                user,
            });
        }

        // 🔹 Case 2: Mobile Number (OTP flow)
        if (mobileNumber) {
            user = await User.findOne({ mobileNumber });

            if (!user) {
                user = new User({
                    mobileNumber,
                    role: "Customer",
                    isActive: true,
                });
                await user.save();
            }

            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const expiryTime = new Date(Date.now() + 1 * 60 * 1000);

            user.otp = otp;
            user.otpExpiry = expiryTime;
            await user.save();
            const message = `Your OTP code is ${otp}. It will expire in 1 minutes.`;
            await sendOtpToMobile(mobileNumber, message);

            return res.status(200).json({
                message: "OTP sent to mobile number",
                userId: user._id,
            });
        }

        // 🔹 Case 3: Email (OTP flow)
        if (email) {
            user = await User.findOne({ email });

            if (!user) {
                user = new User({
                    email,
                    role: "Customer",
                    isActive: true,
                });
                await user.save();
            }

            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const expiryTime = new Date(Date.now() + 1 * 60 * 1000);

            user.otp = otp;
            user.otpExpiry = expiryTime;
            await user.save();

            await sendEmail(email, 'Apna Labour -  OTP', otpTemplate(otp));

            return res.status(200).json({
                message: "OTP sent to email",
                userId: user._id,
            });
        }

        return res.status(400).json({ message: "Provide mobileNumber, email, or idToken" });
    } catch (err) {
        console.error("Auth error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

exports.verifyOtp = async (req, res) => {
    try {
        const { userId, otp } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.otp !== otp || new Date() > user.otpExpiry) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // clear OTP
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        const token = jwt.sign(
            { userId: user._id, email: user.email, mobileNumber: user.mobileNumber, role: user.role },
            process.env.JWT_SECRET
        );

        res.status(200).json({
            message: "Login  successfully",
            token,
            user,
        });
    } catch (err) {
        console.error("Verify OTP error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
exports.resendOtp = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Generate new OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryTime = new Date(Date.now() + 1 * 60 * 1000); // valid for 1 minute

        user.otp = otp;
        user.otpExpiry = expiryTime;
        await user.save();

        if (user.mobileNumber) {
            const message = `Your OTP code is ${otp}. It will expire in 1 minutes.`;
            await sendOtpToMobile(user.mobileNumber, message);
        } else if (user.email) {
            await sendEmail(user.email, 'Apna Labour - OTP', otpTemplate(otp));
        } else {
            return res.status(400).json({ message: "No email or mobile linked to this account" });
        }

        return res.status(200).json({
            message: "OTP resent successfully",
            userId: user._id
        });

    } catch (err) {
        console.error("Resend OTP error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};



exports.logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        addRevokedToken(token)
        res.status(200).json({ message: "Logout successful" })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.status })
    }
};


// exports.forgotPassword = async (req, res) => {
//     try {
//         const { email } = req.body;
//         if (!email) { return res.status(400).json({ message: "Please provide the email" }) }

//         const user = await User.findOne({ email });
//         if (!user) { return res.status(404).json({ message: "No user found with the email, please provide a valid email" }) }

//         const otp = Math.floor(100000 + Math.random() * 999999).toString();
//         const expiryTime = new Date(Date.now() + 5 * 60 * 1000);

//         user.otp = otp;
//         user.otpExpiry = expiryTime
//         user.save()

//         await sendEmail(email, 'Apna Labour - Password Reset OTP', otpTemplate(otp));

//         res.status(200).json({ message: "OTP has been sent to your email (valid for 5 minutes)" })
//     }
//     catch (err) {
//         return res.status(500).json({ message: "Internal server error", error: err.status })
//     }
// };


// exports.resetPassword = async (req, res) => {
//     try {
//         const { email, otp, password } = req.body;
//         if (!email || !otp || !password) { return res.status(400).json({ message: "Please provide all the details to reset password" }) }

//         const user = await User.findOne({ email });
//         if (!user) { return res.status(404).json({ message: "Invalid email" }) }

//         if (otp != user.otp) { return res.status(400).json({ message: 'Invalid otp' }) }

//         const hpass = bcrypt.hashSync(password, 10);

//         user.password = hpass;
//         user.otp = undefined;
//         user.otpExpiry = undefined
//         user.save()

//         res.status(200).json({ message: "Password reset successfully" })
//     }
//     catch (err) {
//         return res.status(500).json({ message: "Internal server error", error: err.status })
//     }
// };                                        