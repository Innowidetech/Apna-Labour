const { Category, SubCategory, ServiceType } = require('../models/Services');
const Booking = require("../models/Booking");

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


exports.getTopBookedServices = async (req, res) => {
    try {
        const topServices = await Booking.aggregate([
            { $unwind: "$items" },

            // 1️⃣ Group by Unit and count bookings
            {
                $group: {
                    _id: "$items.unit",
                    bookedCount: { $sum: 1 }
                }
            },

            // 2️⃣ Lookup Unit → get specificService
            {
                $lookup: {
                    from: "units",
                    localField: "_id",
                    foreignField: "_id",
                    as: "unitData"
                }
            },
            { $unwind: "$unitData" },

            // 3️⃣ Lookup SpecificService
            {
                $lookup: {
                    from: "specificservices",
                    localField: "unitData.specificService",
                    foreignField: "_id",
                    as: "serviceData"
                }
            },
            { $unwind: "$serviceData" },

            // 4️⃣ Lookup ServiceType (optional)
            {
                $lookup: {
                    from: "servicetypes",
                    localField: "serviceData.serviceType",
                    foreignField: "_id",
                    as: "serviceTypeData"
                }
            },
            { $unwind: "$serviceTypeData" },

            // 5️⃣ Final projection of required fields
            {
                $project: {
                    _id: 0,
                    specificServiceId: "$serviceData._id",
                    title: "$serviceData.title",
                    image: "$serviceData.image",
                    startingPrice: "$serviceData.startingPrice",
                    totalReviews: "$serviceData.totalReviews",
                    averageRating: "$serviceData.averageRating",
                    serviceType: "$serviceTypeData.title",
                    bookedCount: 1
                }
            },

            // 6️⃣ Group by specificService to avoid duplicates
            {
                $group: {
                    _id: "$specificServiceId",
                    title: { $first: "$title" },
                    image: { $first: "$image" },
                    startingPrice: { $first: "$startingPrice" },
                    totalReviews: { $first: "$totalReviews" },
                    averageRating: { $first: "$averageRating" },
                    serviceType: { $first: "$serviceType" },
                    bookedCount: { $sum: "$bookedCount" }
                }
            },

            // 7️⃣ Sort and Limit top 8
            { $sort: { bookedCount: -1 } },
            { $limit: 8 }
        ]);

        res.status(200).json({
            success: true,
            message: "Top 8 most booked services",
            data: topServices
        });

    } catch (error) {
        console.error("Error fetching top booked services:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};
