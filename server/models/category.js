var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    name: String,
    isDelete: { type: Boolean, default: false },
    description :String
});

module.exports = mongoose.model('category', CategorySchema);
