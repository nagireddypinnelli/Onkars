var mongoose = require('mongoose');

var VerticalSchema = new mongoose.Schema({
    name: String,
    isDelete: { type: Boolean, default: false }
});

module.exports = mongoose.model('vertical', VerticalSchema);
