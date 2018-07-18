var mongoose = require('mongoose');
var profile = require('../models/profile.js');
var multer = require('multer');
var Schema = mongoose.Schema;


var ProfileSchema = new mongoose.Schema({
    skills: String,
    designations: String,
    gender: String,
    contactInfo: String,
    filename: String,
    filelocation: String,
    account: { type: Schema.ObjectId, ref: 'account' },
    
});

module.exports = mongoose.model('profile', ProfileSchema);
