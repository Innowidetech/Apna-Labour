const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    subject: {
        type: String,
        enum: ['General Enquiry', 'Worker sign up', 'Account & billing enquiry', 'Feedback'],
        required: true
    },
    message: { type: String, required: true },
    name: { type: String, required: true },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email address'],
        required: false // email optional
    },
    mobileNumber: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);