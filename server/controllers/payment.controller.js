// controllers/paymentController.js
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY
});


// Create Razorpay Order
exports.createPaymentOrder = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const userId = req.user.id; 

        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

        const options = {
            amount: booking.totalAmount * 100, // totalAmount in paise
            currency: "INR",
            receipt: `receipt_${booking._id}`
        };

        const order = await razorpay.orders.create(options);

        const payment = new Payment({
            userId,                    
            bookingId,
            customerId: booking.user,  
            amount: booking.totalAmount,
            orderId: order.id
        });

        await payment.save();

        res.status(201).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Verify Razorpay Payment
exports.verifyPayment = async (req, res) => {
    try {
        const { orderId, paymentId, signature } = req.body;

        const payment = await Payment.findOne({ orderId });
        if (!payment) return res.status(404).json({ success: false, message: "Payment not found" });

        // 🔹 Signature verification
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
            .update(orderId + "|" + paymentId)
            .digest("hex");

        if (expectedSignature !== signature) {
            return res.status(400).json({ success: false, message: "Invalid payment signature" });
        }

        // 🔹 Update payment and booking
        payment.paymentId = paymentId;
        payment.signature = signature;
        payment.status = "paid";
        await payment.save();

        await Booking.findByIdAndUpdate(payment.bookingId, {
            paymentStatus: "paid",
            status: "Confirmed"
        });

        res.json({ success: true, message: "Payment verified successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// Cancel Payment & Booking
exports.cancelPayment = async (req, res) => {
    try {
        const { bookingId } = req.params;  // 🔹 Now from params

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
