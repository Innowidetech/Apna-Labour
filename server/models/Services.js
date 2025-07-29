const mongoose = require('mongoose');

const ServicesSchema = new mongoose.Schema({
    categoryTitle: { type: String, required: true },
    categoryImage: { type: String, required: true },
    subCategories: {
        type: [{
            subCategoryTitle: { type: String, required: true },
            subCategoryImage: { type: String, required: true },
            serviceTypes: {
                type: [{
                    serviceTypeTitle: { type: String, required: true },
                    serviceTypeImage: { type: String, required: true },
                    bookingCharge: { type: Number, required: true },
                    serviceCharge: { type: Number, required: true },
                    reviews: {
                        type: [{
                            userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
                            rating: { type: Number, min: [1, 'Rating must be at least 1'], max: [5, 'Rating must not exceed 5'], required: true },
                            feedback: { type: String },
                            date: { type: Date, default: Date.now }
                        }],
                        default: []
                    }
                }],
                required: true,
            }
        }],
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Services', ServicesSchema);
