const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const labourBookingSchema = new mongoose.Schema(
  {
    // Unique Booking ID
    bookingId: {
      type: String,
      unique: true,
      default: function () {
        return "LAB-" + uuidv4().split("-")[0].toUpperCase();
      },
    },

    // Customer who made the booking
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
     bookingDate: { type: Date },
     timeSlot: { type: String },

    // Labourer being booked
    labourer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Labourer",
      required: true,
    },

    // Individual or Team
    labourType: {
      type: String,
      enum: ["Individual", "Team"],
      required: true,
    },

    // Common fields
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    // Team specific fields
    numberOfWorkers: { type: Number, default: 1 },
    workLocation: { type: String },
    purpose: { type: String },

    // Payment Option (only relevant for Team)
    paymentOption: {
      type: String,
      enum: ["full", "daily"], // only for Team
      default: "full",
    },
    dailyAmount: { type: Number }, // only for Team daily payment

    // Cost and payment
    totalCost: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["Razorpay", "UPI", "NetBanking", "COD"],
      default: "COD",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Partial", "Failed"],
      default: "Pending",
    },

    // Booking status
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },

    bookedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("labourBooking", labourBookingSchema);
