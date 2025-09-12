const mongoose = require("mongoose");

const cancellationSchema = new mongoose.Schema(
    {
        bookingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        reason: {
            type: String,
            enum: [
                "Changed my mind",
                "Booked wrong date/time",
                "Price is too high",
                "Technician was late or delayed",
                "Booked by mistake",
                "Other",
            ],
            required: true,
        },
        comments: { type: String },
        refund: {
            eligible: { type: Boolean, default: false },
            mode: { type: String, enum: ["none", "bank_transfer"], default: "none" },
            bankDetails: {
                bankName: { type: String },
                accountNumber: { type: String },
                accountHolderName: { type: String },
                ifscCode: { type: String },
            },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cancellation", cancellationSchema);
