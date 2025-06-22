const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const Contact = require('../models/Contact');
const { getContactData, updateContactData, updateSection } = require('../controllers/contactController');
const streamifier = require('streamifier');

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', getContactData);
router.put('/', updateContactData);
router.patch('/:section', updateSection);

// Image upload endpoint
router.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const stream = cloudinary.uploader.upload_stream(
      { folder: 'contact-us' },
      (error, result) => {
        if (error) return res.status(500).json({ message: error.message });
        return res.json({ url: result.secure_url });
      }
    );
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;