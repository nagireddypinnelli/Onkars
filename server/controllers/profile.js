"use strict";
var mongoose = require('mongoose');
var crypto = require('crypto');
var Profile = require('../models/profile.js');
var passport = require('../controllers/profile.js');
var User = require('../models/user.js');


exports.update = function (req, res, next) {
   User.findByIdAndUpdate(req.body.user._id,  {
        $set: {
            "account": req.body.user.account,
            "contactInfo": req.body.user.contactInfo,
            "skills": req.body.user.skills,
            "designations": req.body.user.designations,
            "gender": req.body.user.gender,
        }
    },{ upsert: true, new: true }, function (err, post) {
        if (err) return next(err);
        return res.status(200).json("success");
    });
};


exports.addFiles = function (req, res, next) {
    var fileDetails = req.body.fileDetails;
    User.findByIdAndUpdate(fileDetails._id, {
        $set: {
            "filename": fileDetails.filename,
            "filelocation": fileDetails.filelocation
        }
    },{ upsert: true, new: true }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
}

exports.getProfileList = function (req, res, next) {
    Profile.findById(req.params.id).exec(function (e, results) {
        if (e) return next(e);
        res.send(results)
    });
};

