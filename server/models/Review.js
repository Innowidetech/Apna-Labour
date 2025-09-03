const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema({
    targetType: {
        type: String,
        enum: ['ServiceType', 'Labourer'],
        required: true,
    }, targetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: [1, "Rating must be at Least 1"], max: [5, "Rating must not exceed 5"], required: true },
    feedback: { type: String },
    date: { type: Date, default: Date.now }
}, { timestamps: true })



module.exports = mongoose.model("Review", ReviewSchema)

