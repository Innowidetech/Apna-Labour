const Services = require('../models/Services');

exports.getServices = async (req,res) => {
    try {
        const services = await Services.find().populate('subCategories.serviceTypes.reviews.userId');
        if(!services){return res.status(404).json({message:"No services yet"})}

        res.status(200).json(services)
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};








