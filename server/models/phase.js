var mongoose = require('mongoose');

var PhaseSchema = new mongoose.Schema({
  name: String,
  setFirst: {type: String, default: "0"},
  logo: String,
  isDelete: { type: Boolean, default: false }
});

module.exports = mongoose.model('phase', PhaseSchema);
