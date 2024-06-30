const mongoose = require('mongoose');
require('mongoose-type-email');
// import mongoose from 'mongoose';
const { Schema } = mongoose;


const garbage_collector = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    governmentID: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    vehicleType: {
        type: String,
        required: true,
    },
    helperAssociated: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

},
    {
        collection: 'gc' // Specify the collection name here
    });

module.exports = mongoose.model('G_collect', garbage_collector);