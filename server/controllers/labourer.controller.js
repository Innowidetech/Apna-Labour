const User = require('../models/User');
const Labourer = require('../models/Labourer');
const Customer = require('../models/Customer');
const TrainingDetails = require('../models/TrainingDetails');


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