const mongoose = require('mongoose');
const express = require('express');
const mangoURI = 'mongodb://localhost:27017/garbageit';


const connectToMango =  () => {
    mongoose.connect(mangoURI).then(() => {
        console.log('successfully connected to database');
    })
}

module.exports = connectToMango;