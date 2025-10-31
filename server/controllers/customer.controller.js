const mongoose = require("mongoose");
const User = require('../models/User');
const Labourer = require('../models/Labourer');
const Customer = require('../models/Customer');
const { v4: uuid } = require("uuid");
require("dotenv").config();
const TrainingDetails = require('../models/TrainingDetails');
const Cart = require('../models/Cart');
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");
const Review = require("../models/Review");
const Notification = require("../models/Notification");
const Dispute = require("../models/Dispute");
const HelpCenter = require("../models/HelpCenter");
const Cancellation = require("../models/Cancellation");
const Refund = require("../models/Refund");


const { Category, SubCategory, AppliancesType, ServiceType, SpecificService, Unit, HeroSection } = require("../models/Services");
const { uploadMedia, deleteMedia } = require('../utils/cloudinary');
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { formatAddress } = require('../utils/formatAddress');
const { geocodeAddress } = require("../utils/geocodeAddress");
const { getDistanceBetweenPoints } = require("../utils/getDistance");
const LabourBooking = require("../models/labourBooking");


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});


exports.createOrAddReview = async (req, res) => {
    try {
        const { targetType, targetId, rating, feedback } = req.body;
        const userId = req.user.userId;

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

// exports.addToCart = async (req, res) => {
//     try {
//        const userId = req.user.userId;
//         const { unitId, quantity } = req.body;

//         if (!unitId) return res.status(400).json({ message: "unitId is required" });

//         const unit = await Unit.findById(unitId);
//         if (!unit) return res.status(404).json({ message: "Unit not found" });

//         let finalPrice = unit.price;
//         if (unit.discountedPercentage) {
//             finalPrice = unit.price - (unit.price * unit.discountedPercentage) / 100;
//         }

//         let cart = await Cart.findOne({ user: userId });

//         if (!cart) {
//             cart = new Cart({
//                 user: userId,
//                 items: [{ unit: unitId, quantity: quantity || 1, price: finalPrice }],
//             });
//         } else {
//             const itemIndex = cart.items.findIndex(item => item.unit.toString() === unitId);
//             if (itemIndex > -1) {
//                 cart.items[itemIndex].quantity += quantity || 1;
//             } else {
//                 cart.items.push({ unit: unitId, quantity: quantity || 1, price: finalPrice });
//             }
//         }

//         await cart.save();
//         res.status(200).json({ message: "Item added to cart", cart });
//     } catch (err) {
//         res.status(500).json({ message: "Internal server error", error: err.message });
//     }
// };


// exports.removeFromCart = async (req, res) => {
//     try {
//        const userId = req.user.userId;
//         const { unitId } = req.params; // this is the Unit _id

//         const cart = await Cart.findOne({ user: userId });
//         if (!cart) return res.status(404).json({ message: "Cart not found" });

//         // Compare with item.unit instead of item._id
//         cart.items = cart.items.filter(
//             (item) => item.unit.toString() !== unitId
//         );

//         await cart.save();

//         return res.status(200).json({ message: "Item removed from cart", cart });
//     } catch (err) {
//         return res.status(500).json({ message: "Internal server error", error: err.message });
//     }
// };



// exports.getCart = async (req, res) => {
//     try {
//        const userId = req.user.userId;
//         const cart = await Cart.findOne({ user: userId }).populate("items.unit");

//         if (!cart || cart.items.length === 0) {
//             return res.status(200).json({
//                 message: "Cart is empty",
//                 items: [],
//                 totalPrice: 0
//             });
//         }

//         // calculate total
//         const totalPrice = cart.items.reduce((acc, item) => {
//             return acc + item.price * item.quantity;
//         }, 0);

//         return res.status(200).json({
//             message: "Cart fetched successfully",
//             items: cart.items,
//             totalPrice,
//         });
//     } catch (err) {
//         return res.status(500).json({ message: "Internal server error", error: err.message });
//     }
// };

exports.addToCart = async (req, res) => {
    try {
        const userId = req.user ? req.user.userId : null;
        let guestId = req.headers["x-guest-id"]; // 👈 read from frontend header

        // Create guestId if not logged in
        if (!userId && !guestId) {
            guestId = uuid(); // generate new only once
        }

        const { unitId } = req.params;
        const { quantity } = req.body;

        if (!unitId) return res.status(400).json({ message: "unitId is required" });

        const unit = await Unit.findById(unitId);
        if (!unit) return res.status(404).json({ message: "Unit not found" });

        let finalPrice = unit.price;
        if (unit.discountedPercentage) {
            finalPrice -= (unit.price * unit.discountedPercentage) / 100;
        }

        // Guest → User cart merge
        if (userId && guestId) {
            const guestCart = await Cart.findOne({ guestId });
            if (guestCart) {
                let userCart = await Cart.findOne({ user: userId });
                if (!userCart) {
                    guestCart.user = userId;
                    guestCart.guestId = undefined;
                    await guestCart.save();
                } else {
                    // Merge items
                    for (const item of guestCart.items) {
                        const index = userCart.items.findIndex(i => i.unit.toString() === item.unit.toString());
                        if (index > -1) {
                            userCart.items[index].quantity += item.quantity;
                        } else {
                            userCart.items.push(item);
                        }
                    }
                    await userCart.save();
                    await guestCart.deleteOne();
                }
            }
            guestId = undefined;
        }

        const query = userId ? { user: userId } : { guestId };
        let cart = await Cart.findOne(query);

        if (!cart) {
            cart = new Cart({
                user: userId || undefined,
                guestId: userId ? undefined : guestId,
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

        return res.status(200).json({
            message: "Item added to cart",
            cart,
            guestId: guestId || undefined, // 👈 return guestId only if guest

            guestId: guestId || undefined, //  return guestId only if guest

        });

    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const userId = req.user ? req.user.userId : null;
        let guestId = req.headers["x-guest-id"]; // 👈 from frontend header


        // Merge guest cart into user cart if logged in
        if (userId && guestId) {
            const guestCart = await Cart.findOne({ guestId });
            if (guestCart) {
                let userCart = await Cart.findOne({ user: userId });
                if (!userCart) {
                    guestCart.user = userId;
                    guestCart.guestId = undefined;
                    await guestCart.save();
                    guestId = undefined;
                } else {
                    for (const item of guestCart.items) {
                        const index = userCart.items.findIndex(
                            i => i.unit.toString() === item.unit.toString()
                        );
                        if (index > -1) {
                            userCart.items[index].quantity += item.quantity;
                        } else {
                            userCart.items.push(item);
                        }
                    }
                    await userCart.save();
                    await guestCart.deleteOne();
                    guestId = undefined;
                }
            }
        }

        const query = userId ? { user: userId } : { guestId };

        const cart = await Cart.findOne(query).populate("items.unit", "title image");


        if (!cart || cart.items.length === 0) {
            return res.status(200).json({
                message: "Cart is empty",
                items: [],
                totalPrice: 0,
            });
        }

        let totalPrice = 0;
        const items = cart.items.map(item => {
            const unitDoc = item.unit && item.unit.title ? item.unit : null; // populated unit OR null
            const price = item.price || 0; // always trust stored price
            totalPrice += price * item.quantity;

            return {
                unit: unitDoc
                    ? { id: unitDoc._id, title: unitDoc.title, image: unitDoc.image }
                    : { id: item.unit, title: "Unknown / Deleted Item" },
                quantity: item.quantity,
                price,
                total: price * item.quantity
            };
        });

        return res.status(200).json({
            message: "Cart fetched successfully",
            items,
            totalPrice,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
};


exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user ? req.user.userId : null;

        // Use header guestId (like add/get) → fallback to cookie guestId
        const guestId = req.headers["x-guest-id"] || req.cookies.guestId;
        const { unitId } = req.params;

        if (!unitId) {
            return res.status(400).json({ message: "unitId is required" });
        }

        // Select cart based on login type
        const query = userId ? { user: userId } : { guestId };
        const cart = await Cart.findOne(query);

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Remove the item
        cart.items = cart.items.filter(item => item.unit.toString() !== unitId);
        await cart.save();

        return res.status(200).json({
            message: "Item removed from cart",
            cart,
            guestId: !userId ? guestId : undefined, // only return guestId for guest carts
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
};

// exports.addToCartItem = async (req, res) => {
//     try {
//         const userId = req.user ? req.user.id : null;
//         let guestId = req.headers["x-guest-id"]; // 👈 read from frontend header

//         // Generate guestId if not logged in and not provided
//         if (!userId && !guestId) guestId = uuid();

//         const { unitId } = req.params;
//         const { quantity } = req.body;

//         if (!unitId) return res.status(400).json({ message: "unitId is required" });

//         const unit = await Unit.findById(unitId);
//         if (!unit) return res.status(404).json({ message: "Unit not found" });

//         // Calculate final price (consider discount)
//         let finalPrice = unit.price;
//         if (unit.discountedPercentage) {
//             finalPrice -= (unit.price * unit.discountedPercentage) / 100;
//         }

//         // Guest → User cart merge if logged in
//         if (userId && guestId) {
//             const guestCart = await Cart.findOne({ guestId });
//             if (guestCart) {
//                 let userCart = await Cart.findOne({ user: userId });
//                 if (!userCart) {
//                     guestCart.user = userId;
//                     guestCart.guestId = undefined;
//                     await guestCart.save();
//                 } else {
//                     // Merge items
//                     for (const item of guestCart.items) {
//                         const index = userCart.items.findIndex(i => i.unit.toString() === item.unit.toString());
//                         if (index > -1) {
//                             userCart.items[index].quantity += item.quantity;
//                         } else {
//                             userCart.items.push(item);
//                         }
//                     }
//                     await userCart.save();
//                     await guestCart.remove();
//                 }
//             }
//             guestId = undefined;
//         }

//         // Find or create cart
//         const query = userId ? { user: userId } : { guestId };
//         let cart = await Cart.findOne(query);
//         if (!cart) {
//             cart = new Cart({
//                 user: userId || undefined,
//                 guestId: userId ? undefined : guestId,
//                 items: [{ unit: unitId, quantity: quantity || 1, price: finalPrice }],
//             });
//         } else {
//             // Increase quantity if unit exists
//             const itemIndex = cart.items.findIndex(item => item.unit.toString() === unitId);
//             if (itemIndex > -1) {
//                 cart.items[itemIndex].quantity += quantity || 1;
//             } else {
//                 cart.items.push({ unit: unitId, quantity: quantity || 1, price: finalPrice });
//             }
//         }


//         cart.items = cart.items.filter(item => item.unit.toString() !== unitId);
//         await cart.save();

//         return res.status(200).json({ message: "Item removed from cart", cart });

//         return res.status(200).json({
//             message: "Item added to cart",
//             cart,
//             guestId: guestId || undefined,
//         });

//     } catch (err) {
//         return res.status(500).json({ message: "Internal server error", error: err.message });
//     }
// };


// exports.bookService = async (req, res) => {
//     try {
//         const { customerId, serviceId, date, location, price } = req.body;

//         const booking = new Booking({
//             customerId,
//             serviceId,
//             date,
//             location,
//             price,
//             labourerId: null // assigned later by Admin/matching system
//         });

//         await booking.save();
//         res.status(201).json({ success: true, booking });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// exports.bookLabourer = async (req, res) => {
//     try {
//         const { customerId, labourerId, serviceId, date, location, price } = req.body;

//         const booking = new Booking({
//             customerId,
//             labourerId,
//             serviceId,
//             date,
//             location,
//             price
//         });

//         await booking.save();
//         res.status(201).json({ success: true, booking });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

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
exports.getUserProfileName = async (req, res) => {
    try {
        const userId = req.user.userId;

        // 1️⃣ Fetch base user info (including _id)
        const user = await User.findById(userId).select(
            "_id name email mobileNumber role isActive"
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 2️⃣ Fetch customer address
        const customer = await Customer.findOne({ userId }).select("address");

        // 3️⃣ Fetch latest booking details
        const latestBooking = await Booking.findOne({ user: userId })
            .sort({ createdAt: -1 })
            .select("bookingDate timeSlot");

        // 4️⃣ Build response object
        const profile = {
            user,
            address: customer ? customer.address : null,
            booking: latestBooking
                ? {
                    bookingDate: latestBooking.bookingDate,
                    timeSlot: latestBooking.timeSlot,
                }
                : null,
        };

        // ✅ Send response
        res.status(200).json({
            message: "Profile data fetched successfully",
            profile,
        });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId; // ✅ correct key from JWT

        // Find user basic info
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Try to find related customer profile (optional)
        const customer = await Customer.findOne({ userId });

        // Combine details
        const profile = {
            name: user.name || "",
            email: user.email || "",
            phoneNumber: user.mobileNumber || "",
            role: user.role,
            picture: user.picture || "",
            ...(customer ? customer.toObject() : {}), // merge customer details if available
        };

        res.status(200).json({
            message: "Profile fetched successfully",
            profile,
        });
    } catch (err) {
        console.error("Get Profile Error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { filter } = req.query;

        let filterCondition = { user: userId };

        //  Apply filters
        if (filter) {
            const now = new Date();

            if (filter === "last30") {
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(now.getDate() - 30);
                filterCondition.bookingDate = { $gte: thirtyDaysAgo, $lte: now };
            } else if (/^\d{4}$/.test(filter)) {
                const year = parseInt(filter);
                const startOfYear = new Date(`${year}-01-01T00:00:00Z`);
                const endOfYear = new Date(`${year}-12-31T23:59:59Z`);
                filterCondition.bookingDate = { $gte: startOfYear, $lte: endOfYear };
            }
        }

        const bookings = await Booking.find(filterCondition)
            .populate("items.unit", "title price image _id")
            .sort({ createdAt: -1 });

        //  Format data
        const formattedBookings = bookings.map(booking => ({
            _id: booking._id,
            items: booking.items.map(item => ({
                unitId: item.unit?._id || null,
                title: item.unit?.title || "Service",
                image: item.unit?.image || null,
                price: item.price
            })),
            status: booking.status,
            bookingDate: booking.bookingDate,
        }));

        //  Separate for 2025 (Confirmed/Pending vs others)
        if (filter === String(new Date().getFullYear())) {
            const upcoming = formattedBookings.filter(b => b.status === "Confirmed" || b.status === "Pending");
            const past = formattedBookings.filter(b => !["Confirmed", "Pending"].includes(b.status));

            return res.status(200).json({
                message: "Bookings fetched successfully",
                upcoming,
                past,
            });
        }

        //  Default response for other filters
        res.status(200).json({
            message: "Bookings fetched successfully",
            bookings: formattedBookings,
        });

    } catch (err) {
        console.error("Bookings Fetch Error:", err);
        res.status(500).json({ message: err.message });
    }
};

exports.getUserPayments = async (req, res) => {
    try {
        const userId = req.user.userId;

        // Fetch user info
        const user = await User.findById(userId).select("name email mobileNumber");

        // Fetch customer info (for address)
        const customer = await Customer.findOne({ userId });

        // Fetch all bookings by this user
        const bookings = await Booking.find({ user: userId })
            .populate("items.unit", "title price image")
            .sort({ createdAt: -1 });

        const payments = bookings.map((b) => {
            const addr = customer?.address;
            const formattedAddress = addr
                ? [
                    addr.HNo,
                    addr.buildingName,
                    addr.street,
                    addr.area,
                    addr.landmark,
                    addr.townCity,
                    addr.state,
                    addr.pincode,
                ]
                    .filter(Boolean)
                    .join(", ")
                : "No address available";

            return {
                bookingId: b.bookingId,
                _id: b._id,
                customerName: user?.name || "Unknown User",
                customerEmail: user?.email || "Unknown Email",
                customerAddress: formattedAddress,
                bookingDate: b.bookingDate,
                bookedAt: b.createdAt,
                status: b.status,
                paymentMethod: b.paymentMethod,
                totalItems: b.items?.length || 0,
                subtotal: b.subtotal || 0,
                tax: b.tax || 0,
                tip: b.tip || 0,
                totalAmount: b.totalAmount || 0,

                invoiceDetails: {
                    bookingId: b.bookingId,
                    date: b.bookingDate,
                    customer: {
                        name: user?.name || "Unknown User",
                        email: user?.email || "Unknown Email",
                        address: formattedAddress,
                    },
                    items: b.items.map((i) => ({
                        title: i.unit?.title,
                        price: i.price,
                        quantity: i.quantity,
                        image: i.unit?.image,
                    })),
                    summary: {
                        subtotal: b.subtotal,
                        tax: b.tax,
                        tip: b.tip,
                        totalAmount: b.totalAmount,
                    },
                },
            };
        });

        res.status(200).json({
            message: "Payments fetched successfully",
            count: payments.length,
            payments,
        });
    } catch (err) {
        console.error("Payments Fetch Error:", err);
        res.status(500).json({ message: err.message });
    }
};

exports.getUserReviews = async (req, res) => {
    try {
        const userId = req.user.userId; // from protect middleware
        const { period } = req.query;

        // Convert userId to ObjectId for filtering
        const filter = { userId: new mongoose.Types.ObjectId(userId) };

        // Optional period filter
        if (period) {
            if (period === "last30") {
                const last30 = new Date();
                last30.setDate(last30.getDate() - 30);
                filter.createdAt = { $gte: last30 };
            } else if (!isNaN(period)) {
                const year = parseInt(period);
                const start = new Date(`${year}-01-01T00:00:00.000Z`);
                const end = new Date(`${year + 1}-01-01T00:00:00.000Z`);
                filter.createdAt = { $gte: start, $lt: end };
            }
        }

        const reviews = await Review.find(filter)
            .populate("targetId", "title name image") //  include image
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Reviews fetched successfully",
            reviews,
        });
    } catch (err) {
        console.error("Reviews Fetch Error:", err);
        res.status(500).json({ message: err.message });
    }
};

exports.getUserNotifications = async (req, res) => {
    try {
        const userId = req.user.userId;

        const notifications = await Notification.find({ user: userId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Notifications fetched successfully",
            notifications,
        });
    } catch (err) {
        console.error("Notifications Fetch Error:", err);
        res.status(500).json({ message: err.message });
    }
};
exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.user.userId;

        //  Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        //  Optional: Soft delete (if you want to keep record)
        // user.isDeleted = true;
        // await user.save();

        //  Delete related data
        await Promise.all([
            Customer.deleteOne({ userId }),
            Booking.deleteMany({ user: userId }),
            Review.deleteMany({ userId }),
            Notification.deleteMany({ user: userId }),
            Dispute.deleteMany({ user: userId }),
        ]);

        //  Finally delete user
        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            message: "Account deleted successfully",
            success: true,
        });
    } catch (err) {
        console.error("Delete Account Error:", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
};



exports.updateCustomerProfile = async (req, res) => {
    try {
        const updateData = {};
        const imgFile = req.file;

        // 🔹 Handle image upload
        if (imgFile) {
            const uploadImage = await uploadMedia(imgFile);
            if (!uploadImage || !uploadImage[0]) {
                return res.status(500).json({ message: "Image upload failed" });
            }
            updateData.image = uploadImage[0];
        }

        // 🔹 Basic Customer fields
        if (req.body.gender) updateData.gender = req.body.gender;

        // 🔹 Address fields
        const addressFields = [
            "HNo",
            "buildingName",
            "street",
            "area",
            "landmark",
            "townCity",
            "pincode",
            "state"
        ];
        addressFields.forEach(field => {
            const key = `address.${field}`;
            if (req.body[key]) {
                updateData[`address.${field}`] = req.body[key];
            }
        });

        // 🔹 Update or create customer
        const customer = await Customer.findOneAndUpdate(
            { userId: req.user.userId },
            { $set: { ...updateData, userId: req.user.userId } },
            { new: true, upsert: true }
        );

        // 🔹 Update User table
        const userUpdates = {};
        if (req.body.name) userUpdates.name = req.body.name;
        if (req.body.email) userUpdates.email = req.body.email;
        if (req.body.phoneNumber) userUpdates.mobileNumber = req.body.phoneNumber;

        let updatedUser = null;
        if (Object.keys(userUpdates).length > 0) {
            updatedUser = await User.findByIdAndUpdate(
                req.user.userId,
                { $set: userUpdates },
                { new: true }
            ).select("-password");
        }

        // 🔹 Merge customer + user fields (no nested `user`)
        const profile = {
            ...customer.toObject(),
            name: updatedUser?.name || req.user.name,
            email: updatedUser?.email || req.user.email,
            phoneNumber: updatedUser?.mobileNumber || req.user.mobileNumber
        };

        // 🔹 Return the merged data
        res.status(200).json({
            message: "Customer profile updated successfully",
            profile
        });

    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.updateUserStatus = async (req, res) => {
    try {
        const userId = req.user.userId; //  get from auth middleware

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Flip active/inactive status
        user.isActive = !user.isActive;
        await user.save();

        return res.status(200).json({
            message: `User ${user.isActive ? "activated" : "deactivated"} successfully`,
            user,
        });
    } catch (error) {
        console.error("Update User Status Error:", error);
        return res.status(500).json({ message: "Something went wrong", error: error.message });
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
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) return res.status(404).json({ message: "Category not found" });

        const subCategories = await SubCategory.find({ category: id }).sort({ createdAt: -1 });
        return res.status(200).json(subCategories);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

//  Get Appliances by SubCategoryId
exports.getAppliancesBySubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const subCategory = await SubCategory.findById(id);
        if (!subCategory) return res.status(404).json({ message: "SubCategory not found" });

        const appliances = await AppliancesType.find({ subCategory: id }).sort({ createdAt: -1 });
        return res.status(200).json(appliances);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

//  Get ServiceTypes by ApplianceId
exports.getServiceTypesByAppliance = async (req, res) => {
    try {
        const { id } = req.params;
        const appliance = await AppliancesType.findById(id);
        if (!appliance) return res.status(404).json({ message: "Appliance not found" });

        const services = await ServiceType.find({ appliances: id }).sort({ createdAt: -1 });
        return res.status(200).json(services);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

//  Get SpecificServices by ServiceTypeId
exports.getSpecificServicesByServiceType = async (req, res) => {
    try {
        const { id } = req.params;

        const service = await ServiceType.findById(id);
        if (!service)
            return res.status(404).json({ message: "ServiceType not found" });

        // Get specific services for this serviceType
        const specificServices = await SpecificService.find({ serviceType: id }).sort({ createdAt: -1 });

        // Enrich each specificService with totalReviews + averageRating
        const result = await Promise.all(
            specificServices.map(async (specService) => {
                // find all units under this specificService
                const units = await Unit.find({ specificService: specService._id }).select("_id");

                const unitIds = units.map((u) => u._id);

                // get reviews for these units
                const reviews = await Review.find({
                    targetId: { $in: unitIds },
                    targetType: "Unit",
                });

                const totalReviews = reviews.length;
                const averageRating =
                    totalReviews > 0
                        ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
                        : 0;

                return {
                    ...specService.toObject(),
                    totalReviews,
                    averageRating: Number(averageRating.toFixed(1)),
                };
            })
        );

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
};

//  Get Units by SpecificServiceId
exports.getUnitsBySpecificService = async (req, res) => {
    try {
        const { id } = req.params;
        const specService = await SpecificService.findById(id);
        if (!specService)
            return res.status(404).json({ message: "SpecificService not found" });

        const units = await Unit.find({ specificService: id }).sort({
            createdAt: -1,
        });

        // Enrich units with review stats
        const result = await Promise.all(
            units.map(async (unit) => {
                const reviews = await Review.find({
                    targetId: unit._id,
                    targetType: "Unit",
                });

                const totalReviews = reviews.length;
                const averageRating =
                    totalReviews > 0
                        ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
                        : 0;

                return {
                    ...unit.toObject(),
                    totalReviews,
                    averageRating: Number(averageRating.toFixed(1)),
                };
            })
        );

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
};

exports.getHeroByCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Find hero section where category matches
        const heroSection = await HeroSection.findOne({ category: id })
            .populate('title image'); // populate category info

        if (!heroSection) {
            return res.status(404).json({ message: 'Hero section not found for this category' });
        }

        return res.status(200).json(heroSection);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

exports.saveSlot = async (req, res) => {
    try {
        const userId = req.user ? req.user.userId : null;
        let guestId = req.headers["x-guest-id"]; // from frontend header
        const { bookingDate, timeSlot } = req.body;

        // ✅ Validate input
        if (!bookingDate || !timeSlot) {
            return res.status(400).json({ message: "Booking date and time slot are required" });
        }

        // Get cart
        const cartQuery = userId ? { user: userId } : { guestId };
        const cart = await Cart.findOne(cartQuery).populate("items.unit");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Your cart is empty" });
        }

        // Check if a pending booking exists
        let booking = userId
            ? await Booking.findOne({ user: userId, status: "Pending" })
            : null;

        const mappedItems = cart.items.map((item) => ({
            unit: item.unit._id,
            quantity: item.quantity,
            price: item.price,
        }));

        const subtotal = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        if (!booking) {
            // Create new booking
            booking = new Booking({
                user: userId, // required for logged-in users
                items: mappedItems,
                subtotal,
                tax: 0,
                tip: 0,
                totalAmount: subtotal,
                bookingDate,
                timeSlot,
                paymentMethod: "COD",
            });
        } else {
            // Update existing booking
            booking.items = mappedItems;
            booking.subtotal = subtotal;
            booking.totalAmount = subtotal;
            booking.bookingDate = bookingDate;
            booking.timeSlot = timeSlot;
        }

        await booking.save();

        return res.status(200).json({
            success: true,
            message: "Booking slot saved successfully",
            booking,
        });
    } catch (err) {
        console.error("Slot Save Error:", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
};

exports.createBooking = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { tip = 0, paymentMethod } = req.body;

        // ✅ Only COD allowed
        if (paymentMethod !== "COD") {
            return res.status(400).json({ message: "Only COD payment method is supported" });
        }

        // ✅ Find existing pending booking (with saved date/time)
        const booking = await Booking.findOne({ user: userId, status: "Pending" });
        if (!booking) {
            return res.status(404).json({
                message: "No pending booking found. Please select a booking date and time first.",
            });
        }

        // ✅ Get customer's address
        const customer = await Customer.findOne({ userId });
        if (!customer || !customer.address || !customer.address.HNo) {
            return res.status(400).json({
                message: "Please add your address before proceeding with booking",
            });
        }

        // ✅ Get user's cart
        const cart = await Cart.findOne({ user: userId }).populate("items.unit");
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // ✅ Calculate prices
        let subtotal = 0;
        cart.items.forEach((item) => {
            subtotal += item.price * item.quantity;
        });

        const tax = subtotal * 0.1; // 10% GST
        const totalAmount = subtotal + tax + tip;

        // ✅ Update existing booking
        booking.items = cart.items;
        booking.subtotal = subtotal;
        booking.tax = tax;
        booking.tip = tip;
        booking.totalAmount = totalAmount;
        booking.paymentMethod = "COD";
        booking.status = "Confirmed";

        await booking.save();

        // ✅ Clear cart after booking
        cart.items = [];
        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Booking finalized successfully with COD",
            booking,
        });
    } catch (err) {
        console.error("Booking Error:", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
};

// exports.verifyPayment = async (req, res) => {
//     try {
//        const userId = req.user.userId;
//         const { orderId, paymentId, signature, bookingDate, timeSlot, tip = 0 } =
//             req.body;

//         // Verify signature
//         // const body = orderId + "|" + paymentId;
//         // const expectedSignature = crypto
//         //     .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
//         //     .update(body.toString())
//         //     .digest("hex");

//         // if (expectedSignature !== signature) {
//         //     return res.status(400).json({ message: "Invalid payment signature" });
//         // }

//         // Get Cart
//         const cart = await Cart.findOne({ user: userId }).populate("items.unit");
//         if (!cart || cart.items.length === 0) {
//             return res.status(400).json({ message: "Cart is empty" });
//         }

//         // Get customer for address
//         const customer = await Customer.findOne({ userId });

//         // Calculate amounts again
//         let subtotal = 0;
//         cart.items.forEach((item) => {
//             subtotal += item.price * item.quantity;
//         });

//         const tax = subtotal * 0.1;
//         const totalAmount = subtotal + tax + tip;

//         // Save booking
//         const booking = new Booking({
//             user: userId,
//             items: cart.items,
//             subtotal,
//             tax,
//             tip,
//             totalAmount,
//             bookingDate,
//             timeSlot,
//             status: "Confirmed",
//             paymentMethod: "Razorpay",
//             paymentId,
//             orderId,
//             signature,
//         });

//         await booking.save();

//         // Clear cart
//         cart.items = [];
//         await cart.save();

//         return res
//             .status(201)
//             .json({ message: "Booking confirmed successfully", booking });
//     } catch (err) {
//         console.error("Verify Payment Error:", err);
//         return res
//             .status(500)
//             .json({ message: "Internal server error", error: err.message });
//     }
// };


exports.markNotificationAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId; // from auth middleware

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
        const userId = req.user.userId;

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
        const userId = req.user.userId; // from auth middleware

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
        const userId = req.user.userId; // from auth middleware
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

exports.addLabourerReview = async (req, res) => {
    try {
        const userId = req.user.userId; // from auth middleware
        const { labourerId } = req.params;
        const { rating, feedback } = req.body;

        // Validate labourer exists
        const labourer = await Labourer.findById(labourerId);
        if (!labourer) return res.status(404).json({ message: "Labourer not found" });

        // Check if user already reviewed this labourer
        const existingReview = await Review.findOne({ userId, targetId: labourerId, targetType: "Labourer" });
        if (existingReview) {
            return res.status(400).json({ message: "You already reviewed this labourer" });
        }

        const review = new Review({
            targetType: "Labourer",
            targetId: labourerId,
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
        const userId = req.user.userId;
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
        const userId = req.user.userId;
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



exports.getSpecificServiceDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const specService = await SpecificService.findById(id);
        if (!specService)
            return res.status(404).json({ message: "SpecificService not found" });

        // Get all units under this specificService
        const units = await Unit.find({ specificService: specService._id }).select("_id");
        const unitIds = units.map(u => u._id);

        // Get all reviews for these units and populate user name
        const reviews = await Review.find({
            targetId: { $in: unitIds },
            targetType: "Unit",
        }).populate("userId", "name email"); // populate name + email

        // Count reviews by star
        const starCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviews.forEach(r => {
            if (r.rating >= 1 && r.rating <= 5) starCounts[r.rating]++;
        });

        const totalReviews = reviews.length;
        const averageRating =
            totalReviews > 0
                ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
                : 0;

        return res.status(200).json({
            ...specService.toObject(),
            totalReviews,
            averageRating: Number(averageRating.toFixed(1)),
            starCounts,
            reviews: reviews.map(r => ({
                id: r._id,
                user: r.userId ? (r.userId.name || r.userId.email) : "Anonymous",
                rating: r.rating,
                comment: r.feedback,
                date: r.date || r.createdAt
            }))
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};

exports.getSpecificLabourDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const labour = await Labourer.findById(id);
        if (!labour) {
            return res.status(404).json({ message: "Labourer not found" });
        }

        // Get all reviews for this labourer and populate user name/email
        const reviews = await Review.find({
            targetType: "Labourer",
            targetId: labour._id,
        }).populate("userId", "name email");

        // Count reviews by star
        const starCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviews.forEach(r => {
            if (r.rating >= 1 && r.rating <= 5) starCounts[r.rating]++;
        });

        const totalReviews = reviews.length;
        const averageRating =
            totalReviews > 0
                ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
                : 0;

        return res.status(200).json({
            ...labour.toObject(),
            totalReviews,
            averageRating: Number(averageRating.toFixed(1)),
            starCounts,
            reviews: reviews.map(r => ({
                id: r._id,
                user: r.userId ? (r.userId.name || r.userId.email) : "Anonymous",
                rating: r.rating,
                comment: r.feedback,
                date: r.date || r.createdAt
            }))
        });

    } catch (err) {
        console.error("Error fetching labour details:", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};

exports.getLabourersByType = async (req, res) => {
    try {
        const { type } = req.params;
        const userId = req.user?.id;

        if (!["Individual", "Team"].includes(type)) {
            return res.status(400).json({ success: false, message: "Invalid labourer type" });
        }

        // 🔹 Get all accepted labourers by type
        const labourers = await Labourer.find({ registrationType: type, status: "Accepted" })
            .populate("userId", "name email mobileNumber");

        // 🔹 Get reviews
        const reviews = await Review.find({
            targetId: { $in: labourers.map(l => l._id) },
            targetType: "Labourer",
        });

        const reviewMap = {};
        reviews.forEach(r => {
            if (!reviewMap[r.targetId]) reviewMap[r.targetId] = [];
            reviewMap[r.targetId].push(r);
        });

        // 🔹 Prepare mapped data
        const mappedLabourers = labourers.map(labour => {
            const labourReviews = reviewMap[labour._id] || [];
            const totalReviews = labourReviews.length;
            const avgRating =
                totalReviews > 0
                    ? (labourReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
                    : 0;

            return {
                _id: labour._id,
                userId: labour.userId?._id,
                name: labour.userId?.name,
                email: labour.userId?.email,
                mobileNumber: labour.userId?.mobileNumber,
                distance: "0 km", // No distance calculation
                image: labour.image,
                skill: labour.skill,
                experience: labour.experience,
                cost: labour.cost,
                isAvailable: labour.isAvailable,
                averageRating: Number(avgRating),
                totalReviews,
                ...(type === "Team" && { teamName: labour.teamName || "Team" }),
            };
        });

        res.json({ success: true, labourers: mappedLabourers });
    } catch (error) {
        console.error("Error fetching labourers by type:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
exports.createLabourBooking = async (req, res) => {
    try {
        const {
            labourer: labourerId,
            startDate,
            endDate,
            numberOfWorkers,
            workLocation,
            purpose,
        } = req.body;

        const UserId = req.user?.userId;

        // 1️⃣ Check labourer exists
        const labourer = await Labourer.findById(labourerId);
        if (!labourer) {
            return res.status(404).json({ success: false, message: "Labourer not found" });
        }

        // 2️⃣ Determine labour type
        const labourType = labourer.registrationType; // "Individual" or "Team"

        const bookingData = {
            UserId: UserId,
            labourer: labourerId,
            labourType,
            startDate,
            endDate,
            status: "Pending",
        };

        // 3️⃣ Validate required fields
        if (labourType === "Individual") {
            if (!startDate || !endDate) {
                return res.status(400).json({
                    success: false,
                    message: "Start date and end date are required for Individual labour booking",
                });
            }
        } else if (labourType === "Team") {
            if (!numberOfWorkers || !workLocation || !purpose || !startDate || !endDate) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Number of workers, work location, purpose, start date and end date are required for Team labour booking",
                });
            }
            bookingData.numberOfWorkers = numberOfWorkers;
            bookingData.workLocation = workLocation;
            bookingData.purpose = purpose;
        } else {
            return res.status(400).json({
                success: false,
                message: `Invalid registration type: ${labourer.registrationType}`,
            });
        }

        // 4️⃣ Calculate totalDays, dailyRate, bookingCharge, tax, totalAmount
        const start = new Date(startDate);
        const end = new Date(endDate);
        const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

        let dailyRate = 0;
        // Booking Charge
        let tax = 0;
        let totalAmount = 0;


        if (labourType === "Individual") {
            const ratePerDay = labourer.cost || 0;
            dailyRate = ratePerDay;
            tax = Math.round((ratePerDay ) * 0.12); // 12% tax
            totalAmount = ratePerDay   + tax;
        } else if (labourType === "Team") {
            const ratePerLabour = labourer.cost || 0;
            dailyRate = ratePerLabour ;
          // constant
            tax = Math.round((dailyRate  ) * 0.12); // 12% tax
            totalAmount = dailyRate   + tax;
        }

        // 5️⃣ Add cost details to bookingData
        bookingData.totalDays = totalDays;
        bookingData.dailyRate = dailyRate;
        bookingData.serviceFees = dailyRate; // Booking Charge
        bookingData.tax = tax;
        bookingData.totalCost = totalAmount;

        // 6️⃣ Create booking
        const booking = await LabourBooking.create(bookingData);
        const totalLabours = labourType === "Individual" ? 1 : (numberOfWorkers || 1);

        res.status(201).json({
            success: true,
            booking,
            costBreakdown: {
                totalDays,
                totalLabours,
                bookingCharge: dailyRate , 
                tax,
                totalAmount,
            },
        });
    } catch (error) {
        console.error("Error creating labour booking:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
exports.getLabourBookings = async (req, res) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        // ✅ Fetch customer info (address only)
        const customer = await Customer.findOne({ userId }).select("address");
        if (!customer) {
            return res.status(404).json({ success: false, message: "Customer profile not found" });
        }

        // ✅ Fetch all bookings made by this user
        const bookings = await LabourBooking.find({ UserId: userId })
            .populate({
                path: "labourer",
                select: "registrationType skill teamName cost image experience address"
            })
            .sort({ createdAt: -1 });

        // ✅ Prepare individual & team bookings separately
        const individualBookings = [];
        const teamBookings = [];

        bookings.forEach((b) => {
            const start = new Date(b.startDate);
            const end = new Date(b.endDate);
            const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

            const numberOfWorkers = b.numberOfWorkers || 1;
            const baseCost = b.labourer?.cost || 0;
            const dailyRate =
                b.labourType === "Team" ? baseCost * numberOfWorkers : baseCost;

            const serviceFees = Math.round(dailyRate * totalDays * 0.1);
            const tax = Math.round((dailyRate * totalDays + serviceFees) * 0.18);
            const totalAmount = dailyRate * totalDays + serviceFees + tax;

            const bookingData = {
                bookingId: b.bookingId,
                labourType: b.labourType,
                startDate: b.startDate,
                endDate: b.endDate,
                numberOfWorkers: b.numberOfWorkers,
                workLocation: b.workLocation,
                purpose: b.purpose,
                status: b.status,
                totalDays,
                dailyRate,
                serviceFees,
                tax,
                totalAmount,
                labourer: {
                    id: b.labourer?._id,
                    skill: b.labourer?.skill,
                    teamName: b.labourer?.teamName,
                    cost: b.labourer?.cost,
                    image: b.labourer?.image,
                    experience: b.labourer?.experience,
                    address: b.labourer?.address,
                },
            };

            if (b.labourType === "Individual") {
                individualBookings.push(bookingData);
            } else if (b.labourType === "Team") {
                teamBookings.push(bookingData);
            }
        });

        // ✅ Final response
        res.status(200).json({
            success: true,
            individualBookings,
            teamBookings,
            customerAddress: customer.address,
        });

    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

exports.getAllHelpCenters = async (req, res) => {
    try {
        const helpCenters = await HelpCenter.find();
        res.json(helpCenters);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.getHelpCenterByHeading = async (req, res) => {
    try {
        const { heading } = req.params;

        // Case-insensitive search using regex
        const helpCenter = await HelpCenter.findOne({
            heading: { $regex: new RegExp(`^${heading}$`, "i") }
        });

        if (!helpCenter) {
            return res.status(404).json({ message: "Help Center section not found" });
        }

        res.json({
            message: "Help Center section fetched successfully",
            data: helpCenter
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.createRefundRequest = async (req, res) => {
    try {
        const userId = req.user.userId;        // from auth middleware
        const bookingId = req.params.id;       // from URL param
        const { message, refund } = req.body;  // from frontend

        if (!refund || !refund.mode) {
            return res.status(400).json({
                message: "Refund mode is required",
            });
        }

        const existingRefund = await Refund.findOne({ userId, bookingId });
        if (existingRefund) {
            return res.status(400).json({
                message: "A refund request for this booking already exists",
                data: existingRefund,
            });
        }

        const refundRequest = await Refund.create({
            userId,
            bookingId,
            message,
            refund,
        });

        res.status(201).json({
            message: "Refund request created successfully",
            data: refundRequest,
        });
    } catch (error) {
        console.error("Refund Creation Error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { reason } = req.body;

        if (!reason) {
            return res.status(400).json({ message: "Cancellation reason is required" });
        }

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (["Cancelled", "Refunded"].includes(booking.status)) {
            return res.status(400).json({
                message: `Booking with status "${booking.status}" cannot be cancelled`
            });
        }

        booking.status = "Cancelled";
        booking.cancellation = {
            reason,
            cancelledAt: new Date()
        };

        await booking.save();


        let refundCreated = false;
        if (booking.paymentMethod !== "COD") {
            const refund = new Refund({
                userId: booking.user,
                bookingId: booking._id,
                paymentId: booking.paymentId || null,
                reason,
                refund: {
                    mode: "original_payment_method"
                },
                status: "requested",
                refundAmount: booking.totalAmount
            });

            await refund.save();
            refundCreated = true;
        }

        res.status(200).json({
            message: "Booking cancelled successfully",
            booking,
            refundCreated
        });

    } catch (error) {
        console.error("Cancel Booking Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getBookingDetails = async (req, res) => {
    try {
        const { bookingId } = req.params;
        console.log("BookingId or PaymentId received in params:", bookingId);

        let booking;

        // Try to find booking directly by bookingId or MongoDB _id and populate items.unit
        booking =
            (await Booking.findOne({ bookingId }).populate("items.unit", "title image")) ||
            (await Booking.findById(bookingId).populate("items.unit", "title image"));

        // If not found, check if it's a payment _id and then fetch booking (also populate)
        if (!booking) {
            const payment = await Payment.findById(bookingId);
            if (payment && payment.bookingId) {
                console.log("Fetched booking using payment.bookingId:", payment.bookingId);
                booking = await Booking.findOne({ bookingId: payment.bookingId }).populate(
                    "items.unit",
                    "title image"
                );
            }
        }

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Fetch customer info
        const user = await User.findById(booking.user).select("name email mobileNumber");
        const customer = await Customer.findOne({ userId: booking.user });

        // Build full address
        const address = customer?.address
            ? [
                customer.address.HNo,
                customer.address.buildingName,
                customer.address.street,
                customer.address.area,
                customer.address.landmark,
                customer.address.townCity,
                customer.address.state,
                customer.address.pincode,
            ]
                .filter(Boolean)
                .join(", ")
            : "N/A";

        // Prepare items with titles/images from populated unit (fallbacks included)
        const items = (booking.items || []).map((item) => ({
            title: item.unit?.title || item.title || "N/A",
            image: item.unit?.image || item.image || null,
            price: item.price ?? item.unit?.price ?? 0,
            quantity: item.quantity ?? 1,
        }));

        // Response payload
        const response = {
            bookingId: booking.bookingId,
            _id: booking._id,
            customerName: user?.name || "N/A",
            customerEmail: user?.email || "N/A",
            customerMobile: user?.mobileNumber || "N/A",
            customerAddress: address,
            bookingDate: booking.bookingDate,
            bookedAt: booking.createdAt,
            orderConfirmedDate: booking.createdAt,
            serviceCompletedDate: booking.completedAt || null,
            status: booking.status,
            paymentMethod: booking.paymentMethod,
            totalItems: items.length,
            subtotal: booking.subtotal,
            tax: booking.tax,
            tip: booking.tip,
            totalAmount: booking.totalAmount,
            invoiceDetails: {
                bookingId: booking.bookingId,
                date: booking.bookingDate,
                customer: {
                    name: user?.name || "N/A",
                    email: user?.email || "N/A",
                    mobile: user?.mobileNumber || "N/A",
                    address: address,
                },
                items,
                summary: {
                    subtotal: booking.subtotal,
                    tax: booking.tax,
                    tip: booking.tip,
                    totalAmount: booking.totalAmount,
                },
            },
        };

        res.status(200).json({
            message: "Booking details fetched successfully",
            booking: response,
        });
    } catch (error) {
        console.error("Error fetching booking details:", error);
        res.status(500).json({
            message: "Error fetching booking details",
            error: error.message,
        });
    }
};