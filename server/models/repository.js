var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*validation for repository*/
var validateUniqueFoldername = function (value, callback) {
    var repository = mongoose.model('repository');
    repository.find({
        $and: [{
         folderName: new RegExp(["^", value, "$"].join(""), "i")
        }, {
            _id: {
                $ne: this._id
            }
        }]
    }, function (err, folderName) {
        callback(err || folderName.length === 0);
    });
};


/*Repository schema*/

var RepositorySchema = new mongoose.Schema({
    folderName: {
        type: String,
        unique: true,
        validate: [validateUniqueFoldername, 'Repository Name Already Exists Please Try With Different Name !']
    },
    tag: String ,
    ismainFolder: {
        type: Boolean,
    },
    innerFiles: [{
        filename: {
            type: String,
        },
        isFolder: { type: Boolean },
        parentfolderId: { type: Schema.ObjectId, ref: 'repository' },
        filelocation: { type: String },
        tagName: [{ type: String }]
    }],

    innerFolder: []
});

module.exports = mongoose.model('repository', RepositorySchema);


