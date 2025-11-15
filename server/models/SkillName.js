const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema(
    {
        skillName: {
            type: String,
            required: true,
            trim: true,
        },
        ratePerDay: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Skill", SkillSchema);