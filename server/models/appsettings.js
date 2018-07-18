var mongoose = require('mongoose');

var AppsettingsSchema = new mongoose.Schema({
    cronJobLastRunAt: { type: Date, default: Date.now },
    cronjobName:String
});


module.exports = mongoose.model('appsettings', AppsettingsSchema);
