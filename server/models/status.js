var mongoose = require('mongoose');

var StatusSchema = new mongoose.Schema({
  name: String,
  setFirst: { type: String, default: "0" },
  isDelete: { type: Boolean, default: false },
  description:String

});

module.exports = mongoose.model('status', StatusSchema);
