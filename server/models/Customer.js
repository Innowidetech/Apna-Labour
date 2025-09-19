const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    image: { type: String }, // store image URL or file path
    gender: { type: String, enum: ['Male', 'Female'] },
    phoneNumber: { type: String },
    email: { type: String },
    address: {
        HNo: { type: String },
        street: { type: String },
        area: { type: String },
        landmark: { type: String },
        townCity: { type: String },
        pincode: { type: Number },
        state: { type: String },
    }
}, { timestamps: true });

module.exports = mongoose.model('Customer', CustomerSchema);
