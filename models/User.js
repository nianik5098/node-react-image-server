'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProfilesSchema = new Schema({
    name: String,
    email: String,
    password: String
});


module.exports = mongoose.model('Profiles', ProfilesSchema);

