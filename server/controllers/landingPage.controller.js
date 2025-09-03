const { Category, SubCategory, ServiceType } = require('../models/Services');

exports.getAllLandingPages = async (req, res) => {
    try {
        const categories = await Category.find().lean();
        const subCategories = await SubCategory.find().lean();
        const serviceTypes = await ServiceType.find().lean();
        res.status(200).json({ categories, subCategories, serviceTypes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




                     