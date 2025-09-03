const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // assuming 'User' model has customer accounts
        required: true,
    },
    services: [
        {
            service: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ServiceType', 
                required: true,
            },
            addedAt: {
                type: Date,
                default: Date.now,
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);





