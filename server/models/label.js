var mongoose = require('mongoose');

var LabelSchema = new mongoose.Schema({
    name: String,
    isDelete: { type: Boolean, default: false },
    description :String
});

module.exports = mongoose.model('label', LabelSchema);
