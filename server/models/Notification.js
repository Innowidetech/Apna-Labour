const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    targetUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    recipients: {
        type: String,
        enum: ["customer", "labourer", "admin", "both", "all"],
        required: true
    },

    title: {
        type: String,
        required: true,
        trim: true
    },

    message: {
        type: String,
        required: true,
        trim: true
    },

    type: {
        type: String,
        enum: ["sms", "email", "push"],
        required: true
    },

    image: {
        type: String,
        default: null
    },

    sendNow: {
        type: Boolean,
        default: true
    },

    scheduledAt: {
        type: Date,
        default: null
    },

    status: {
        type: String,
        enum: ["pending", "scheduled", "sent", "failed"],
        default: "pending"
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Notification", NotificationSchema);
