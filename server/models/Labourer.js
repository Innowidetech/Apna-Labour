const mongoose = require('mongoose');

const LabourerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    registrationType: {
        type: String,
        enum: ['Professional', 'Individual', 'Team'],
        required: true
    },

    subject: { type: String, default: '' },
    message: { type: String, default: '' },

    serviceCity: { type: String, required: true },

    address: {
        type: String,
        required: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'
    }

}, { timestamps: true });

module.exports = mongoose.model('Labourer', LabourerSchema);
