const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, default: null },
    mobileNumber: { type: String, sparse: true, default: null },
    email: { type: String, sparse: true, default: null },
    role: { type: String, enum: ['Admin', 'Customer', 'Labourer'], default: 'Customer' },
    isActive: { type: Boolean, default: true },
    password: { type: String, default: null },
    ID: { type: String, default: null },
    // For Google login
    googleId: { type: String, sparse: true, default: null },
    picture: { type: String, default: null },

    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);