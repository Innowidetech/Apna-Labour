const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    image: { type: String }, // store image URL or file path
    gender: { type: String, enum: ['Male', 'Female'] },
    phoneNumber: { type: String },
    email: { type: String, unique: true, sparse: true, lowercase: true, trim: true, match: [/\S+@\S+\.\S+/, 'Invalid email address'] },
    address: {
        HNo: { type: String },
        buildingName: { type: String },
        street: { type: String },
        area: { type: String },
        landmark: { type: String },
        townCity: { type: String },
        pincode: { type: Number },
        state: { type: String },
        location: { // cache coordinates
            lat: { type: Number },
            lng: { type: Number }
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Customer', CustomerSchema);
