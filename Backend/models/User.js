const express = require('express');
const mongoose = require('mongoose');
require('mongoose-type-email');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        // unique: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    locationlong: {
        type: String,
        required: true,
    },
    locationlat: {
        type: String,
        required: true,
    },
    EP_type: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

},
    {
        collection: 'users' // Specify the collection name here
    });

module.exports = mongoose.model('User', userSchema);
