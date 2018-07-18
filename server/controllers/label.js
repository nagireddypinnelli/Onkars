"use strict";
var mongoose = require('mongoose');
var Label = require('../models/label.js');

exports.get = function (req, res, next) {
    Label.find({ isDelete: { $ne: true } })
        .sort('name')
        .exec(function (err, label) {
        if (err) return next(err);
        res.json(label);
        next();
    });
};


exports.getById = function (req, res, next) {
    Label.findById(req.params.id)
        .exec(function (err, response) {
            if (err) return next(err);
            res.json(response);
        });
};

exports.update = function (req, res, next) {

    console.log(req.body.label)
    var label = req.body.label;
    Label.findByIdAndUpdate(label._id, {
        $set: {
            "name": label.name,
            "description": label.description
        }
    }, function (err, post) {
        if (err) return next(err);
        res.json("success");
    });
};

exports.delete = function (req, res, next) {
    Label.findByIdAndUpdate(req.params.id, {
        $set: {
            "isDelete": true,
        }
    }, function (err, post) {
        if (err) return next(err);
        res.json("success");
    });
};

exports.create = function (req, res, next) {
    var label =  req.body.label ;
    Label.find({ name: label.name }, function (err, response) {
        if (response.length > 0) {
            return res.json("Label already exist");
        }
        else {
            Label.create(label, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        }
    })
};


exports.checkExistsLabel = function (req, res, next) {
    var label = req.body.label;
    var ObjectId = mongoose.Types.ObjectId;
    if (label._id != null) {
        Label.find({ isDelete: { $ne: true }, name: new RegExp(["^", label.name, "$"].join(""), "i") , _id: { $ne: ObjectId(label._id) } })
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
        Label.find({ isDelete: { $ne: true }, name: new RegExp(["^", label.name, "$"].join(""), "i") })
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
};
