const User = require('../models/User');
const Labourer = require('../models/Labourer');
const Customer = require('../models/Customer');
const TrainingDetails = require('../models/TrainingDetails');
const Contact = require('../models/Contact');
// const Services = require('../models/Services');
const Notification = require('../models/Notification');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const {
    Category,
    SubCategory,
    AppliancesType,
    ServiceType,
    SpecificService,
    HeroSection,
    Unit
} = require("../models/Services");

const { uploadMedia, deleteMedia } = require('../utils/cloudinary');
const { response } = require('express');

exports.getAllUsers = async (req, res) => {
    try {
        const user = await User.findById(req.user?.id);
        if (!user || user.role !== 'Admin') { return res.status(403).json({ message: "Access Denied, only admin have access" }) }

        const labourers = await Labourer.find().populate("userId", "name email mobileNumber isActive").sort({ createdAt: -1 });
        const customers = await Customer.find().populate("userId", "name email mobileNumber isActive").sort({ createdAt: -1 });

        res.status(200).json({ labourers, customers })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.status })
    }
};


exports.approveLabourerRegistrationAndSendTrainingDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user?.id);
        if (!user || user.role !== 'Admin') { return res.status(403).json({ message: "Access Denied, only admin have access" }) }

        const { id } = req.params;
        if (!id) { return res.status(400).json({ message: "Please provide labourer id" }) };

        const labourer = await Labourer.findById(id).populate('userId');
        if (!labourer) { return res.status(404).json({ message: "No labourer found with the id" }) }

        const { startDate, endDate, timings, location } = req.body;
        if (!startDate || !endDate || !timings || !location) {
            return res.status(400).json({ message: "Provide the training details to approve labourer registartion" })
        }

        if (!/.+,\s*[^,]+,\s*[^-]+-\s*\d{6}$/.test(location)) {
            return res.status(400).json({
                message: 'Invalid location format. It should end with "City, State - Pincode (6 digits only)" using commas and a hyphen.'
            });
        }

        labourer.userId.isActive = 'true'
        await labourer.userId.save();

        const trainingDetails = new TrainingDetails({ labourerId: labourer._id, startDate, endDate, timings, location })
        await trainingDetails.save()

        res.status(201).json({ message: `Labourer - ${labourer.userId.name} approved successfully and training details sent` })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.status })
    }
};


exports.getTrainingDetailsAndLabourers = async (req, res) => {
    try {
        const user = await User.findById(req.user?.id);
        if (!user || user.role !== 'Admin') { return res.status(403).json({ message: "Access Denied, only admin have access" }) }

        const trainingDetails = await TrainingDetails.find().populate({ path: 'labourerId', populate: { path: 'userId', select: ('name email mobileNumber isActive') } });
        if (!trainingDetails.length) { return res.status(404).json({ message: "No training details found" }) }

        res.status(200).json(trainingDetails)
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.status })
    }
};


exports.setTrainingCompleted = async (req, res) => {
    try {
        const user = await User.findById(req.user?.id);
        if (!user || user.role !== 'Admin') { return res.status(403).json({ message: "Access Denied, only admin have access" }) }

        const { id } = req.params;
        if (!id) { return res.status(400).json({ message: "Please provide training details id" }) };

        const training = await TrainingDetails.findById(id).populate('labourerId');
        if (!training) { return res.status(404).json({ message: "No labourer found with the id" }) }

        training.trainingStatus = !training.trainingStatus
        await training.save();
        training.labourerId.availability = !training.labourerId.availability
        await training.labourerId.save();

        res.status(200).json({ message: `Training status updated successfully` })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.status })
    }
};


// exports.createOrAddService = async (req, res) => {
//     try {
//         const user = await User.findById(req.user?.id);
//         if (!user || user.role !== 'Admin') {
//             return res.status(403).json({ message: "Access Denied, only admin have access" });
//         }

//         const { categoryTitle, subCategoryTitle, serviceTypeTitle, bookingCharge, serviceCharge } = req.body;
//         const categoryImage = req.files?.categoryImage?.[0];
//         const subCategoryImage = req.files?.subCategoryImage?.[0];
//         const serviceTypeImage = req.files?.serviceTypeImage?.[0];
//         if (!categoryTitle || !subCategoryTitle || !serviceTypeTitle || !bookingCharge || !serviceCharge || !serviceTypeImage) {
//             return res.status(400).json({ message: "Provide all the details to create/add service" });
//         }

//         const existingCategory = await Services.findOne({ categoryTitle });

//         if (existingCategory) {
//             const subCategoryIndex = existingCategory.subCategories.findIndex(sub => sub.subCategoryTitle === subCategoryTitle);

//             if (subCategoryIndex !== -1) {
//                 const uploadedImages = await uploadMedia([serviceTypeImage]);
//                 if (uploadedImages.length !== 1) {
//                     return res.status(409).json({ message: "Provide only 1 image" })
//                 }
//                 existingCategory.subCategories[subCategoryIndex].serviceTypes.push({
//                     serviceTypeTitle, serviceTypeImage: uploadedImages[0], bookingCharge, serviceCharge
//                 });
//             } else {
//                 if (!subCategoryImage) {
//                     return res.status(400).json({ message: "Missing subCategoryImage" });
//                 }
//                 const uploadedImages = await uploadMedia([subCategoryImage, serviceTypeImage]);
//                 if (uploadedImages.length !== 2) {
//                     return res.status(409).json({ message: "Provide only 2 images" })
//                 }
//                 existingCategory.subCategories.push({
//                     subCategoryTitle,
//                     subCategoryImage: uploadedImages[0],
//                     serviceTypes: [{
//                         serviceTypeTitle, serviceTypeImage: uploadedImages[1], bookingCharge, serviceCharge
//                     }]
//                 });
//             }

//             await existingCategory.save();
//         } else {
//             if (!categoryImage || !subCategoryImage) {
//                 return res.status(400).json({ message: "Missing categoryImage or subCategoryImage" });
//             }

//             const uploadedImages = await uploadMedia([categoryImage, subCategoryImage, serviceTypeImage]);
//             if (uploadedImages.length !== 3) {
//                 return res.status(409).json({ message: "Provide only 3 image" })
//             }

//             const newService = new Services({
//                 categoryTitle,
//                 categoryImage: uploadedImages[0],
//                 subCategories: [{
//                     subCategoryTitle,
//                     subCategoryImage: uploadedImages[1],
//                     serviceTypes: [{ serviceTypeTitle, serviceTypeImage: uploadedImages[2], bookingCharge, serviceCharge }]
//                 }]
//             });
//             await newService.save();
//         }
//         return res.status(200).json({ message: "Service added successfully" });

//     } catch (err) {
//         return res.status(500).json({ message: "Internal server error", error: err.message });
//     }
// };

exports.createCategory = async (req, res) => {
    try {
        const { title } = req.body;
        const imgFile = req.files?.image?.[0];

        if (!title || !imgFile) {
            return res.status(400).json({ message: "Title and image are required" });
        }

        const titleExists = await Category.findOne({ title });
        if (titleExists) {
            return res.status(409).json({ message: "Category already exists" });
        }

        const uploadImage = await uploadMedia(imgFile);
        if (!uploadImage || !uploadImage[0]) {
            return res.status(500).json({ message: "Image upload failed" });
        }

        const category = new Category({ title, image: uploadImage[0] });
        await category.save();

        return res.status(201).json({ message: "Category added successfully", category });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

exports.createSubCategory = async (req, res) => {
    try {
        const { title, CategoryId } = req.body;
        const category = CategoryId;
        const imgFile = req.files?.image?.[0];

        if (!title || !imgFile || !category) {
            return res.status(400).json({ message: "Title, image, and category are required" });
        }

        const existingCategory = await Category.findById(category);
        if (!existingCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        const titleExists = await SubCategory.findOne({ title, category });
        if (titleExists) {
            return res.status(409).json({ message: "Subcategory already exists under this category" });
        }

        const uploadImage = await uploadMedia(imgFile);
        if (!uploadImage || !uploadImage[0]) {
            return res.status(500).json({ message: "Image upload failed" });
        }

        const subCat = new SubCategory({ title, category, image: uploadImage[0] });
        await subCat.save();

        return res.status(201).json({ message: "Subcategory added successfully", subCat });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

exports.createAppliance = async (req, res) => {
    try {
        const { title, subCategory } = req.body;
        const imgFile = req.files?.image?.[0];

        if (!title || !imgFile || !subCategory) {
            return res.status(400).json({ message: "Title, image, and subCategory are required" });
        }

        const existingSubCategory = await SubCategory.findById(subCategory);
        if (!existingSubCategory) {
            return res.status(404).json({ message: "SubCategory not found" });
        }

        const titleExists = await AppliancesType.findOne({ title, subCategory });
        if (titleExists) {
            return res.status(409).json({ message: "Appliance already exists under this subCategory" });
        }

        const uploadImage = await uploadMedia(imgFile);
        if (!uploadImage || !uploadImage[0]) {
            return res.status(500).json({ message: "Image upload failed" });
        }

        const appliance = new AppliancesType({ title, subCategory, image: uploadImage[0] });
        await appliance.save();

        return res.status(201).json({ message: "Appliance added successfully", appliance });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


exports.createServiceType = async (req, res) => {
    try {
        const { title, appliances } = req.body;
        const imgFile = req.files?.image?.[0];

        if (!title || !imgFile || !appliances) {
            return res.status(400).json({ message: "Title, image, and appliances are required" });
        }

        const existingAppliance = await AppliancesType.findById(appliances);
        if (!existingAppliance) {
            return res.status(404).json({ message: "Appliance not found" });
        }

        const titleExists = await ServiceType.findOne({ title, appliances });
        if (titleExists) {
            return res.status(409).json({ message: "Service already exists under this appliance" });
        }

        const uploadImage = await uploadMedia(imgFile);
        if (!uploadImage || !uploadImage[0]) {
            return res.status(500).json({ message: "Image upload failed" });
        }

        const service = new ServiceType({ title, appliances, image: uploadImage[0] });
        await service.save();

        return res.status(201).json({ message: "ServiceType added successfully", service });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

exports.createSpecificService = async (req, res) => {
    try {
        const { title, startingPrice, serviceType } = req.body;
        const imgFile = req.files?.image?.[0];

        if (!title || !imgFile || !startingPrice || !serviceType) {
            return res.status(400).json({ message: "Title, image, startingPrice, and serviceType are required" });
        }

        const existingService = await ServiceType.findById(serviceType);
        if (!existingService) {
            return res.status(404).json({ message: "ServiceType not found" });
        }

        const titleExists = await SpecificService.findOne({ title, serviceType });
        if (titleExists) {
            return res.status(409).json({ message: "Specific Service already exists under this ServiceType" });
        }

        const uploadImage = await uploadMedia(imgFile);
        if (!uploadImage || !uploadImage[0]) {
            return res.status(500).json({ message: "Image upload failed" });
        }

        const specService = new SpecificService({ title, startingPrice, serviceType, image: uploadImage[0] });
        await specService.save();

        return res.status(201).json({ message: "Specific Service added successfully", specService });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


exports.createUnit = async (req, res) => {
    try {
        const { title, price, discountedPercentage, specificService } = req.body;
        const imgFile = req.files?.image?.[0];

        // Validate required fields
        if (!title || !imgFile || !price || !specificService) {
            return res.status(400).json({
                message: "Title, image, price, and specificService are required",
            });
        }

        // Check if specificService exists
        const existingSpecificService = await SpecificService.findById(specificService);
        if (!existingSpecificService) {
            return res.status(404).json({ message: "SpecificService not found" });
        }

        // Prevent duplicate unit titles under same specificService
        const titleExists = await Unit.findOne({ title, specificService });
        if (titleExists) {
            return res.status(409).json({
                message: "Unit already exists under this SpecificService",
            });
        }

        // Upload image
        const uploadImage = await uploadMedia(imgFile);
        if (!uploadImage || !uploadImage[0]) {
            return res.status(500).json({ message: "Image upload failed" });
        }

        // Save new unit
        const unit = new Unit({
            title,
            price: Number(price),
            discountedPercentage: Number(discountedPercentage),
            specificService,
            image: uploadImage[0],
        });


        await unit.save();

        return res.status(201).json({ message: "Unit added successfully", unit });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
};


exports.createHeroSection = async (req, res) => {
    try {
        const { title, categoryId } = req.body;
        const imgFile = req.files?.image?.[0];

        if (!title || !imgFile || !categoryId) {
            return res.status(400).json({ message: "Title, image, and category are required" });
        }

        // Check if category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Optional: Check if a hero section already exists for this category
        const existingHero = await HeroSection.findOne({ category: categoryId });
        if (existingHero) {
            return res.status(409).json({ message: "Hero section for this category already exists" });
        }

        const uploadImage = await uploadMedia(imgFile);
        if (!uploadImage || !uploadImage[0]) {
            return res.status(500).json({ message: "Image upload failed" });
        }

        const heroSection = new HeroSection({
            title,
            image: uploadImage[0],
            category: categoryId
        });

        await heroSection.save();

        return res.status(201).json({ message: "Hero section added successfully", heroSection });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

exports.delServiceType = async (req, res) => {
    try {
        const serviceTypeId = req.params.id;

        const deleted = await ServiceType.findByIdAndDelete(serviceTypeId);

        if (!deleted) {
            return res.status(404).json({ message: 'Service type not found' });
        }

        res.status(200).json({ message: 'Service type deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


exports.getAllLabourers = async (req, res) => {
    try {
        const labourers = await Labourer.find()
            .populate('userId', 'name email mobileNumber') // populate user info
            .populate('category', 'title'); // populate category title

        res.status(200).json({ success: true, labourers });
    } catch (error) {
        console.error('Error fetching labourers:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

exports.acceptApplicant = async (req, res) => {
    try {
        const applicantId = req.params.id;

        // 1️⃣ Find the labourer
        const labourer = await Labourer.findById(applicantId);
        if (!labourer) {
            return res.status(404).json({ message: 'Applicant not found.' });
        }

        // 2️⃣ Update status to Accepted
        labourer.status = 'Accepted';
        // Optionally, you can update trainingStatus or isAvailable if needed
        labourer.isAvailable = true; // make them available upon acceptance
        await labourer.save();

        // 3️⃣ Update user role to 'Labourer' (if not already)
        const user = await User.findById(labourer.userId);
        if (user) {
            user.role = 'Labourer';
            await user.save();
        }

        res.status(200).json({
            message: 'Applicant accepted successfully.',
            applicant: labourer,
        });
    } catch (error) {
        console.error('Error accepting applicant:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.markTrainingCompleted = async (req, res) => {
    try {
        const labourerId = req.params.id;
        const { cost, experience } = req.body; // optional fields

        // Find the labourer
        const labourer = await Labourer.findById(labourerId);
        if (!labourer) {
            return res.status(404).json({ message: 'Labourer not found.' });
        }

        // Update training status
        labourer.trainingStatus = 'Completed';

        // Optional: update cost and experience
        if (cost !== undefined) labourer.cost = cost;
        if (experience !== undefined) labourer.experience = experience;

        await labourer.save();

        res.status(200).json({
            success: true,
            message: 'Training marked as completed successfully.',
            labourer
        });

    } catch (error) {
        console.error('Error marking training completed:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.getAcceptedLabourers = async (req, res) => {
    try {
        const labourers = await Labourer.find({ status: 'Accepted' })
            .populate('userId', 'name email mobileNumber')
            .populate('category', 'title');

        res.status(200).json({ success: true, labourers });
    } catch (error) {
        console.error('Error fetching accepted labourers:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};


exports.createNotificationForAll = async (req, res) => {
    try {
        const { title, message } = req.body;
        if (!title || !message) {
            return res.status(400).json({ message: "Title & message required" });
        }

        const users = await User.find({}, "_id"); // get all users

        // ✅ store who created (req.user.id = Admin id)
        const notifications = users.map(u => ({
            user: u._id,
            title,
            message,
            createdBy: req.user.id
        }));

        await Notification.insertMany(notifications);

        res.status(201).json({ message: "Notification sent to all users" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        return res.status(200).json(contacts);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

exports.createHeroAppliance = async (req, res) => {
    try {
        const { title, applianceId } = req.body;
        const imgFile = req.files?.image?.[0];

        if (!title || !imgFile || !applianceId) {
            return res
                .status(400)
                .json({ message: "Title, image, and appliance are required" });
        }

        // ✅ Check if appliance exists
        const appliance = await AppliancesType.findById(applianceId);
        if (!appliance) {
            return res.status(404).json({ message: "Appliance not found" });
        }

        // ✅ Check if hero section already exists for this appliance
        const existingHero = await HeroAppliance.findOne({ appliance: applianceId });
        if (existingHero) {
            return res
                .status(409)
                .json({ message: "Hero section for this appliance already exists" });
        }

        // ✅ Upload image
        const uploadImage = await uploadMedia(imgFile);
        if (!uploadImage || !uploadImage[0]) {
            return res.status(500).json({ message: "Image upload failed" });
        }

        // ✅ Save new hero appliance
        const heroAppliance = new HeroAppliance({
            title,
            image: uploadImage[0],
            appliance: applianceId,
        });

        await heroAppliance.save();

        return res.status(201).json({
            message: "Hero appliance section added successfully",
            heroAppliance,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
};

