const mongoose = require('mongoose');

const TrainingDetailsSchema = new mongoose.Schema({
    labourerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    timings: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true } 
}, { timestamps: true });

module.exports = mongoose.model('TrainingDetails', TrainingDetailsSchema);
