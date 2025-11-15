
const Services = require('../models/Services');
const User = require('../models/User');
const Labourer = require('../models/Labourer');
const {
    Category,
    SubCategory,
    AppliancesType,
    ServiceType,
    SpecificService,
    HeroSection,
    Unit
} = require("../models/Services");



exports.getServices = async (req, res) => {
    try {
        const services = await Services.find().populate('subCategories.serviceTypes.reviews.userId');
        if (!services) { return res.status(404).json({ message: "No services yet" }) }

        res.status(200).json(services)
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

exports.getProfessionalLabourers = async (req, res) => {
  try {
    // Fetch all Professional labourers
    const labourers = await Labourer.find({ registrationType: 'Professional' })
      .populate('userId', '-password -otp -otpExpiry -googleId') // hide sensitive info
      .populate('category', 'title image') // only show title & image of category
      .select('-__v'); // optional: exclude mongoose version key

    if (!labourers.length) {
      return res.status(404).json({
        success: false,
        message: 'No professional labourers found',
      });
    }

    res.status(200).json({
      success: true,
      count: labourers.length,
      data: labourers,
    });
  } catch (error) {
    console.error('Error fetching professional labourers:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

exports.getAllSpecificServices = async (req, res) => {
    try {
        const services = await SpecificService.find().sort({ createdAt: -1 });

        if (!services || services.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No specific services found",
            });
        }

        res.status(200).json({
            success: true,
            total: services.length,
            data: services,
        });
    } catch (error) {
        console.error("Error fetching specific services:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching specific services",
            error: error.message,
        });
    }
};





