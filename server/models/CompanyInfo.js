const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
            trim: true,
        },

        companyMail: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid company email format"],
        },

        contactNumber: {
            type: String,
            required: true,
            trim: true,
            match: [/^[0-9]{10}$/, "Contact number must be 10 digits"],
        },

        emailAddress: {
            type: String,
            default: null,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
        },

        address: {
            type: String,
            required: true,
            trim: true,
        },

        gstNumber: {
            type: String,
            required: true,
            uppercase: true,
            trim: true,
            match: [/^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1})$/, "Invalid GST number"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema);
