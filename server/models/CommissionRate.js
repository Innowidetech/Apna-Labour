const mongoose = require("mongoose");

const commissionRateSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    previousRate: { type: Number, required: true },
    effectiveFrom: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model("CommissionRate", commissionRateSchema);
