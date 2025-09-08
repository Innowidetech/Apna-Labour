const User = require('../models/User');
const Labourer = require('../models/Labourer');
const Customer = require('../models/Customer');
const TrainingDetails = require('../models/TrainingDetails');
const Cart = require('../models/Cart');
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");
const Review = require("../models/Review");
const Notification = require("../models/Notification");
const Dispute = require("../models/Dispute");
const { Category, SubCategory, AppliancesType, ServiceType, SpecificServiceType, Unit } = require("../models/Services");
const { uploadMedia, deleteMedia } = require('../utils/cloudinary');

const crypto = require("crypto");

exports.createOrAddReview = async (req, res) => {
    try {
        const { targetType, targetId, rating, feedback } = req.body;
        const userId = req.user._id;

        if (!targetType || !targetId || !rating) {
            return res.status(400).json({ message: "Please provide all the details" })
        }
        const ExistReview = await Review.findOne({ userId, targetType, targetId });
        if (ExistReview) {
            ExistReview.rating = rating
            ExistReview.feedback = feedback
            await ExistReview.save();
            return res.status(200).json({ message: "Review updated successfully" })
        }
        const newReview = new Review({ userId, targetType, targetId, rating, feedback });
        await newReview.save();
        return res.status(201).json({ message: "Review created successfully" })
    }

    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }
}


exports.addToCart = async (req, res) => {
    try {
        const customerId = req.user.id;
        const { serviceId } = req.body;

        const customer = await User.findById({ _id: customerId, role: 'Customer' });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        let cart = await Cart.findOne({ customer: customerId });

        if (!cart) {
            // create new cart
            cart = new Cart({
                customer: customerId,
                services: [{ service: serviceId }],
            });
        } else {
            const exists = cart.services.find(item => item.service.toString() === serviceId);
            if (exists) {
                return res.status(409).json({ message: "Service already in cart" });
            }
            cart.services.push({ service: serviceId });
        }

        await cart.save();
        return res.status(200).json({ message: "Service added to cart", cart });
    }

    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }
}


exports.removeFromCart = async (req, res) => {
    try {
        const customerId = req.user.id;
        const serviceId = req.params.serviceId;

        const cart = await Cart.findOne({ customer: customerId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const initialLength = cart.services.length;
        // Filter out the service to remove
        cart.services = cart.services.filter((item) => {
            return item.service.toString() !== serviceId;
        });

        if (cart.services.length === initialLength) {
            return res.status(404).json({ message: "Service not found in cart" });
        }

        await cart.save();

        res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCartItems = async (req, res) => {
    try {
        const customerId = req.user.id;

        const cartItems = await Cart.find({ customer: customerId }).populate('services.service');

        res.status(200).json({
            message: 'Cart items fetched successfully',
            cart: cartItems
        });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.bookService = async (req, res) => {
    try {
        const { customerId, serviceId, date, location, price } = req.body;

        const booking = new Booking({
            customerId,
            serviceId,
            date,
            location,
            price,
            labourerId: null // assigned later by Admin/matching system
        });

        await booking.save();
        res.status(201).json({ success: true, booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.bookLabourer = async (req, res) => {
    try {
        const { customerId, labourerId, serviceId, date, location, price } = req.body;

        const booking = new Booking({
            customerId,
            labourerId,
            serviceId,
            date,
            location,
            price
        });

        await booking.save();
        res.status(201).json({ success: true, booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.searchServices = async (req, res) => {
    try {
        const { keyword } = req.query;

        if (!keyword) {
            return res.status(400).json({ success: false, message: "Keyword is required" });
        }

        //  Split keywords by comma and trim spaces
        const keywords = keyword.split(",").map(k => k.trim()).filter(k => k.length > 0);

        //  Build regex conditions for multiple keywords
        const regexArray = keywords.map(k => new RegExp(k, "i"));

        //  Search Categories
        const categories = await Category.find({ title: { $in: regexArray } });

        //  Search SubCategories
        const subCategories = await SubCategory.find({ title: { $in: regexArray } })
            .populate("category");

        // Search ServiceTypes
        const services = await ServiceType.find({ title: { $in: regexArray } })
            .populate({
                path: "subCategory",
                populate: { path: "category" }
            });

        if (!categories.length && !subCategories.length && !services.length) {
            return res.status(404).json({ success: false, message: "No results found" });
        }

        res.status(200).json({
            success: true,
            keywords,
            categories,
            subCategories,
            services
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // from auth middleware


        const user = await User.findById(userId).select("-password");


        const bookings = await Booking.find({ user: userId });

        const customer = await Customer.findOne({ userId });


        const canceledBookings = bookings.filter(b => b.status === "cancelled");


        const payments = await Payment.find({ user: userId });


        const reviews = await Review.find({ user: userId });


        const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });


        const disputes = await Dispute.find({ user: userId });
        res.status(200).json({
            message: "Profile data fetched successfully",
            profile: {
                user,
                customer,
                bookings,
                canceledBookings,
                payments,
                reviews,
                notifications,
                disputes,
            },
        });
    } catch (err) {
        console.error("Profile API Error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

exports.updateCustomerProfile = async (req, res) => {
    try {
        console.log("Received request:", req.method, req.body, req.files, req.user);
        const updateData = {};
        const imgFile = req.file;
        if (imgFile) {
            const uploadImage = await uploadMedia(imgFile);
            console.log("📸 Cloudinary Upload Response:", uploadImage);

            if (!uploadImage || !uploadImage[0]) {
                return res.status(500).json({ message: "Image upload failed" });
            }
            updateData.image = uploadImage[0];
        }


        // Basic fields
        if (req.body.gender) updateData.gender = req.body.gender;
        if (req.body.phoneNumber) updateData.phoneNumber = req.body.phoneNumber;
        if (req.body.email) updateData.email = req.body.email;

        // Address fields
        const addressFields = ["HNo", "street", "area", "landmark", "townCity", "pincode"];
        addressFields.forEach(field => {
            const key = `address.${field}`;
            if (req.body[key]) {
                updateData[`address.${field}`] = req.body[key];
            }
        });

        // Ensure userId is always set on insert
        const customer = await Customer.findOneAndUpdate(
            { userId: req.user.id },
            { $set: { ...updateData, userId: req.user._id } },
            { new: true, upsert: true }
        );

        res.status(200).json({
            message: "Customer profile updated successfully",
            customer
        });
    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the user first
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Flip the status
        user.isActive = !user.isActive;
        await user.save();

        res.json({
            message: `User ${user.isActive ? "activated" : "deactivated"} successfully`,
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
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
