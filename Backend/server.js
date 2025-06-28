const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Health check routes
app.get("/", (req, res) => {
  res.status(200).send("Backend is Live");
});

// Optional better route for uptime pings
app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

// Routes
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/contact-submissions', require('./routes/contactSubmissionRoutes'));
app.use('/api/appointment-submissions', require('./routes/appointmentSubmissionRoutes'));
app.use('/api/banners', require('./routes/bannerRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
