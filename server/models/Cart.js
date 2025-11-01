const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        guestId: { type: String },
        tip: { type: Number, default: 0 },
        items: [
            {
                unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
                quantity: { type: Number, required: true, default: 1 },
                price: { type: Number, required: true },
                addedAt: { type: Date, default: Date.now }, // 👈 belongs to each item
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);