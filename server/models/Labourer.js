const mongoose = require('mongoose');

const LabourerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    address: {
        type: new mongoose.Schema({
            HNo: { type: String, required: true },
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            pincode: { type: Number, required: true }
        }, { _id: false }),
        required: false
    },

    serviceCity: { type: String, required: true },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }, // selected during registration

    services: {
        type: [{
            subCategory: { type: String, default: null },
            serviceType: { type: String, default: null },
            approved: { type: Boolean, default: false, required: true }
        }],
        required: false // ✅ optional at registration
    },
    role: {
        type: String,
        enum: ['Labourer'],
        default: null
    },

    isAccepted: { type: Boolean, default: false }

}, { timestamps: true });

module.exports = mongoose.model('Labourer', LabourerSchema);
