const mongoose = require('mongoose');

const AcceptedSkillSchema = new mongoose.Schema({
    labourer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    //  Single or multiple skills from enum list
    skills: [{
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
        required: true
    }],

    //  When admin approved the skill(s)
    approvedDate: {
        type: Date,
        default: Date.now
    },

    //  Admin or system status
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },

    //  Optional remarks from admin
    remarks: {
        type: String,
        default: ''
    },
    bookingFee: { type: Number, default: 200 },

}, { timestamps: true });

module.exports = mongoose.model('AcceptedSkill', AcceptedSkillSchema);
