var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupSchema = new mongoose.Schema({
    name: String,
    users: [{ type: Schema.ObjectId, ref: 'User' }],
    isDelete: { type: Boolean, default: false }
});

module.exports = mongoose.model('group', GroupSchema);