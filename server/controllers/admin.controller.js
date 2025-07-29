const User = require('../models/User');
const Labourer = require('../models/Labourer');
const Customer = require('../models/Customer');
const TrainingDetails = require('../models/TrainingDetails');
const Services = require('../models/Services');
const { uploadMedia, deleteMedia } = require('../utils/cloudinary');

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


exports.createOrAddService = async (req, res) => {
    try {
        const user = await User.findById(req.user?.id);
        if (!user || user.role !== 'Admin') {
            return res.status(403).json({ message: "Access Denied, only admin have access" });
        }

        const { categoryTitle, subCategoryTitle, serviceTypeTitle, bookingCharge, serviceCharge } = req.body;
        const categoryImage = req.files?.categoryImage?.[0];
        const subCategoryImage = req.files?.subCategoryImage?.[0];
        const serviceTypeImage = req.files?.serviceTypeImage?.[0];
        if (!categoryTitle || !subCategoryTitle || !serviceTypeTitle || !bookingCharge || !serviceCharge || !serviceTypeImage) {
            return res.status(400).json({ message: "Provide all the details to create/add service" });
        }

        const existingCategory = await Services.findOne({ categoryTitle });

        if (existingCategory) {
            const subCategoryIndex = existingCategory.subCategories.findIndex(sub => sub.subCategoryTitle === subCategoryTitle);

            if (subCategoryIndex !== -1) {
                const uploadedImages = await uploadMedia([serviceTypeImage]);
                if (uploadedImages.length !== 1) {
                    return res.status(409).json({ message: "Provide only 1 image" })
                }
                existingCategory.subCategories[subCategoryIndex].serviceTypes.push({
                    serviceTypeTitle, serviceTypeImage: uploadedImages[0], bookingCharge, serviceCharge
                });
            } else {
                if (!subCategoryImage) {
                    return res.status(400).json({ message: "Missing subCategoryImage" });
                }
                const uploadedImages = await uploadMedia([subCategoryImage, serviceTypeImage]);
                if (uploadedImages.length !== 2) {
                    return res.status(409).json({ message: "Provide only 2 images" })
                }
                existingCategory.subCategories.push({
                    subCategoryTitle,
                    subCategoryImage: uploadedImages[0],
                    serviceTypes: [{
                        serviceTypeTitle, serviceTypeImage: uploadedImages[1], bookingCharge, serviceCharge
                    }]
                });
            }

            await existingCategory.save();
        } else {
            if (!categoryImage || !subCategoryImage) {
                return res.status(400).json({ message: "Missing categoryImage or subCategoryImage" });
            }

            const uploadedImages = await uploadMedia([categoryImage, subCategoryImage, serviceTypeImage]);
            if (uploadedImages.length !== 3) {
                return res.status(409).json({ message: "Provide only 3 image" })
            }

            const newService = new Services({
                categoryTitle,
                categoryImage: uploadedImages[0],
                subCategories: [{
                    subCategoryTitle,
                    subCategoryImage: uploadedImages[1],
                    serviceTypes: [{ serviceTypeTitle, serviceTypeImage: uploadedImages[2], bookingCharge, serviceCharge }]
                }]
            });
            await newService.save();
        }
        return res.status(200).json({ message: "Service added successfully" });

    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};