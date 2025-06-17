const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  header: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true }
  },
  form: {
    reasons: [{ type: String }],
    privacyPolicyText: { type: String, required: true }
  },
  contactInfo: [{
    icon: { type: String, required: true }, // "mail", "phone", "chat", "location"
    title: { type: String, required: true },
    items: [{ type: String, required: true }]
  }],
  formLabels: {
    fullName: { type: String, default: "Full Name *" },
    contactNumber: { type: String, default: "Contact Number *" },
    email: { type: String, default: "Email Address *" },
    reasonLabel: { type: String, default: "Select Enquiry Reason *" },
    message: { type: String, default: "Message" }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);