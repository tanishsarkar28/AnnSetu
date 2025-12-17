const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Routes Import
const authRoutes = require('./routes/authRoutes');
const donationRoutes = require('./routes/donationRoutes');

const app = express();

// --- CORS CONFIGURATION (Mobile Fix) ---
app.use(cors({
    origin: '*', // Iska matlab: Kisi bhi source (Mobile/Laptop) se request accept karo
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
// ---------------------------------------

app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch((err) => console.log('MongoDB Connection Error: ', err));

// Routes Use
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);

// Testing Route (Browser par check karne ke liye)
app.get('/', (req, res) => {
    res.send('Ann-Setu Backend is Running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});