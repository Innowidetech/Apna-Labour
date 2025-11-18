const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const bookingSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        acceptedLabour: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
        bookingNo: {
            type: String,
            unique: true,
            default: function () {
                return "BK-" + uuidv4().split("-")[0].toUpperCase();
            },
        },

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
            enum: ["Pending", "Confirmed", "Cancelled", "Completed", "Refund Requested", "Refunded"],
            default: "Pending",
        },
        labourPaymentStatus: {
            type: String,
            enum: ["Unpaid", "Paid", "Failed"],
            default: "Unpaid",
        },

        labourWorkStatus: {
            type: String,
            enum: ["Started", "In Progress", "Completed"],
            default: "In Progress",
        },
        paymentMethod: { type: String, enum: ["Razorpay", "COD"], default: "Razorpay", },
        completedAt: { type: Date, default: null },
        bookedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
