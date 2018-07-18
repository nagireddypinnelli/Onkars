var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var EventSchema = new mongoose.Schema({
	type: String,
	typeId: String,
	createdDateTime: { type: Date, default: Date.now },
	proposedDateTime: Date,
	location: String,
	members: [String]
});

module.exports = mongoose.model('event', EventSchema);

