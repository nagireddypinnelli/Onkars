var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new mongoose.Schema({
    name: String,
    domain: { type: Schema.ObjectId, ref: 'domain' },
    isDelete: { type: Boolean, default: false },
    description: String,
    accountType: String,
    customerEngagement: String,
    customerInnovationAdaption:String,
    vertical: { type: Schema.ObjectId, ref: 'vertical' },
    weightedPipeline : String
});

module.exports = mongoose.model('account', AccountSchema);
