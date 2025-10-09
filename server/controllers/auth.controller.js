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

        // -------------------------------
        // Google Login
        // -------------------------------
        if (idToken) {
            const ticket = await client.verifyIdToken({
                idToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const { sub: googleId, email, name, picture } = payload;

            // Find existing user by googleId or email
            user = await User.findOne({ $or: [{ googleId }, { email }] });

            if (user) {
                // Update missing fields if empty
                if (!user.googleId) user.googleId = googleId;
                if (!user.name) user.name = name;
                if (!user.picture) user.picture = picture;
                if (!user.email) user.email = email;
                await user.save();
            } else {
                // Create new only if user does not exist
                user = new User({
                    googleId,
                    email,
                    name,
                    picture,
                    role: "Customer",
                    isActive: true,
                });
                await user.save();
            }

            const token = jwt.sign(
                { userId: user._id, email: user.email, role: user.role },
                process.env.JWT_SECRET
            );

            return res.status(200).json({
                message: "Google login successful",
                token,
                user,
            });
        }

        // -------------------------------
        // Mobile Number OTP Login
        // -------------------------------
        if (mobileNumber) {
            user = await User.findOne({ $or: [{ mobileNumber }, { email }] });

            if (!user) {
                // Create only if not exist
                user = new User({
                    mobileNumber,
                    role: "Customer",
                    isActive: true,
                });
                await user.save();
            } else {
                // Update mobileNumber if empty
                if (!user.mobileNumber) {
                    user.mobileNumber = mobileNumber;
                    await user.save();
                }
            }

            // Generate OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            user.otp = otp;
            user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
            await user.save();

            await sendOtpToMobile(mobileNumber, `Your OTP code is ${otp}. It will expire in 5 minutes.`);

            return res.status(200).json({
                message: "OTP sent to mobile number",
                userId: user._id,
            });
        }

        // -------------------------------
        // Email OTP Login
        // -------------------------------
        if (email) {
            user = await User.findOne({ $or: [{ email }, { mobileNumber }] });

            if (!user) {
                user = new User({
                    email,
                    role: "Customer",
                    isActive: true,
                });
                await user.save();
            } else {
                // Update email if empty
                if (!user.email) {
                    user.email = email;
                    await user.save();
                }
            }

            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            user.otp = otp;
            user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
            await user.save();

            await sendEmail(email, 'Apna Labour - OTP', otpTemplate(otp));

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
// controllers/authController.js
exports.verifyOtp = async (req, res) => {
    try {
        const { userId, otp } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if OTP is expired
        if (!user.otp || !user.otpExpiry || user.otpExpiry < new Date()) {
            user.otp = null;
            user.otpExpiry = null;
            await user.save();
            return res.status(400).json({ message: "OTP expired" });
        }

        // Check if OTP matches
        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // ✅ OTP is correct → clear it after successful login
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET
        );

        return res.status(200).json({ message: "OTP verified", token, user });
    } catch (err) {
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

