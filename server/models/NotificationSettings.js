const mongoose = require('mongoose');

const NotificationSettingsSchema = new mongoose.Schema({

    // PUSH NOTIFICATIONS
    push: {
        pauseAll: { type: Boolean, default: false }
    },

    // EMAIL NOTIFICATIONS
    email: {
        sendEmailOnBookingConfirm: { type: Boolean, default: false },
        sendEmailToLabourerOnAssign: { type: Boolean, default: false },
        sendDailyReportToAdmin: { type: Boolean, default: false }
    },

    // SMS NOTIFICATIONS
    sms: {
        notifyCustomerServiceUpdates: { type: Boolean, default: false },
        sendPaymentAndRefundConfirmation: { type: Boolean, default: false }
    }

}, { timestamps: true });

module.exports = mongoose.model("NotificationSettings", NotificationSettingsSchema);
