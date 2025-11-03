const User = require('../models/User');
const Labourer = require('../models/Labourer');
const Customer = require('../models/Customer');
const TrainingDetails = require('../models/TrainingDetails');
const Contact = require('../models/Contact');
// const Services = require('../models/Services');
const Notification = require('../models/Notification');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const HelpCenter = require('../models/HelpCenter');
const acceptedTrainingMail = require('../utils/acceptedTrainingMail');
const Booking = require('../models/Booking');
const Review = require('../models/Review');
const Dispute = require('../models/Dispute');
const AcceptedService = require('../models/AcceptedService');
const AcceptedSkill = require('../models/AcceptedSkill');
const suspensionMail = require('../utils/suspensionMail');

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
        // Only Admin can approve
        const adminUser = await User.findById(req.user?.id);
        if (!adminUser || adminUser.role !== 'Admin') {
            return res.status(403).json({ message: "Access Denied, only admin can approve" });
        }

        // Check labourer ID
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Please provide labourer ID" });
        }

        // Fetch labourer and associated user details
        const labourer = await Labourer.findById(id).populate('userId');
        if (!labourer) {
            return res.status(404).json({ message: "No labourer found with the given ID" });
        }

        // Extract and validate training details
        const { startDate, endDate, timings, location } = req.body;
        if (!startDate || !endDate || !timings || !location) {
            return res.status(400).json({
                message: "Provide all training details to approve labourer registration",
            });
        }

        // Validate location format (City, State - Pincode)
        if (!/.+,\s*[^,]+,\s*[^-]+-\s*\d{6}$/.test(location)) {
            return res.status(400).json({
                message:
                    'Invalid location format. Use: "City, State - Pincode (6 digits only)"',
            });
        }

        // Activate user
        labourer.userId.isActive = true;
        await labourer.userId.save();

        // Save training details
        const trainingDetails = new TrainingDetails({
            labourerId: labourer._id,
            startDate,
            endDate,
            timings,
            location,
        });
        await trainingDetails.save();

        // Prepare email content
        const emailHTML = acceptedTrainingMail(labourer.userId.name, {
            startDate,
            endDate,
            timings,
            location,
        });

        // Send email
        await sendEmail(
            labourer.userId.email,
            "🎉 Congratulations! Your Apna Labour Application is Approved",
            emailHTML
        );

        // Response
        return res.status(201).json({
            message: `Labourer "${labourer.userId.name}" approved successfully and training details emailed.`,
        });

    } catch (err) {
        console.error("❌ Error approving labourer:", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
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

exports.updateUnit = async (req, res) => {
    try {
        const { unitId } = req.params;
        const { title, price, discountedPercentage, specificService } = req.body;
        const imgFile = req.files?.image?.[0];

        // 1️⃣ Find the Unit
        const existingUnit = await Unit.findById(unitId);
        if (!existingUnit) {
            return res.status(404).json({ message: "Unit not found" });
        }

        // 2️⃣ If specificService is changing, validate new one exists
        if (specificService && specificService !== String(existingUnit.specificService)) {
            const newSpecificService = await SpecificService.findById(specificService);
            if (!newSpecificService) {
                return res.status(404).json({ message: "New SpecificService not found" });
            }

            // 3️⃣ Check for duplicate title in the new SpecificService
            if (title) {
                const duplicate = await Unit.findOne({
                    title,
                    specificService,
                    _id: { $ne: unitId },
                });
                if (duplicate) {
                    return res.status(409).json({
                        message: "A unit with this title already exists under the selected SpecificService",
                    });
                }
            }
        }

        // 4️⃣ Upload image if provided
        let updatedImage = existingUnit.image;
        if (imgFile) {
            const uploadImage = await uploadMedia(imgFile);
            if (!uploadImage || !uploadImage[0]) {
                return res.status(500).json({ message: "Image upload failed" });
            }
            updatedImage = uploadImage[0];
        }

        // 5️⃣ Apply updates
        existingUnit.title = title || existingUnit.title;
        existingUnit.price = price ? Number(price) : existingUnit.price;
        existingUnit.discountedPercentage = discountedPercentage
            ? Number(discountedPercentage)
            : existingUnit.discountedPercentage;
        existingUnit.specificService = specificService || existingUnit.specificService;
        existingUnit.image = updatedImage;

        // 6️⃣ Save updated document
        await existingUnit.save();

        return res.status(200).json({
            message: "Unit updated successfully",
            unit: existingUnit,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
};

exports.deleteUnit = async (req, res) => {
    try {
        const { unitId } = req.params;

        // 1️⃣ Check if Unit exists
        const existingUnit = await Unit.findById(unitId);
        if (!existingUnit) {
            return res.status(404).json({ message: "Unit not found" });
        }

        // 2️ (Optional) Delete image from Cloudinary if applicable
        //  Only do this if you stored public_id or have a deleteMedia util
        // Example:
        await deleteMedia(existingUnit.image);

        await Unit.findByIdAndDelete(unitId);

        return res.status(200).json({
            message: "Unit deleted successfully",
        });
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

exports.createNotificationForUser = async (req, res) => {
    try {
        const { userId, title, message } = req.body;


        if (!userId || !title || !message) {
            return res.status(400).json({ message: "userId, title & message are required" });
        }


        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "Unauthorized: admin not found in request" });
        }

        const notification = await Notification.create({
            user: userId,
            title,
            message,
            createdBy: req.user.userId //  use userId instead of id
        });


        res.status(201).json({
            message: "Notification sent successfully",
            notification
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
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

exports.createHelpCenter = async (req, res) => {
    try {
        const { heading, accordions } = req.body;

        // Check if heading already exists
        let existing = await HelpCenter.findOne({ heading });

        if (existing) {
            existing.accordions.push(...accordions);
            await existing.save();
            return res.json({
                message: "Accordion(s) added to existing Help Center heading",
                data: existing
            });
        }

        const helpCenter = await HelpCenter.create({
            heading,
            accordions,
            createdBy: req.user?.userId || null
        });

        res.status(201).json({
            message: "Help Center section created successfully",
            data: helpCenter
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.getAdminProfile = async (req, res) => {
    try {
        const adminId = req.user?.userId; // from auth middleware
        if (!adminId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const admin = await User.findById(adminId).select('name role picture');
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }

        res.status(200).json({
            success: true,
            data: {
                name: admin.name,
                role: admin.role,
                picture: admin.picture,
            },
        });
    } catch (error) {
        console.error("Get Admin Profile Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

exports.getAdminDashboard = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({
                success: false,
                message: "Please provide a date in YYYY-MM-DD format",
            });
        }

        // Parse date range for bookings
        const start = new Date(`${date}T00:00:00.000Z`);
        const end = new Date(`${date}T23:59:59.999Z`);


        // 📅 Bookings made on that date
        const bookings = await Booking.find({
            bookingDate: { $gte: start, $lte: end },
        });

        const totalBookings = bookings.length;
        const totalMoney = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
        const totalCompletedJobs = bookings.filter(b => b.status === "Completed").length;

        // 🔹 Booking trend (per service)
        const serviceCounts = {};
        bookings.forEach(b => {
            b.items?.forEach(item => {
                const service = item?.serviceName || "Unknown Service";
                serviceCounts[service] = (serviceCounts[service] || 0) + 1;
            });
        });

        const totalProfessionalLabours = await Labourer.countDocuments({
            registrationType: "Professional",
            status: "Accepted",
            isAvailable: true,
            trainingStatus: "Completed",
        });

        res.status(200).json({
            success: true,
            data: {
                summary: {
                    totalBookings,
                    totalMoney,
                    totalProfessionalLabours, // <- independent of date
                    totalCompletedJobs,
                },
            },
        });
    } catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};
exports.getBookingsByDate = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) return res.status(400).json({ success: false, message: "Date is required" });

        // Start & end of the day
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        // Fetch bookings
        const bookings = await Booking.find({
            bookingDate: { $gte: startOfDay, $lte: endOfDay },
        })
            .populate("user", "name")                 // Customer name
            .populate("items.unit", "title")          // Fetch service title from Unit
            .lean();

        const formatted = bookings.map((b) => {
            const customerName = b.user?.name || "Unknown";

            // Extract all service titles in this booking
            const services = b.items?.map(item => item.unit?.title || "Service").join(", ") || "Service";

            // Labourer info
            const labourer = b.labourerName || (b.status === "Pending" ? "Not assigned" : "—");

            // Payment info
            const paymentStatus =
                b.paymentMethod === "Razorpay"
                    ? `₹${b.totalAmount} - Paid`
                    : b.paymentMethod === "COD"
                        ? "COD"
                        : "Unpaid";

            return {
                _id: b._id,
                bookingId: b.bookingId,
                customer: customerName,
                service: services,      // Correct service titles
                time: new Date(b.bookingDate).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                }),
                labour: labourer,
                status: b.status,
                payment: paymentStatus,
            };
        });

        res.status(200).json({ success: true, data: formatted });
    } catch (error) {
        console.error("Get bookings by date error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
exports.getCustomerDetailsByBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;

        // 1️⃣ Find the booking
        const booking = await Booking.findById(bookingId).lean();
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        const userId = booking.user;

        // 2️⃣ Fetch User & Customer profile
        const user = await User.findById(userId).select("-password").lean();
        const profile = await Customer.findOne({ userId }).lean();

        // 3️⃣ Fetch all bookings and populate unit titles
        const allBookings = await Booking.find({ user: userId })
            .populate({
                path: 'items.unit',
                select: 'title', // fetch only the title field
                model: 'Unit'
            })
            .lean();

        // 4️⃣ Summary
        const totalBookings = allBookings.length;
        const totalAmountSpent = allBookings.reduce((acc, b) => acc + (b.totalAmount || 0), 0);
        const reviews = await Review.find({ userId }).lean();
        const averageRating =
            reviews.length > 0
                ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
                : "0.0";
        const disputesCount = await Dispute.countDocuments({ user: userId });
        const availabilityStatus = user.isActive ? "Active" : "Inactive";

        // 5️⃣ Booking history with proper unit names
        const bookingHistory = allBookings.map(b => ({
            _id: b._id,
            bookingId: b.bookingId,
            items: b.items.map(item => ({
                unit: item.unit ? item.unit.title : "Deleted Service",
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount: b.totalAmount,
            bookingDate: b.bookingDate,
            status: b.status,
            payment: b.paymentMethod === "Razorpay" ? `₹${b.totalAmount}` : b.paymentMethod
        }));

        res.status(200).json({
            success: true,
            customerDetails: {
                user,
                profile,
                summary: {
                    totalBookings,
                    totalAmountSpent,
                    averageRating,
                    numberOfDisputes: disputesCount,
                    availabilityStatus
                }
            },
            bookingHistory
        });

    } catch (error) {
        console.error("Get customer details error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


exports.getTop4DemandingServicesByMonth = async (req, res) => {
    try {
        const data = await Booking.aggregate([
            { $unwind: "$items" },

            // 1️⃣ Join Units
            {
                $lookup: {
                    from: "units",
                    localField: "items.unit",
                    foreignField: "_id",
                    as: "unitInfo",
                },
            },
            { $unwind: "$unitInfo" },

            // 2️⃣ Join Specific Service
            {
                $lookup: {
                    from: "specificservices",
                    localField: "unitInfo.specificService",
                    foreignField: "_id",
                    as: "specificServiceInfo",
                },
            },
            { $unwind: "$specificServiceInfo" },

            // 3️⃣ Join Service Type
            {
                $lookup: {
                    from: "servicetypes",
                    localField: "specificServiceInfo.serviceType",
                    foreignField: "_id",
                    as: "serviceTypeInfo",
                },
            },
            { $unwind: "$serviceTypeInfo" },

            // 4️⃣ Join Appliance
            {
                $lookup: {
                    from: "appliancestypes",
                    localField: "serviceTypeInfo.appliances",
                    foreignField: "_id",
                    as: "applianceInfo",
                },
            },
            { $unwind: "$applianceInfo" },

            // 5️⃣ Join SubCategory
            {
                $lookup: {
                    from: "subcategories",
                    localField: "applianceInfo.subCategory",
                    foreignField: "_id",
                    as: "subCategoryInfo",
                },
            },
            { $unwind: "$subCategoryInfo" },

            // 6️⃣ Join Category
            {
                $lookup: {
                    from: "categories",
                    localField: "subCategoryInfo.category",
                    foreignField: "_id",
                    as: "categoryInfo",
                },
            },
            { $unwind: "$categoryInfo" },

            // 7️⃣ Extract month
            {
                $addFields: {
                    month: { $month: "$createdAt" },
                },
            },

            // 8️⃣ Group by category + month
            {
                $group: {
                    _id: {
                        category: "$categoryInfo.title",
                        month: "$month",
                    },
                    totalBookings: { $sum: 1 },
                },
            },

            // 9️⃣ Calculate total per category (for ranking)
            {
                $group: {
                    _id: "$_id.category",
                    months: {
                        $push: {
                            month: "$_id.month",
                            totalBookings: "$totalBookings",
                        },
                    },
                    totalOverall: { $sum: "$totalBookings" },
                },
            },

            // 🔟 Sort by total bookings and limit to top 4
            { $sort: { totalOverall: -1 } },
            { $limit: 4 },
        ]);

        // 🔹 Convert month numbers → names
        const monthNames = [
            "",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        const formatted = {};

        data.forEach((cat) => {
            const category = cat._id;
            formatted[category] = {};
            cat.months.forEach((m) => {
                const monthName = monthNames[m.month];
                formatted[category][monthName] = m.totalBookings;
            });
        });

        res.status(200).json({
            success: true,
            message: "Top 4 most demanding services by month",
            data: formatted,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching analytics data",
            error: error.message,
        });
    }
};

exports.getFilteredCustomers = async (req, res) => {
    try {
        const { city, status } = req.query;

        // 🔹 Base match for role and status
        const matchStage = { role: "Customer" };

        if (status) {
            if (status === "Active") matchStage.isActive = true;
            else if (status === "Inactive") matchStage.isActive = false;
            else if (status === "Deleted") matchStage.isDeleted = true; // optional soft delete
        }

        const customers = await User.aggregate([
            // 1️⃣ Match Customers
            { $match: matchStage },

            // 2️⃣ Join with Customer collection to get address, gender, etc.
            {
                $lookup: {
                    from: "customers",
                    localField: "_id",
                    foreignField: "userId",
                    as: "customerInfo",
                },
            },
            { $unwind: { path: "$customerInfo", preserveNullAndEmptyArrays: true } },

            // 3️⃣ Join with bookings
            {
                $lookup: {
                    from: "bookings",
                    localField: "_id",
                    foreignField: "user",
                    as: "bookings",
                },
            },

            // 4️⃣ Add derived fields
            {
                $addFields: {
                    totalBookings: { $size: "$bookings" },
                    city: "$customerInfo.address.townCity",
                    status: {
                        $cond: [{ $eq: ["$isActive", true] }, "Active", "Inactive"],
                    },
                },
            },

            // 5️⃣ Apply city filter (filter inside joined customerInfo)
            ...(city
                ? [
                    {
                        $match: {
                            "customerInfo.address.townCity": {
                                $regex: new RegExp(city, "i"), // case-insensitive
                            },
                        },
                    },
                ]
                : []),

            // 6️⃣ Project final fields
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    mobileNumber: 1,
                    city: 1,
                    totalBookings: 1,
                    status: 1,
                    createdAt: 1,
                },
            },

            // 7️⃣ Sort by total bookings
            { $sort: { totalBookings: -1 } },
        ]);

        res.status(200).json({
            success: true,
            message: "Customers fetched successfully",
            total: customers.length,
            data: customers,
        });
    } catch (error) {
        console.error("Error in getFilteredCustomers:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching customers",
            error: error.message,
        });
    }
};

//   Get all Professional labourers (training completed)
exports.getProfessionalLabourers = async (req, res) => {
    try {
        const { categoryId } = req.query;

        // 1️⃣ Base filter — Professional with completed training
        const filter = {
            registrationType: "Professional",
            trainingStatus: "Completed"
        };

        if (categoryId) {
            filter.category = categoryId;
        }

        // 2️⃣ Fetch labourers with populated details
        const professionals = await Labourer.find(filter)
            .populate("userId", "-password -otp -otpExpiry -googleId -__v") // full user details
            .populate("category", "title image");

        if (professionals.length === 0) {
            return res.status(200).json({
                success: true,
                count: 0,
                data: []
            });
        }

        // 3️⃣ Extract labourer IDs
        const labourerIds = professionals.map(l => l._id);

        // 4️⃣ Get average ratings for each labourer
        const ratingsData = await Review.aggregate([
            {
                $match: {
                    targetType: "Labourer",
                    targetId: { $in: labourerIds }
                }
            },
            {
                $group: {
                    _id: "$targetId",
                    averageRating: { $avg: "$rating" },
                    totalReviews: { $sum: 1 }
                }
            }
        ]);

        // 5️⃣ Get completed jobs count for each labourer
        const completedJobsData = await Booking.aggregate([
            {
                $match: {
                    labourer: { $in: labourerIds },
                    status: "Completed"
                }
            },
            {
                $group: {
                    _id: "$labourer",
                    completedJobsCount: { $sum: 1 }
                }
            }
        ]);

        // 6️⃣ Create maps for quick lookup
        const ratingMap = {};
        ratingsData.forEach(r => {
            ratingMap[r._id.toString()] = {
                averageRating: Number(r.averageRating.toFixed(1)),
                totalReviews: r.totalReviews
            };
        });

        const completedMap = {};
        completedJobsData.forEach(c => {
            completedMap[c._id.toString()] = c.completedJobsCount;
        });

        // 7️⃣ Merge all data (keep original structure + add userId as separate field)
        const result = professionals.map(p => {
            const id = p._id.toString();
            const labourerObj = p.toObject();

            return {
                ...labourerObj, // keep all existing fields (like your sample)
                userId: p.userId?._id || null, // ✅ add userId separately
                userDetails: p.userId || {}, // ✅ keep full user details nested too (optional)
                averageRating: ratingMap[id]?.averageRating || 0,
                totalReviews: ratingMap[id]?.totalReviews || 0,
                completedJobsCount: completedMap[id] || p.completedJobs || 0
            };
        });

        // ✅ Final response
        res.status(200).json({
            success: true,
            count: result.length,
            data: result
        });

    } catch (error) {
        console.error("Error fetching professional labourers:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

//   Get all Individual labourers (training completed)
exports.getIndividualLabourers = async (req, res) => {
    try {
        const { skill } = req.query;

        const filter = {
            registrationType: "Individual",
            trainingStatus: "Completed"
        };

        if (skill) filter.skill = skill;

        // Fetch labourers with full user details
        const individuals = await Labourer.find(filter)
            .populate("userId", "-password -otp -otpExpiry -googleId");

        if (individuals.length === 0) {
            return res.status(200).json({
                success: true,
                count: 0,
                data: []
            });
        }

        // IDs for ratings and completed jobs
        const labourerIds = individuals.map(l => l._id);

        const ratingsData = await Review.aggregate([
            { $match: { targetType: "Labourer", targetId: { $in: labourerIds } } },
            { $group: { _id: "$targetId", averageRating: { $avg: "$rating" }, totalReviews: { $sum: 1 } } }
        ]);

        const completedJobsData = await Booking.aggregate([
            { $match: { labourer: { $in: labourerIds }, status: "Completed" } },
            { $group: { _id: "$labourer", completedJobsCount: { $sum: 1 } } }
        ]);

        // Lookup maps
        const ratingMap = {};
        ratingsData.forEach(r => {
            ratingMap[r._id.toString()] = {
                averageRating: Number(r.averageRating.toFixed(1)),
                totalReviews: r.totalReviews
            };
        });

        const completedMap = {};
        completedJobsData.forEach(c => {
            completedMap[c._id.toString()] = c.completedJobsCount;
        });

        // Merge all data and include direct userId
        const result = individuals.map(p => {
            const id = p._id.toString();
            const obj = p.toObject();

            return {
                ...obj,
                userId: p.userId?._id || null, // ✅ direct userId
                averageRating: ratingMap[id]?.averageRating || 0,
                totalReviews: ratingMap[id]?.totalReviews || 0,
                completedJobsCount: completedMap[id] || p.completedJobs || 0
            };
        });

        res.status(200).json({
            success: true,
            count: result.length,
            data: result
        });

    } catch (error) {
        console.error("Error fetching individual labourers:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

//  Get all Team labourers (training completed)
exports.getTeamLabourers = async (req, res) => {
    try {
        const { skill } = req.query;

        const filter = {
            registrationType: "Team",
            trainingStatus: "Completed"
        };

        if (skill) filter.skill = skill;

        // Fetch team labourers with populated user and category info
        const teams = await Labourer.find(filter)
            .populate("userId", "-password -otp -otpExpiry -googleId")
            .populate("category", "title image");

        if (teams.length === 0) {
            return res.status(200).json({
                success: true,
                count: 0,
                data: []
            });
        }

        // Labourer IDs for aggregation
        const labourerIds = teams.map(l => l._id);

        // Get ratings
        const ratingsData = await Review.aggregate([
            { $match: { targetType: "Labourer", targetId: { $in: labourerIds } } },
            { $group: { _id: "$targetId", averageRating: { $avg: "$rating" }, totalReviews: { $sum: 1 } } }
        ]);

        // Get completed jobs
        const completedJobsData = await Booking.aggregate([
            { $match: { labourer: { $in: labourerIds }, status: "Completed" } },
            { $group: { _id: "$labourer", completedJobsCount: { $sum: 1 } } }
        ]);

        // Lookup maps
        const ratingMap = {};
        ratingsData.forEach(r => {
            ratingMap[r._id.toString()] = {
                averageRating: Number(r.averageRating.toFixed(1)),
                totalReviews: r.totalReviews
            };
        });

        const completedMap = {};
        completedJobsData.forEach(c => {
            completedMap[c._id.toString()] = c.completedJobsCount;
        });

        // Merge data and include direct userId
        const result = teams.map(p => {
            const id = p._id.toString();
            const obj = p.toObject();

            return {
                ...obj,
                userId: p.userId?._id || null, // ✅ direct userId
                averageRating: ratingMap[id]?.averageRating || 0,
                totalReviews: ratingMap[id]?.totalReviews || 0,
                completedJobsCount: completedMap[id] || p.completedJobs || 0
            };
        });

        res.status(200).json({
            success: true,
            count: result.length,
            data: result
        });

    } catch (error) {
        console.error("Error fetching team labourers:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

exports.getProfessionalLabourerDetails = async (req, res) => {
    try {
        const { userId } = req.params; // ✅ Take userId instead of labourerId

        // 1️⃣ Find the Labourer by userId
        const user = await User.findById(userId).select("-password -otp -otpExpiry -googleId");
        const labourer = await Labourer.findOne({ userId })
            .populate("userId", "-password -otp -otpExpiry -googleId")
            .populate("category", "title image");

        if (!labourer) {
            return res.status(404).json({
                success: false,
                message: "Labourer not found for this user ID",
            });
        }

        // 2️⃣ OVERVIEW SECTION
        const overview = {
            userId: labourer.userId?._id || null,
            status: user.isActive,
            suspended: user.isSuspended,
            name: labourer.userId?.name,
            email: labourer.userId?.email,
            mobileNumber: labourer.userId?.mobileNumber,
            category: labourer.category || null,
            registrationType: labourer.registrationType,
            serviceCity: labourer.serviceCity,
            address: labourer.address,
            image: labourer.image,
            cost: labourer.cost,
            experience: labourer.experience,
            aadhar: labourer.aadhar,
            trainingStatus: labourer.trainingStatus,
            createdAt: labourer.createdAt,
        };

        // 3️⃣ SERVICES SECTION
        const acceptedServices = await AcceptedService.find({ labourer: labourer._id })
            .populate("categories", "title image")
            .populate("subCategories", "title")
            .populate("serviceTypes", "name");

        const services = acceptedServices.map(service => ({
            categories: service.categories,
            subCategories: service.subCategories,
            serviceTypes: service.serviceTypes,
            approvedDate: service.approvedDate,
            status: service.status,
            remarks: service.remarks,
            bookingFee: service.bookingFee,
        }));

        // 4️⃣ RATINGS SECTION
        const ratingsData = await Review.aggregate([
            { $match: { targetType: "Labourer", targetId: labourer._id } },
            {
                $group: {
                    _id: "$targetId",
                    averageRating: { $avg: "$rating" },
                    totalReviews: { $sum: 1 },
                },
            },
        ]);

        const ratingStats = ratingsData[0] || { averageRating: 0, totalReviews: 0 };

        const ratingSection = {
            averageRating: Number(ratingStats.averageRating.toFixed(1)),
            totalReviews: ratingStats.totalReviews,
            completedJobs: labourer.completedJobs || 0,
            complaints: labourer.complants || 0,
            acceptedJobs: labourer.acceptedJobs || 0,
            trainingScore: labourer.traingScore || 0,
            completionRate: `${labourer.completedJobs > 0
                ? ((labourer.completedJobs / (labourer.acceptedJobs || 1)) * 100).toFixed(1)
                : 0
                }%`,
        };

        // 5️⃣ PAYMENTS SECTION
        const bookings = await Booking.find({ "items.unit": labourer._id })
            .select("bookingId totalAmount paymentMethod status createdAt");

        const totalBookings = bookings.length;
        const completedBookings = bookings.filter(b => b.status === "Completed").length;
        const pendingPayments = bookings.filter(b => b.status === "Payment Pending").length;

        const payments = {
            totalBookings,
            completedBookings,
            pendingPayments,
            recentBookings: bookings.slice(-5),
        };

        // ✅ Final Response
        res.status(200).json({
            success: true,
            overview,
            services,
            ratingSection,
            payments,
        });

    } catch (error) {
        console.error("Error fetching labourer details by userId:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};
exports.getIndividualTeamLabourerDetails = async (req, res) => {
    try {
        const { userId } = req.params;

        // 1️⃣ Fetch User & Labourer (only Individual or Team)
        const user = await User.findById(userId).select("-password -otp -otpExpiry -googleId");
        const labourer = await Labourer.findOne({
            userId,
            registrationType: { $in: ["Individual", "Team"] },
        }).populate("userId", "-password -otp -otpExpiry -googleId");

        if (!labourer) {
            return res.status(404).json({
                success: false,
                message: "Individual or Team labourer not found for this user ID",
            });
        }

        // 2️⃣ OVERVIEW SECTION (same as professional structure)
        const overview = {
            userId: labourer.userId?._id,
            status: user.isActive,
            suspended: user.isSuspended,
            name: labourer.userId?.name,
            email: labourer.userId?.email,
            mobileNumber: labourer.userId?.mobileNumber,
            // for individuals & teams there’s no category
            category: null,
            registrationType: labourer.registrationType,
            serviceCity: labourer.serviceCity,
            address: labourer.address,
            image: labourer.image,
            cost: labourer.cost,
            experience: labourer.experience,
            aadhar: labourer.aadhar,
            trainingStatus: labourer.trainingStatus,
            createdAt: labourer.createdAt,
        };

        // 3️⃣ SERVICES SECTION — from AcceptedSkill
        const acceptedSkills = await AcceptedSkill.find({ labourer: labourer.userId })
            .select("skills status approvedDate remarks registrationFee");

        const services = acceptedSkills.map(skillDoc => ({
            _id: skillDoc._id,
            skills: skillDoc.skills,
            status: skillDoc.status,
            approvedDate: skillDoc.approvedDate,
            remarks: skillDoc.remarks,
            registrationFee: skillDoc.registrationFee,
        }));

        // fallback if no AcceptedSkill record
        if (services.length === 0) {
            services.push({
                _id: null,
                skills: [labourer.skill || "Not specified"],
                status: "Pending",
                approvedDate: null,
                remarks: "Not yet approved",
                registrationFee: 0,
            });
        }

        // 4️⃣ RATING SECTION (same structure)
        const ratingsData = await Review.aggregate([
            { $match: { targetType: "Labourer", targetId: labourer._id } },
            {
                $group: {
                    _id: "$targetId",
                    averageRating: { $avg: "$rating" },
                    totalReviews: { $sum: 1 },
                },
            },
        ]);

        const ratingStats = ratingsData[0] || { averageRating: 0, totalReviews: 0 };
        const ratingSection = {
            averageRating: Number(ratingStats.averageRating.toFixed(1)),
            totalReviews: ratingStats.totalReviews,
            completedJobs: labourer.completedJobs || 0,
            complaints: labourer.complants || 0,
            acceptedJobs: labourer.acceptedJobs || 0,
            trainingScore: labourer.traingScore || 70,
            completionRate: `${labourer.completedJobs > 0
                ? ((labourer.completedJobs / (labourer.acceptedJobs || 1)) * 100).toFixed(1)
                : 0
                }%`,
        };

        // 5️⃣ PAYMENTS SECTION (same as professional)
        const bookings = await Booking.find({ "items.unit": labourer._id })
            .select("bookingId totalAmount paymentMethod status createdAt");

        const totalBookings = bookings.length;
        const completedBookings = bookings.filter(b => b.status === "Completed").length;
        const pendingPayments = bookings.filter(b => b.status === "Payment Pending").length;

        const payments = {
            totalBookings,
            completedBookings,
            pendingPayments,
            recentBookings: bookings.slice(-5),
        };

        // ✅ FINAL RESPONSE (same structure and order)
        res.status(200).json({
            success: true,
            overview,
            services,
            ratingSection,
            payments,
        });

    } catch (error) {
        console.error("Error fetching Individual/Team labourer details:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

exports.getSuspendedAccounts = async (req, res) => {
    try {
        // 1️⃣ Find all suspended users
        const suspendedUsers = await User.find({ isSuspended: true })
            .select("-password -otp -otpExpiry -googleId"); // hide sensitive fields

        // 2️⃣ Get labourer details for those users (if any)
        const userIds = suspendedUsers.map(u => u._id);
        const labourers = await Labourer.find({ userId: { $in: userIds } })
            .populate("category", "title image") // optional populate for category
            .lean();

        // 3️⃣ Merge user + labourer info
        const suspendedAccounts = suspendedUsers.map(user => {
            const labourer = labourers.find(l => l.userId.toString() === user._id.toString());
            return {
                user,
                labourer: labourer || null
            };
        });

        // 4️⃣ Send response
        return res.status(200).json({
            success: true,
            count: suspendedAccounts.length,
            suspendedAccounts
        });
    } catch (error) {
        console.error("Error fetching suspended accounts:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching suspended accounts",
            error: error.message
        });
    }
};
exports.suspendLabour = async (req, res) => {
    try {
        const { userId } = req.params;
        const { reason } = req.body;

        if (!reason) {
            return res.status(400).json({
                success: false,
                message: "Suspension reason is required",
            });
        }

        // 1️⃣ Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // 2️⃣ Update suspension status
        user.isSuspended = true;
        await user.save();

        // 3️⃣ Send email
        await sendEmail(
            user.email,
            "Your Apna Labour Account has been Suspended",
            suspensionMail(reason)
        );

        // 4️⃣ Response
        return res.status(200).json({
            success: true,
            message: "User suspended and email sent successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isSuspended: user.isSuspended,
            },
        });

    } catch (error) {
        console.error("Error suspending user:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while suspending user",
            error: error.message,
        });
    }
};