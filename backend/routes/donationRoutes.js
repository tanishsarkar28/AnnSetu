const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

// 1. POST: Add Donation
router.post('/add', async (req, res) => {
    try {
        const newDonation = new Donation(req.body);
        const savedDonation = await newDonation.save();
        res.status(200).json(savedDonation);
    } catch (err) { res.status(500).json(err); }
});

// 2. GET: All Available Food (Jo abhi tak kisi ne claim nahi kiya)
router.get('/all', async (req, res) => {
    try {
        const donations = await Donation.find({ status: 'available' });
        res.status(200).json(donations);
    } catch (err) { res.status(500).json(err); }
});

// --- 3. NEW: My Claims (Jo sirf current NGO ne claim kiya hai) ---
router.get('/my-claims', async (req, res) => {
    try {
        // Frontend humein userId bhejeg (query params mein)
        const userId = req.query.userId;
        const myClaims = await Donation.find({ 
            status: 'claimed', 
            claimedBy: userId 
        });
        res.status(200).json(myClaims);
    } catch (err) { res.status(500).json(err); }
});
// -----------------------------------------------------------------

// 4. PUT: Update Status (Claim karne ke liye ya Collect karne ke liye)
router.put('/update/:id', async (req, res) => {
    try {
        const updatedDonation = await Donation.findByIdAndUpdate(
            req.params.id,
            { 
                status: req.body.status,
                // Agar claimedBy aa raha hai toh update karo, nahi toh purana rehne do
                ...(req.body.claimedBy && { claimedBy: req.body.claimedBy }) 
            },
            { new: true }
        );
        res.status(200).json(updatedDonation);
    } catch (err) { res.status(500).json(err); }
});

module.exports = router;