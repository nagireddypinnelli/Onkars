var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = new mongoose.Schema({
    name: String,
    isDelete: { type: Boolean, default: false }
});

module.exports = mongoose.model('role', RoleSchema);
