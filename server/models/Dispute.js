const mongoose = require('mongoose');

const disputeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    issue: { type: String, required: true },
    status: { type: String, enum: ["open", "in-progress", "resolved"], default: "open" }
}, { timestamps: true });

module.exports = mongoose.model("Dispute", disputeSchema);