const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donorName: { type: String, required: true },
    foodItem: { type: String, required: true },
    quantity: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true },
    expiryTime: { type: Date, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    
    // --- NEW FIELD: Kisne claim kiya? ---
    claimedBy: { type: String, default: null }, 
    // ------------------------------------

    status: {
        type: String,
        enum: ['available', 'claimed', 'collected'],
        default: 'available'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', donationSchema);