const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Routes Import karna
const donationRoutes = require('./routes/donationRoutes');
const authRoutes = require('./routes/authRoutes'); // <--- Yeh naya add kiya hai

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // JSON data padhne ke liye
app.use(cors()); // Frontend aur Backend connect karne ke liye

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => console.log("MongoDB Connection Error: ", err));

// API Routes
app.use('/api/auth', authRoutes);        // <--- Login aur Register ke liye
app.use('/api/donations', donationRoutes); // <--- Food Donation ke liye

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});