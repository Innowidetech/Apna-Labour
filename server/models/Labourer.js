const mongoose = require('mongoose');

const LabourerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
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
    services: [{
        category: { type: String, required: true },
        subCategory: { type: String },
        serviceType: { type: String },
        approved:{type:Boolean, required:true, default:false}
    }],
    availability:{type:Boolean, default:false, required:true},

}, { timestamps: true });

module.exports = mongoose.model('Labourer', LabourerSchema);
