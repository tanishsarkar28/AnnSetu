const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const donationRoutes = require('./routes/donationRoutes');

const app = express();

// Basic CORS setup: allow all or restrict via env var
const corsOptions = {};
if (process.env.CORS_ORIGIN) {
    corsOptions.origin = process.env.CORS_ORIGIN;
}
app.use(cors(corsOptions));

app.use(express.json());

// Database Connection
if (!process.env.MONGO_URI) {
    console.error('ERROR: MONGO_URI is not set. Please create a .env file or set the environment variable.');
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch((err) => {
        console.error('MongoDB Connection Error: ', err);
        process.exit(1);
    });

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