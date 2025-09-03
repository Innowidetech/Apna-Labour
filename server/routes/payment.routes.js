const express = require("express");
const router = express.Router();
const { createPaymentOrder, verifyPayment, cancelPayment } = require("../controllers/payment.controller");
const { protect } = require("../middleware/auth.middleware");

// Create Razorpay Order
router.post("/order", protect, createPaymentOrder);

// Verify Razorpay Payment
router.post("/verify", protect, verifyPayment);

// Cancel Payment
router.post("/cancel/:bookingId", protect, cancelPayment);

module.exports = router;



