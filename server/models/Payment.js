// models/Payment.js
const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    amount: { type: Number, required: true },

    orderId: { type: String },   // Razorpay order id
    paymentId: { type: String }, // Razorpay payment id
    signature: { type: String }, // Razorpay signature

    status: {
        type: String,
        enum: ["created", "paid", "failed", "refunded"],
        default: "created"
    }
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);
