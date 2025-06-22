const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dplxwyxen',
  api_key: '935135358757851',
  api_secret: 'kO3pvyGQL2Oam9ycXCQb9o4-sG8'
});

module.exports = cloudinary;