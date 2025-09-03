const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true, required: true, trim: true, match: [/\S+@\S+\.\S+/, 'Invalid email address'] },
    password: { type: String, required: true },
    mobileNumber: { type: String, required: true, unique: true },
    role: { type: String, enum: ['Admin', 'Customer', 'Labourer'] },
    isActive: { type: Boolean },
    otp: { type: 'String' },
    otpExpiry: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);