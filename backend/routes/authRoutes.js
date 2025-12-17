const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// REGISTER
router.post('/register', async (req, res) => {
    try {
        // Password ko encrypt karo
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            role: req.body.role
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(404).json("User not found");

        // Password check karo
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json("Wrong Password");

        // Agar sab sahi hai, toh User ka Role wapas bhejo
        res.status(200).json({ username: user.username, role: user.role, _id: user._id });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;