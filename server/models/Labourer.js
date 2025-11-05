const mongoose = require('mongoose');

const LabourerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    registrationType: {
        type: String,
        enum: ['Professional', 'Individual', 'Team'],
        required: true
    },

    subject: { type: String, default: '' },
    message: { type: String, default: '' },
    aadhar: { type: String, default: '' }, // aadhar

    serviceCity: { type: String, required: true },

    address: { type: String, required: true },

    // Only for Professional
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: function () {
            return this.registrationType === 'Professional';
        }
    },

    acceptedServices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],

    // Only for Individual or Team
    skill: {
        type: String,
        enum: [
            'Lifting heavy items',
            'Loading & unloading',
            'Packing help',
            'Digging/ ground work',
            'Furniture rearrangement',
            'Cleaning assistance',
            'Garden work',
            'Construction site helper',
            'Painting assistant',
            'Labour for events'
        ],
        required: function () {
            return this.registrationType === 'Individual' || this.registrationType === 'Team';
        }
    },

    // Only for Team
    teamName: {
        type: String,
        default: function () {
            return this.registrationType === 'Team' ? 'Team' : undefined;
        }
    },

    image: {
        type: String,
        default: ''
    },
    cost: { type: Number, default: 0 },        // hourly/fixed cost
    experience: { type: String, default: '' }, // years of experience

    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'
    },

    distance: {
        type: Map,
        of: String,
        default: new Map([['default', '0 km']]) // initializes with "default": "0 km"
    },
    isAvailable: { type: Boolean, default: true },
    trainingStatus: {
        type: String,
        enum: ['Completed', 'On Going', 'Not Completed', 'Rejected'],
        default: 'Not Completed'
    },
    registerDate: { type: Date, default: '' },
    completedJobs: { type: Number, default: 0 },
    complants: { type: Number, default: 0 },
    traingScore: { type: Number, default: 70 },
    acceptedJobs: { type: Number, default: 0 },
    location: {
        lat: { type: Number },
        lng: { type: Number }
    }


}, { timestamps: true });

module.exports = mongoose.model('Labourer', LabourerSchema);
