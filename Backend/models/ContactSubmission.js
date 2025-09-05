const mongoose = require('mongoose');

const contactSubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  reason: { type: String, required: true },
  message: { type: String },
  userId: { type: String }, // Clerk user ID
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ContactSubmission', contactSubmissionSchema);