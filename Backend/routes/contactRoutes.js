const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');
const Contact = require('../models/Contact');
const { getContactData, updateContactData, updateSection } = require('../controllers/contactController');

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', getContactData);
router.put('/', updateContactData);
router.patch('/:section', updateSection);

// Image upload endpoint (Promise-based)
router.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // Wrap upload_stream in a Promise
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'contact-us' },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req);
    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Cloudinary upload failed' });
  }
});

module.exports = router;