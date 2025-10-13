const mongoose = require("mongoose");

const RefundSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        bookingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            required: true
        },

        paymentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment",
            required: false // optional, in case of COD
        },

        // Refund Reason
        reason: { type: String, required: false },
        message: { type: String, required: false },

        // Refund Info
        refund: {
            mode: {
                type: String,
                enum: ["bank_transfer", "original_payment_method", "wallet"],
                required: true
            },
            bankDetails: {
                bankName: { type: String },
                accountNumber: { type: String },
                accountHolderName: { type: String },
                ifscCode: { type: String }
            }
        },

        // Refund Status Tracking
        status: {
            type: String,
            enum: ["requested", "approved", "rejected", "processed"],
            default: "requested"
        },

        processedAt: { type: Date },
        refundAmount: { type: Number },

        adminNote: { type: String } // for admin comments during review
    },
    { timestamps: true }
);

module.exports = mongoose.model("Refund", RefundSchema);