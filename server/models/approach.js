var mongoose = require('mongoose');

var ApproachSchema = new mongoose.Schema({
    name: String,
    isDelete: { type: Boolean, default: false },
    description:String
});

module.exports = mongoose.model('approach', ApproachSchema);
