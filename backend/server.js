const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const donationRoutes = require('./routes/donationRoutes');

const app = express();

// 👇 Sirf ye line change karni hai (sabse simple aur powerful fix)
app.use(cors());
// (Iska matlab: Bina kisi shart ke sabko aane do)

app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch((err) => console.log('MongoDB Connection Error: ', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);

app.get('/', (req, res) => {
    res.send('Ann-Setu Backend is Running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});