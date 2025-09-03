const User = require('../models/User');
const Labourer = require('../models/Labourer');
const Customer = require('../models/Customer');
const TrainingDetails = require('../models/TrainingDetails');

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
        const userId = req.user.id; // from JWT
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if already a labourer
        const alreadyLabourer = await Labourer.findOne({ userId });
        if (alreadyLabourer) {
            return res.status(400).json({ message: 'You are already registered as a labourer' });
        }

        const { address, serviceCity, category } = req.body;

        // 1. Update user role to Labourer
        user.role = 'Labourer';
        await user.save();

        // 2. Create Labourer document
        const newLabourer = new Labourer({
            userId: user._id,
            address,
            serviceCity,
            category,
            role: 'Labourer',
            isAccepted: false,
        });

        await newLabourer.save();

        return res.status(201).json({
            message: 'Registered as labourer successfully',
            labourer: newLabourer
        });
    } catch (err) {
        console.error('Register Labourer Error:', err);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};


