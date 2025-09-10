const User = require('../models/User');
const Labourer = require('../models/Labourer');
const Customer = require('../models/Customer');
require("dotenv").config();
const TrainingDetails = require('../models/TrainingDetails');
const Cart = require('../models/Cart');
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");
const Review = require("../models/Review");
const Notification = require("../models/Notification");
const Dispute = require("../models/Dispute");
const { Category, SubCategory, AppliancesType, ServiceType, SpecificServiceType, Unit } = require("../models/Services");
const { uploadMedia, deleteMedia } = require('../utils/cloudinary');
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});


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
        const userId = req.user.id; // or req.user._id if you fix middleware
        const { unitId, quantity } = req.body;

        if (!unitId) return res.status(400).json({ message: "unitId is required" });

        const unit = await Unit.findById(unitId);
        if (!unit) return res.status(404).json({ message: "Unit not found" });

        let finalPrice = unit.price;
        if (unit.discountedPercentage) {
            finalPrice = unit.price - (unit.price * unit.discountedPercentage) / 100;
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [{ unit: unitId, quantity: quantity || 1, price: finalPrice }],
            });
        } else {
            const itemIndex = cart.items.findIndex(item => item.unit.toString() === unitId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity || 1;
            } else {
                cart.items.push({ unit: unitId, quantity: quantity || 1, price: finalPrice });
            }
        }

        await cart.save();
        res.status(200).json({ message: "Item added to cart", cart });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};



exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { unitId } = req.params;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        // Compare with item._id instead of item.unit
        cart.items = cart.items.filter((item) => item._id.toString() !== unitId);

        await cart.save();

        return res.status(200).json({ message: "Item removed from cart", cart });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ user: userId }).populate("items.unit");

        if (!cart || cart.items.length === 0) {
            return res.status(200).json({
                message: "Cart is empty",
                items: [],
                totalPrice: 0
            });
        }

        // calculate total
        const totalPrice = cart.items.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);

        return res.status(200).json({
            message: "Cart fetched successfully",
            items: cart.items,
            totalPrice,
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
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


exports.createBooking = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookingDate, timeSlot, paymentMethod, tip = 0 } = req.body;

        // Check address
        const customer = await Customer.findOne({ userId });
        if (!customer || !customer.address || !customer.address.HNo) {
            return res
                .status(400)
                .json({ message: "Please add your address before proceeding with booking" });
        }

        // Get Cart
        const cart = await Cart.findOne({ user: userId }).populate("items.unit");
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Calculate amounts
        let subtotal = 0;
        cart.items.forEach((item) => {
            subtotal += item.price * item.quantity;
        });

        const tax = subtotal * 0.1; // 10% tax
        const totalAmount = subtotal + tax + tip;

        // If Razorpay → create order
        if (paymentMethod === "Razorpay") {
            const order = await razorpay.orders.create({
                amount: Math.round(totalAmount * 100), // paise
                currency: "INR",
                receipt: `receipt_${Date.now()}`,
            });

            return res.status(200).json({
                success: true,
                message: "Razorpay order created",
                orderId: order.id,
                amount: totalAmount,
                currency: "INR",
            });
        }

        // If COD → save booking directly
        const booking = new Booking({
            user: userId,
            items: cart.items,
            subtotal,
            tax,
            tip,
            totalAmount,
            bookingDate,
            timeSlot,
            status: "Pending",
            paymentMethod: "COD",
        });

        await booking.save();

        // Clear cart
        cart.items = [];
        await cart.save();

        return res.status(201).json({
            message: "Booking created successfully with COD",
            booking,
        });
    } catch (err) {
        console.error("Booking Error:", err);
        return res
            .status(500)
            .json({ message: "Internal server error", error: err.message });
    }
};


exports.verifyPayment = async (req, res) => {
    try {
        const userId = req.user.id;
        const { orderId, paymentId, signature, bookingDate, timeSlot, tip = 0 } =
            req.body;

        // Verify signature
        // const body = orderId + "|" + paymentId;
        // const expectedSignature = crypto
        //     .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
        //     .update(body.toString())
        //     .digest("hex");

        // if (expectedSignature !== signature) {
        //     return res.status(400).json({ message: "Invalid payment signature" });
        // }

        // Get Cart
        const cart = await Cart.findOne({ user: userId }).populate("items.unit");
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Get customer for address
        const customer = await Customer.findOne({ userId });

        // Calculate amounts again
        let subtotal = 0;
        cart.items.forEach((item) => {
            subtotal += item.price * item.quantity;
        });

        const tax = subtotal * 0.1;
        const totalAmount = subtotal + tax + tip;

        // Save booking
        const booking = new Booking({
            user: userId,
            items: cart.items,
            subtotal,
            tax,
            tip,
            totalAmount,
            bookingDate,
            timeSlot,
            status: "Confirmed",
            paymentMethod: "Razorpay",
            paymentId,
            orderId,
            signature,
        });

        await booking.save();

        // Clear cart
        cart.items = [];
        await cart.save();

        return res
            .status(201)
            .json({ message: "Booking confirmed successfully", booking });
    } catch (err) {
        console.error("Verify Payment Error:", err);
        return res
            .status(500)
            .json({ message: "Internal server error", error: err.message });
    }
};





