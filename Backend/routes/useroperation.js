const express = require('express');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const G_collect = require('../models/Garbage_collector.js');
const fetchuser = require('../middlewear/fetchuser.js');
const router = express.Router();


router.post('/col/retuser', fetchuser, async (req, res) => {
    try {
        const users = await User.find({}, 'locationlong locationlat'); // Assuming User model has 'name' and 'location' fields
        res.json(users);
    } catch (error) {
        console.error('Error retrieving user locations:', error);
        res.status(500).json({ error: 'Failed to retrieve user locations' });
    }
});