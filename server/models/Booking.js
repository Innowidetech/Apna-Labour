// models/Booking.js
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    labourerId: { type: mongoose.Schema.Types.ObjectId, ref: "Labourer", required: false },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, // service category

    date: { type: Date, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },

    status: {
        type: String,
        enum: ["pending", "confirmed", "completed", "cancelled"],
        default: "pending"
    },

    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid", "refunded"],
        default: "unpaid"
    }
}, { timestamps: true });

module.exports = mongoose.model("Booking", BookingSchema);
