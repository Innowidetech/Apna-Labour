const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email address'],
        sparse: true
    },
    password: { type: String },
    mobileNumber: { type: String, unique: true, sparse: true },
    role: { type: String, enum: ['Admin', 'Customer', 'Labourer'] },
    isActive: { type: Boolean, default: true },

    // 🔹 For Google login
    googleId: { type: String, unique: true, sparse: true },
    picture: { type: String },  // Google profile image

    otp: { type: String },
    otpExpiry: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
