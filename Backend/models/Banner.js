const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  image: { type: String, required: true }, // URL to banner image
  link: { type: String }, // Optional: link to a page/product
  buttonText: { type: String, default: "Learn More" }, // <-- Add this line
  order: { type: Number, default: 0 }, // For sorting banners
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Banner', bannerSchema);