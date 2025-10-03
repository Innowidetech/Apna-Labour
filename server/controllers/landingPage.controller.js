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

// 📌 Get all Categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        return res.status(200).json(categories);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

// 📌 Get SubCategories by CategoryId
exports.getSubCategoriesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findById(categoryId);
        if (!category) return res.status(404).json({ message: "Category not found" });

        const subCategories = await SubCategory.find({ category: categoryId }).sort({ createdAt: -1 });
        return res.status(200).json(subCategories);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

// 📌 Get Appliances by SubCategoryId
exports.getAppliancesBySubCategory = async (req, res) => {
    try {
        const { subCategoryId } = req.params;
        const subCategory = await SubCategory.findById(subCategoryId);
        if (!subCategory) return res.status(404).json({ message: "SubCategory not found" });

        const appliances = await AppliancesType.find({ subCategory: subCategoryId }).sort({ createdAt: -1 });
        return res.status(200).json(appliances);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

// 📌 Get ServiceTypes by ApplianceId
exports.getServiceTypesByAppliance = async (req, res) => {
    try {
        const { applianceId } = req.params;
        const appliance = await AppliancesType.findById(applianceId);
        if (!appliance) return res.status(404).json({ message: "Appliance not found" });

        const services = await ServiceType.find({ appliances: applianceId }).sort({ createdAt: -1 });
        return res.status(200).json(services);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

// 📌 Get SpecificServices by ServiceTypeId
exports.getSpecificServicesByServiceType = async (req, res) => {
    try {
        const { serviceTypeId } = req.params;
        const service = await ServiceType.findById(serviceTypeId);
        if (!service) return res.status(404).json({ message: "ServiceType not found" });

        const specificServices = await SpecificServiceType.find({ serviceType: serviceTypeId }).sort({ createdAt: -1 });
        return res.status(200).json(specificServices);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

// 📌 Get Units by SpecificServiceId
exports.getUnitsBySpecificService = async (req, res) => {
    try {
        const { specificServiceId } = req.params;
        const specService = await SpecificServiceType.findById(specificServiceId);
        if (!specService) return res.status(404).json({ message: "SpecificService not found" });

        const units = await Unit.find({ specificService: specificServiceId }).sort({ createdAt: -1 });
        return res.status(200).json(units);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};



