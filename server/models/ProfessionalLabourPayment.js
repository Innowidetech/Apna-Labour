const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ProfessionalLabourPaymentSchema = new mongoose.Schema({
    paymentNo: {
        type: String,
        default: () => "PLP-" + uuidv4().split("-")[0].toUpperCase()
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    labourerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },

    // Amount paid to labourer
    labourAmount: { type: Number, required: true },

    // Admin commission (20% of remaining after tax/booking charge)
    adminCommission: { type: Number, required: true },

    paymentMethod: {
        type: String,
        enum: ['Razorpay', 'Bank Transfer', 'UPI', 'Wallet', 'Cash'],
        default: 'Razorpay'
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },

    paymentStatus: {
        type: String,
        enum: ['Unpaid', 'Pending', 'Paid', 'Failed'],
        default: 'Unpaid'
    },

    paidAt: { type: Date },
    notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('ProfessionalLabourPayment', ProfessionalLabourPaymentSchema);
