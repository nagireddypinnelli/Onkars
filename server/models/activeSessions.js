var mongoose = require('mongoose');

var ActiveSessionsSchema = new mongoose.Schema({
    userId: String,
    loggedInTime: { type: Date, default: Date.now },
    loggedOutTime: { type: Date },
    lastActiveTime: { type: Date },
    token: String,
    publicToken: String,
    status: Number,
    device:String
});

module.exports = mongoose.model('activesessions', ActiveSessionsSchema);