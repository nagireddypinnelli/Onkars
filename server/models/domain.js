var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DomainSchema = new mongoose.Schema({
    name: String,
    isDelete: { type: Boolean, default: false },
    description :String
});

module.exports = mongoose.model('domain', DomainSchema);
