var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SignInIssueSchema = new mongoose.Schema({
    username: String,
    createdDate: { type: Date, default: Date.now },
    status: Number
});

module.exports = mongoose.model('reportProblem', SignInIssueSchema);