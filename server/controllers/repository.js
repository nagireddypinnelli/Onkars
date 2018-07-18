"use strict";
var mongoose = require('mongoose');
var repository = require('../models/repository.js');
var multer = require('multer');
var _ = require('underscore');


/* get main maindetails */
exports.get = function (req, res, next) {
    repository.find()
            .exec(function (err, response) {
                if (err) return next(err);
                res.json(response);
            });
};

/* create main folder */
exports.create = function (req, res, next) {
    repository.create(req.body.repository, function (err, repository) {
       if (err) {
           res.status(500).send({ err });
            } else {
              res.json(repository);
        }
    });
}; 

/* get the Repository details */
exports.getById = function (req, res, next) {
    repository.findById(req.params.id)
            .exec(function (err, response) {
                if (err) return next(err);
                res.json(response);
            });
};

/* Uploading the files */
exports.addFiles = function (req, res, next) {
    var fileDetails = req.body.fileDetails;
    repository.find({ _id: fileDetails._id },
                 { innerFiles: { $elemMatch: { filename: fileDetails.filename } } }, function (err, response) {
                     if (response[0].innerFiles.length > 0) {
                         res.status(500).send({ error: 'File Name Already Exists Please Try With Different Name !' });
                     }else{
                         repository.findByIdAndUpdate(fileDetails._id, {
                             $push: {
                                 innerFiles: {
                                     "filename": fileDetails.filename,
                                     "isFolder": fileDetails.isFolder,
                                     "parentfolderId": fileDetails.parentfolderId,
                                     "filelocation": fileDetails.filelocation
                                 }
                             }
                         }, { new: true }, function (err, post) {
                             if (err) return next(err);
                             res.json(post);
                         });
                     }
                 })
};






/* Creating the inner Repository*/
exports.createInnerRepository = function (req, res, next) {

    var opts = { runValidators: true };
    var innerFolderDetails = req.body.innerFolder;

    var innerDetails = {
        "foldername": innerFolderDetails.foldername,
        "ismainFolder": innerFolderDetails.ismainFolder,
        "parentfolderId": innerFolderDetails.parentfolderId,
    }
   
    repository.find({ _id: innerFolderDetails._id }, 
             { innerFolder: { $elemMatch: { foldername: innerFolderDetails.foldername } }}, function (err, response) {
                 if (response[0].innerFolder.length > 0) {
                     res.status(500).send({ error: 'Repository Name Already Exists Please Try With Different Name !' });
                 }else{
                     repository.findByIdAndUpdate({ _id: innerFolderDetails._id },
                             { $push: { innerFolder: innerDetails }},
                                 function (err, innerDetails) {
                                     res.json(innerFolderDetails);
                                 })       
                        }
             });

};


/*adding the tag*/
exports.addTagForSearch = function (req, res, next) {
    var tagDetails = req.body.tagDetails;
    var tagDetails2 = req.body.tagDetails.tagname;
    var names = []
    tagDetails2.forEach(function (entry) {
        names.push(entry.text);
    });
    repository.update(
    { _id: tagDetails._id, 'innerFiles._id': tagDetails.popUpId },
    { $set: { 'innerFiles.$.tagName': names } }, { new: true },
    function (err, tagDetails) {
        if (err) return console.log(err);
        res.json("success");
    });
}

/*Deleting the tag*/
exports.removeTagForSearch = function (req, res, next) {
    var tagDetails = req.body.removeTagDetails;
    repository.update(
       { _id: tagDetails._id, 'innerFiles._id': tagDetails.popUpId },
       { $pull: { 'innerFiles.$.tagName': tagDetails.tagname.text } }, { new: true },
       function (err, tagDetails) {
           if (err) return console.log(err);
           res.json("success");
       });
};