"use strict";
var mongoose = require('mongoose');
var Status = require('../models/status.js');

exports.get = function (req, res, next) {
    Status.find({ isDelete: { $ne: true } }, function (err, status) {
        if (err) return next(err);
        res.json(status);
        next();
    });
};

exports.getById = function (req, res, next) {
    Status.findById(req.params.id)
        .exec(function (err, response) {
            if (err) return next(err);
            res.json(response);
        });
};

exports.update = function (req, res, next) {
    var status = req.body.status;
    Status.findByIdAndUpdate(status._id, {
        $set: {
            "name": status.name,
            "description": status.description
        }
    }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};


exports.checkExistsStatus = function (req, res, next) {
    var status = req.body.status;
    var ObjectId = mongoose.Types.ObjectId;
    if (status._id != null) {
        Status.find({ isDelete: { $ne: true },   name: new RegExp(["^", status.name, "$"].join(""), "i"), _id: { $ne: ObjectId(status._id) } })
        .exec(function (err, response) {
            if (err) return next(err);
            if (response.length > 0) {
                res.json(true);
            }
            else {
                res.json(false);
            }
        });
    }
    else {
        Status.find({ isDelete: { $ne: true }, name: new RegExp(["^", status.name, "$"].join(""), "i")  })
            .exec(function (err, response) {
                if (err) return next(err);
                if (response.length > 0) {
                    res.json(true);
                }
                else {
                    res.json(false);
                }
            });
    }

},




exports.delete = function (req, res, next) {
    Status.findByIdAndUpdate(req.params.id, {
        $set: {
            "isDelete": true,
        }
    }, function (err, post) {

        console.log(err);
        if (err) return next(err);
        res.json("success");
    });
};

exports.create = function (req, res, next) {
    var status = req.body.status;
    Status.create(status, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};