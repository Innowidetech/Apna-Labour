const User = require('../models/User');
const Labourer = require('../models/Labourer');
const Customer = require('../models/Customer');
const TrainingDetails = require('../models/TrainingDetails');
const Cart = require('../models/Cart');
const Review = require('../models/Review')
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");
const { Category, SubCategory, ServiceType } = require("../models/Services");
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

