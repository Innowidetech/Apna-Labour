const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        items: [
            {
                unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],

        // Price details
        subtotal: { type: Number, required: true },
        tax: { type: Number, required: true },
        tip: { type: Number, default: 0 },
        totalAmount: { type: Number, required: true },

        // Booking details
        bookingDate: { type: Date },
        timeSlot: { type: String }, // e.g., "8:00 AM - 9:00 AM"


        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Cancelled"],
            default: "Pending",
        },

        // Payment details (for Razorpay verification)
        paymentId: { type: String }, // Razorpay payment id
        orderId: { type: String },   // Razorpay order id
        signature: { type: String }, // Razorpay signature

        paymentMethod: { type: String, enum: ["Razorpay", "COD"], required: true },

        bookedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
