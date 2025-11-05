const mongoose = require('mongoose');

const AcceptedServiceSchema = new mongoose.Schema({
    labourer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    //  Multiple categories allowed
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }],

    //  Multiple subcategories allowed
    subCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    }],

    //  Multiple service types allowed
    serviceTypes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceType',
        required: true
    }],

    //  When admin approved the service(s)
    approvedDate: {
        type: Date,
        default: Date.now
    },

    // Admin or system status
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },

    // 📝 Optional remarks from admin
    message: { type: String, default: '' },
    bookingFee: { type: Number, default: 200 },

}, { timestamps: true });

module.exports = mongoose.model('AcceptedService', AcceptedServiceSchema);
