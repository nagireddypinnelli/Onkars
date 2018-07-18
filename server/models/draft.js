var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DraftSchema = new mongoose.Schema({
    problemId: { type: Number, default: 1 },
    title: String,
    problemStatement: String,
    status: { type: Schema.ObjectId, ref: 'status' },
    tags: [{ "categoryId": { type: Schema.ObjectId, ref: 'category' }, "accountId": { type: Schema.ObjectId, ref: 'account' }, tagType: String }],
    approvalStatus: { approvalStatus: String, approvalDate: { type: Date, default: Date.now }, approvedUser: { type: Schema.ObjectId, ref: 'User' } },
    contributors: [{ type: Schema.ObjectId, ref: 'User' }],
    phase: { type: Schema.ObjectId, ref: 'phase' },
    category: [{ type: Schema.ObjectId, ref: 'category' }],
    priority: String,
    account: { type: Schema.ObjectId, ref: 'account' },
    domain: { type: Schema.ObjectId, ref: 'domain' },
    businessImpact: { type: String },
    customerStakeholders: [{ name: String, role: String }],
    estimateOfCustomer: { type: String },
    ustShare: { type: String },
    targetBusinessGeography: [{ businessUnit: String, geography: String }],
    customerPains: [{ description: String, quantifiedValue: String, stackholders: [{ name: String, role: String }], impactedTask: String }],
    customerGains: [{ description: String, quantifiedValue: String, stackholders: [{ name: String, role: String }], impactedTask: String }],
    otherInfo: String,
    assumptions: String,
    createdDateTime: { type: Date, default: Date.now },
    createdBy: { type: Schema.ObjectId, ref: 'User' },
    solutionNeedDate: { type: Date },
    solutionPlannedClosureDate: { type: Date },
    owner: { type: Schema.ObjectId, ref: 'User' },
    approach: { type: Schema.ObjectId, ref: 'approach' },
    vertical: [{ type: Schema.ObjectId, ref: 'vertical' }],
    views: [{ type: Schema.ObjectId, ref: 'User' }],
    attachments: [{ attachment: String, orginalFilename: String, attchedUser: { type: Schema.ObjectId, ref: 'User' } }],
    IsCompleted :{type :Boolean ,default :false}
});

module.exports = mongoose.model('draft', DraftSchema);
