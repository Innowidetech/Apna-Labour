const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema(
  {
    teamLeader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Labourer', // Linked to the Labourer (Team Leader)
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Optional: link to User
      required: false
    },
    name: {
      type: String,
      required: true,
      trim: true
    },

    language: {
      type: String,
      required: true
    },

    experience: {
      type: String,
      default: ''
    },

    mobileNumber: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"]
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('TeamMember', TeamMemberSchema);