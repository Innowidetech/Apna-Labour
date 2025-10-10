const mongoose = require("mongoose");

const AccordionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
}, { _id: false });

const HelpCenterSchema = new mongoose.Schema({
    heading: { type: String, required: true }, // e.g., "Service Related"
    accordions: [AccordionSchema], // Array of help topics under this heading
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
}, { timestamps: true });

module.exports = mongoose.model("HelpCenter", HelpCenterSchema);
