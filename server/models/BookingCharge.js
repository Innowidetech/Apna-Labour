const mongoose = require("mongoose");

const bookingChargeSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now }, // when admin updated
    bookingAmount: { type: Number, required: true },
    effectiveFrom: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model("BookingCharge", bookingChargeSchema);
