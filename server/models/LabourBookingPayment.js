const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const LabourBookingPaymentSchema = new mongoose.Schema({
    paymentNo: {
        type: String,
        unique: true,
        default: () => "LBP-" + uuidv4().split("-")[0].toUpperCase()
    },

    labourerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Labourer',
        required: true
    },

    labourBookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'labourBooking',
        required: true
    },

    // Amount paid to labourer
    labourAmount: { type: Number, required: true },

    // Admin commission (20% of totalCost)
    adminCommission: { type: Number, required: true },

    paymentMethod: {
        type: String,
        enum: ['Bank Transfer', 'UPI', 'Wallet', 'Cash'],
        default: 'Bank Transfer'
    },

    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending'
    },

    paidAt: { type: Date },
    notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('LabourBookingPayment', LabourBookingPaymentSchema);
