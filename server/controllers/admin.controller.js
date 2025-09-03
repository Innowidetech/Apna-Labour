const User = require('../models/User');
const Labourer = require('../models/Labourer');
const Customer = require('../models/Customer');
const TrainingDetails = require('../models/TrainingDetails');
// const Services = require('../models/Services');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const { Category, SubCategory, ServiceType } = require('../models/Services')

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

exports.createOrAddCategory = async (req, res) => {
    try {
        const { title } = req.body;
        const imgFile = req.files?.categoryImage?.[0];

        if (!title || !imgFile) {
            return res.status(400).json({ message: "Title and img is required" })
        }

        const existingCategory = await Category.findOne({ title });
        if (existingCategory) {
            return res.status(409).json({ message: "Category already exists" })
        }

        const uploadImage = await uploadMedia(imgFile);
        if (!uploadImage || !uploadImage[0]) {
            return res.status(500).json({ message: "Image upload failed " })
        }

        const newCategory = new Category({ title, image: uploadImage[0] });
        await newCategory.save();

        return res.status(200).json({ message: "Category added successfully" })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

exports.createOrAddSubcategory = async (req, res) => {
    try {
        const { title, CategoryId } = req.body
        const imgFile = req.files?.subCategoryImage?.[0];
        if (!title || !imgFile || !CategoryId) {
            return res.status(400).json({ message: "Title and img is required" })
        }
        const existingCategory = await Category.findById(CategoryId)
        if (!existingCategory) {
            return res.status(404).json({ message: "Category not found" })
        }
        const titleExists = await SubCategory.findOne({ title })
        if (titleExists) {
            return res.status(409).json({ message: "Subcategory already exists" })
        }
        const uploadImage = await uploadMedia(imgFile)
        if (!uploadImage || !uploadImage[0]) {
            return res.status(500).json({ message: "Image upload failed" })
        }
        const newSubCategory = new SubCategory({ title, category: existingCategory._id, image: uploadImage[0] })
        await newSubCategory.save()
        return res.status(200).json({ message: "Subcategory added successfully" })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

exports.createOrAddServiceType = async (req, res) => {
    try {
        const { title, SubCategoryId, bookingCharge, originalPrice, serviceCharge } = req.body
        const imgFile = req.files?.serviceTypeImage?.[0];
        if (!title || !imgFile || !SubCategoryId || !bookingCharge || !originalPrice || !serviceCharge) {
            return res.status(400).json({ message: "All the fields are required" })
        }
        const existingSubCategory = await SubCategory.findById(SubCategoryId)
        if (!existingSubCategory) {
            return res.status(404).json({ message: "Subcategory not found" })
        }
        const ExistTitle = await ServiceType.findOne({ title })

        if (ExistTitle) {
            return res.status(409).json({ message: "Service type already exists" })
        }
        const uploadImage = await uploadMedia(imgFile)
        if (!uploadImage || !uploadImage[0]) {
            return res.status(500).json({ message: "Image upload failed" })
        }
        const newServiceType = new ServiceType({ title, subCategory: existingSubCategory._id, bookingCharge, originalPrice, serviceCharge, image: uploadImage[0] })
        await newServiceType.save()
        return res.status(200).json({ message: "Service type added successfully" })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }
}


exports.getCategory = async (req, res) => {
    try {
        const category = await Category.find()
        if (!category.length) {
            return res.status(404).json({ message: "No category found" })
        }
        return res.status(200).json(category)
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

exports.getSubCategory = async (req, res) => {
    try {
        const subCategory = await SubCategory.find()
        if (!subCategory.length) {
            return res.status(404).json({ message: "No subcategory found" })
        }
        return res.status(200).json(subCategory)
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

exports.getServiceType = async (req, res) => {
    try {
        const serviceType = await ServiceType.find()
        if (!serviceType.length) {
            return res.status(404).json({ message: "No service type found" })
        }
        return res.status(200).json(serviceType)
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

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

        const labourer = await Labourer.findById(applicantId);
        if (!labourer) {
            return res.status(404).json({ message: 'Applicant not found.' });
        }

        labourer.isAccepted = true;
        await labourer.save();

        // Promote user role to 'Labourer'
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

exports.getAcceptedLabourers = async (req, res) => {
    try {
        const labourers = await Labourer.find({ isAccepted: true })
            .populate('userId', 'name email mobileNumber')
            .populate('category', 'title');

        res.status(200).json({ success: true, labourers });
    } catch (error) {
        console.error('Error fetching accepted labourers:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

