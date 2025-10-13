const User = require('../models/User');
const Labourer = require('../models/Labourer');
const Customer = require('../models/Customer');
const TrainingDetails = require('../models/TrainingDetails');
const Contact = require('../models/Contact');


const bcrypt = require('bcryptjs');



exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user?.id);
        if (!user || user.role !== 'Labourer') { return res.status(403).json({ message: "Access Denied, only labourer have access" }) }

        const labourer = await Labourer.findOne({ userId: user._id }).populate("userId", "name email mobileNumber isActive");

        const trainingDetails = await TrainingDetails.findOne({ labourerId: labourer._id });
        if (!trainingDetails) { return res.status(404).json({ message: "No training details found" }) }

        const response = trainingDetails.trainingStatus != true ? trainingDetails : labourer
        res.status(200).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.status })
    }
};

exports.registerLabourer = async (req, res) => {
    try {
        const {
            name,
            email,
            mobileNumber,
            registrationType,
            subject,
            message,
            address,
            serviceCity,
            category, // only for Professional
            skill      // only for Individual or Team
        } = req.body;

        // 1️⃣ Check if email or mobile already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { mobileNumber }]
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Email or mobile number already registered' });
        }

        // 2️⃣ Create User
        const user = await User.create({
            name,
            email,
            mobileNumber,
            role: 'Labourer'
        });

        // 3️⃣ Prepare Labourer data
        const labourerData = {
            userId: user._id,
            registrationType,
            subject,
            message,
            address,
            serviceCity,
            status: 'Pending'
        };

        // 4️⃣ Conditional fields based on registrationType
        if (registrationType === 'Professional') {
            if (!category) {
                return res.status(400).json({ message: 'Category is required for Professional labourers' });
            }
            labourerData.category = category;
        } else if (registrationType === 'Individual' || registrationType === 'Team') {
            if (!skill) {
                return res.status(400).json({ message: 'Skill is required for Individual or Team labourers' });
            }
            labourerData.skill = skill;
            if (registrationType === 'Team') {
                labourerData.teamName = 'Team'; // default team name
            }
        }

        // 5️⃣ Create Labourer
        const labourer = await Labourer.create(labourerData);

        return res.status(201).json({
            success: true,
            message: 'Registration successful. Please wait for admin approval.',
            user,
            labourer
        });

    } catch (error) {
        console.error('Error in labourer registration:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.createContact = async (req, res) => {
    try {
        const { subject, message, name, email, mobileNumber } = req.body;

        if (!subject || !message || !name || !mobileNumber) {
            return res.status(400).json({ success: false, message: "All required fields must be filled" });
        }

        const contact = await Contact.create({
            subject,
            message,
            name,
            email,
            mobileNumber
        });

        return res.status(201).json({
            success: true,
            message: "Your enquiry has been submitted successfully",
            contact
        });
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

exports.addTeamMember = async (req, res) => {
  try {
    // Temporarily accept userId from body
    const { userId, name, language, experience, mobileNumber } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    // Find the Labourer by userId
    const leader = await Labourer.findOne({ userId });
    if (!leader) {
      return res.status(404).json({ message: "Labourer not found" });
    }

    // Only Team registrationType can add members
    if (leader.registrationType !== "Team") {
      return res.status(403).json({ message: "Only team leaders can add members" });
    }

    // Create Team Member linked to this Labourer
    const member = await TeamMember.create({
      teamLeader: leader._id,
      name,
      language,
      experience,
      mobileNumber
    });

    res.status(201).json({
      message: "Team member added successfully",
      data: member
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

