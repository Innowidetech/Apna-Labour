// const mongoose = require('mongoose');

// const ServicesSchema = new mongoose.Schema({
//     categoryTitle: { type: String, required: true },
//     categoryImage: { type: String, required: true },
//     subCategories: {
//         type: [{
//             subCategoryTitle: { type: String, required: true },
//             subCategoryImage: { type: String, required: true },
//             serviceTypes: {
//                 type: [{
//                     serviceTypeTitle: { type: String, required: true },
//                     serviceTypeImage: { type: String, required: true },
//                     bookingCharge: { type: Number, required: true },
//                     serviceCharge: { type: Number, required: true },
//                     reviews: {
//                         type: [{
//                             userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
//                             rating: { type: Number, min: [1, 'Rating must be at least 1'], max: [5, 'Rating must not exceed 5'], required: true },
//                             feedback: { type: String },
//                             date: { type: Date, default: Date.now }
//                         }],
//                         default: []
//                     }
//                 }],
//                 required: true,
//             }
//         }],
//         required: true,
//     }
// }, { timestamps: true });

// module.exports = mongoose.model('Services', ServicesSchema);

const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true }
}, { timestamps: true });

const SubCategorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
}, { timestamps: true });

const AppliancesTypeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true }
}, { timestamps: true });
const ServiceTypeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    appliances: { type: mongoose.Schema.Types.ObjectId, ref: 'AppliancesType', required: true }
}, { timestamps: true });

const SpecificServiceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    startingPrice: { type: Number, required: true },
    serviceType: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceType', required: true },
    totalReviews: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
}, { timestamps: true });

const UnitSchema = new mongoose.Schema({
    title: { type: String, required: true }, // e.g., "1 AC", "2 AC", "3 AC"
    price: { type: Number, required: true }, // price for this unit
    discountedPercentage: { type: Number }, // optional discounted price
    image: { type: String, required: true },
    totalReviews: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    specificService: { type: mongoose.Schema.Types.ObjectId, ref: 'SpecificService', required: true }
}, { timestamps: true });

const HeroSectionSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        image: { type: String, required: true },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        }
    },
    { timestamps: true }
);

const HeroApplianceSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        image: { type: String, required: true },
        appliance: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AppliancesType", // 🔹 Reference to AppliancesType
            required: true
        }
    },
    { timestamps: true }
);


module.exports = {
    Category: mongoose.model('Category', CategorySchema),
    SubCategory: mongoose.model('SubCategory', SubCategorySchema),
    AppliancesType: mongoose.model('AppliancesType', AppliancesTypeSchema),
    ServiceType: mongoose.model('ServiceType', ServiceTypeSchema),
    SpecificService: mongoose.model('SpecificService', SpecificServiceSchema),
    Unit: mongoose.model('Unit', UnitSchema),
    HeroSection: mongoose.model('HeroSection', HeroSectionSchema),
    HeroAppliance: mongoose.model('HeroAppliance', HeroApplianceSchema)
};






