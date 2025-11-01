// controllers/paymentController.js
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const sendTestMail = require("../utils/sendTestMail");
const testMail = require("../utils/testMail");
const LabourBooking = require("../models/labourBooking");
const Cart = require("../models/Cart");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY
});


// Create Razorpay Order
// exports.createPaymentOrder = async (req, res) => {
//     try {
//         const { bookingId } = req.body;
//         const userId = req.user.userId;

//         const booking = await Booking.findById(bookingId);
//         if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

//         const options = {
//             amount: booking.totalAmount * 100, // totalAmount in paise
//             currency: "INR",
//             receipt: `receipt_${booking._id}`
//         };

//         const order = await razorpay.orders.create(options);

//         const payment = new Payment({
//             userId,
//             bookingId,
//             customerId: booking.user,
//             amount: booking.totalAmount,
//             orderId: order.id
//         });

//         await payment.save();

//         res.status(201).json({ success: true, order });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

exports.createPaymentOrder = async (req, res) => {
    try {
        const { bookingId } = req.body; // only one field from frontend
        const userId = req.user.userId; // from your auth middleware

        let booking;
        let bookingType;

        // 1️⃣ Try to find booking in both collections
        booking = await Booking.findById(bookingId);
        if (booking) {
            bookingType = "service";
        } else {
            booking = await LabourBooking.findById(bookingId);
            if (booking) bookingType = "labour";
        }

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found in either collection",
            });
        }

        // 2️⃣ Get total amount based on model
        const totalAmount =
            bookingType === "labour"
                ? booking.totalCost * 100
                : booking.totalAmount * 100;

        // 3️⃣ Create Razorpay order
        const order = await razorpay.orders.create({
            amount: totalAmount,
            currency: "INR",
            receipt: `receipt_${booking._id}`,
            payment_capture: 1,
        });

        // 4️⃣ Save payment record
        const payment = new Payment({
            userId,
            bookingId: booking._id,
            amount:
                bookingType === "labour"
                    ? booking.totalCost
                    : booking.totalAmount,
            orderId: order.id,
            status: "created",
            bookingType, // optional — for tracking
        });
        await payment.save();

        // 5️⃣ Update booking with payment info
        if (bookingType === "labour") {
            booking.paymentMethod = "Razorpay";
            booking.paymentStatus = "Pending";
        } else {
            booking.orderId = order.id;
            booking.paymentMethod = "Razorpay";
        }
        await booking.save();


        // 6️⃣ Send response
        res.status(201).json({
            success: true,
            message: "Payment order created successfully",
            order,
            booking,
        });
    } catch (error) {
        console.error("Error creating payment order:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// Verify Razorpay Payment
exports.verifyPayment = async (req, res) => {
    try {
        const { orderId, paymentId, signature, bookingId } = req.body;

        const payment = await Payment.findOne({ orderId });
        if (!payment)
            return res.status(404).json({ success: false, message: "Payment not found" });

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
            .update(orderId + "|" + paymentId)
            .digest("hex");

        if (expectedSignature !== signature) {
            return res.status(400).json({ success: false, message: "Invalid payment signature" });
        }

        // Save bookingId if not already present
        if (bookingId && !payment.bookingId) {
            payment.bookingId = bookingId;
        }

        payment.paymentId = paymentId;
        payment.signature = signature;
        payment.status = "paid";
        await payment.save();

        if (payment.bookingId) {
            await Booking.findByIdAndUpdate(payment.bookingId, {
                paymentStatus: "paid",
                status: "Confirmed"
            });
        }

        // Clear user cart
        await Cart.findOneAndUpdate(
            { userId: payment.userId },
            { $set: { items: [] } }
        );

        res.json({ success: true, message: "Payment verified successfully, cart cleared" });

    } catch (error) {
        console.error("Verify Payment Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Cancel Payment & Booking
exports.cancelPayment = async (req, res) => {
    try {
        const { bookingId } = req.params;  //  Now from params

        // 1. Find booking
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        // 2. Find related payment
        const payment = await Payment.findOne({ bookingId });
        if (!payment) {
            return res.status(404).json({ success: false, message: "Payment not found" });
        }

        // 3. Handle already cancelled/refunded
        if (["cancelled", "refunded"].includes(payment.status)) {
            return res.status(400).json({
                success: false,
                message: `Payment already ${payment.status}`
            });
        }

        // 4. If payment is already paid, refund
        if (payment.status === "paid") {
            const refund = await razorpay.payments.refund(payment.paymentId, {
                amount: payment.amount * 100, // in paise
                speed: "optimum"
            });

            payment.status = "refunded";
            booking.paymentStatus = "refunded";
            booking.status = "cancelled";
            await payment.save();
            await booking.save();

            return res.status(200).json({
                success: true,
                message: "Payment refunded and booking cancelled",
                refund
            });
        }

        // 5. If not paid, just mark cancelled
        payment.status = "cancelled";
        booking.paymentStatus = "cancelled";
        booking.status = "cancelled";

        await payment.save();
        await booking.save();

        return res.status(200).json({
            success: true,
            message: "Payment cancelled successfully"
        });

    } catch (error) {
        console.error("Cancel Payment Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.sendTestMailController = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email address is required" });
        }

        await sendTestMail(email, "Apna Labour Test Mail", testMail());
        res.status(200).json({ success: true, message: "Test email sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



