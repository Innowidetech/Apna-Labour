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
const Cancellation = require("../models/Cancellation");
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
        const userId = req.user.id;
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
        const { unitId } = req.params; // this is the Unit _id

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        // Compare with item.unit instead of item._id
        cart.items = cart.items.filter(
            (item) => item.unit.toString() !== unitId
        );

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
        const userId = req.user.id;

        // user details
        const user = await User.findById(userId).select("-password");

        //  bookings with unit details inside items
        const bookings = await Booking.find({ user: userId })
            .populate("items.unit", "title price description image "); // populate unit fields

        const customer = await Customer.findOne({ userId });

        const canceledBookings = bookings.filter(b => b.status === "Cancelled");


        let reviewFilter = { userId };
        const { reviewPeriod } = req.query; // frontend can pass ?reviewPeriod=2025 or last30

        if (reviewPeriod) {
            if (reviewPeriod === "last30") {
                const last30 = new Date();
                last30.setDate(last30.getDate() - 30);
                reviewFilter.createdAt = { $gte: last30 };
            } else if (!isNaN(reviewPeriod)) {
                // numeric year like 2025, 2024
                const start = new Date(`${reviewPeriod}-01-01T00:00:00.000Z`);
                const end = new Date(`${parseInt(reviewPeriod) + 1}-01-01T00:00:00.000Z`);
                reviewFilter.createdAt = { $gte: start, $lt: end };
            }
        }

        //  reviews with target populated
        const reviews = await Review.find(reviewFilter)
            .populate({
                path: "targetId",
                select: "title name", // unit.title or labourer.name
            })
            .sort({ createdAt: -1 });

        //  notifications
        const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });


        const disputes = await Dispute.find({ user: userId });

        //  booking items only (with unit details)
        const bookingItems = bookings.map(b => ({
            _id: b._id,
            status: b.status,
            bookingDate: b.bookingDate,
            timeSlot: b.timeSlot,
            items: b.items.map(item => ({
                _id: item._id,
                unit: item.unit,
                quantity: item.quantity,
                price: item.price,
            })),
        }));

        //  payments include unit details
        const payments = bookings.map(b => ({
            _id: b._id,
            items: b.items.map(item => ({
                _id: item._id,
                unit: item.unit,
                quantity: item.quantity,
                price: item.price,
            })),
            totalAmount: b.totalAmount,
            paymentId: b.paymentId,
            orderId: b.orderId,
            signature: b.signature,
            paymentMethod: b.paymentMethod,
            status: b.status,
            bookedAt: b.bookedAt,
        }));

        return res.status(200).json({
            message: "Profile data fetched successfully",
            profile: {
                user,
                customer,
                bookings: bookingItems,
                payments,
                reviews, //  now filtered
                notifications,
                canceledBookings,

            },
        });
    } catch (err) {
        console.error("Profile API Error:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};



exports.updateCustomerProfile = async (req, res) => {
    try {
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
//  Get all Categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        return res.status(200).json(categories);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

//  Get SubCategories by CategoryId
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

//  Get Appliances by SubCategoryId
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

//  Get ServiceTypes by ApplianceId
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

//  Get SpecificServices by ServiceTypeId
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

//  Get Units by SpecificServiceId
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


exports.markNotificationAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; // from auth middleware

        const notification = await Notification.findOneAndUpdate(
            { _id: id, user: userId },   // ✅ ensures user can update only his own
            { read: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.status(200).json({
            message: "Notification marked as read",
            notification,
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

//  Mark all notifications as read
exports.markAllNotificationsAsRead = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await Notification.updateMany(
            { user: userId, read: false },
            { $set: { read: true } }
        );

        res.status(200).json({
            message: "All notifications marked as read",
            modifiedCount: result.modifiedCount,
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
//  Delete a single notification
exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; // from auth middleware

        const notification = await Notification.findOneAndDelete({
            _id: id,
            user: userId, // ensure user can delete only their own
        });

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.status(200).json({
            message: "Notification deleted successfully",
            notificationId: id,
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

// Add a Review for a Unit
exports.addUnitReview = async (req, res) => {
    try {
        const userId = req.user.id; // from auth middleware
        const { unitId } = req.params;
        const { rating, feedback } = req.body;

        // Validate unit exists
        const unit = await Unit.findById(unitId);
        if (!unit) return res.status(404).json({ message: "Unit not found" });

        // Check if user already reviewed this unit (optional)
        const existingReview = await Review.findOne({ userId, targetId: unitId, targetType: "Unit" });
        if (existingReview) {
            return res.status(400).json({ message: "You already reviewed this unit" });
        }

        const review = new Review({
            targetType: "Unit",
            targetId: unitId,
            userId,
            rating,
            feedback,
        });

        await review.save();
        return res.status(201).json({ message: "Review added successfully", review });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


//  Edit a Review for a Unit
exports.editUnitReview = async (req, res) => {
    try {
        const userId = req.user.id;
        const { reviewId } = req.params;
        const { rating, feedback } = req.body;

        const review = await Review.findOne({ _id: reviewId, userId, targetType: "Unit" });
        if (!review) return res.status(404).json({ message: "Review not found or unauthorized" });

        if (rating) review.rating = rating;
        if (feedback) review.feedback = feedback;

        await review.save();
        return res.status(200).json({ message: "Review updated successfully", review });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


exports.deleteUnitReview = async (req, res) => {
    try {
        const userId = req.user.id;
        const { reviewId } = req.params;

        const review = await Review.findOneAndDelete({ _id: reviewId, userId, targetType: "Unit" });
        if (!review) return res.status(404).json({ message: "Review not found or unauthorized" });

        return res.status(200).json({ message: "Review deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


exports.getUnitReviews = async (req, res) => {
    try {
        const { unitId } = req.params;

        const reviews = await Review.find({ targetType: "Unit", targetId: unitId })
            .populate("userId", "name email")
            .sort({ createdAt: -1 });

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this unit" });
        }


        const avgRating =
            reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

        return res.status(200).json({
            totalReviews: reviews.length,
            averageRating: avgRating.toFixed(1),
            reviews,
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


exports.cancelBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const userId = req.user.id;

        console.log("Cancel Booking:", { bookingId, userId });

        const { reason, comments, refund } = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (booking.status === "Cancelled") {
            return res.status(400).json({ message: "Booking is already cancelled" });
        }

        const existingCancellation = await Cancellation.findOne({ bookingId });
        if (existingCancellation) {
            return res.status(400).json({ message: "Booking already cancelled" });
        }

        //  Create cancellation record
        await Cancellation.create({
            bookingId,
            userId,
            reason,
            comments,
            refund,
        });

        //  Update booking status safely
        booking.status = "Cancelled";
        await booking.save();

        return res.status(201).json({
            message: "Booking cancelled successfully",
            booking,
        });
    } catch (err) {
        console.error("Cancel Booking Error:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};



