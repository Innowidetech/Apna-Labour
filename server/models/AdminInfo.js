const mongoose = require('mongoose')

const AdminInfoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dateOfBirth: { type: Date, required: true },
    image: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
}, { timestamps: true })

module.exports = mongoose.model('AdminInfo', AdminInfoSchema)