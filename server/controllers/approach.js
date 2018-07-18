"use strict";
var mongoose = require('mongoose');
var Approach = require('../models/approach.js');

exports.get = function (req, res, next) {
    Approach.find({ isDelete: { $ne: true } }).
        sort('name').
        exec(function (err, approach) {
        if (err) return next(err);
        res.json(approach);
        next();
    });
};


exports.getById = function (req, res, next) {
    Approach.findById(req.params.id)
        .exec(function (err, response) {
            if (err) return next(err);
            res.json(response);
        });
};

exports.update = function (req, res, next) {
    var approach = req.body.approach;
    Approach.findByIdAndUpdate(approach._id, {
        $set: {
            "name": approach.name,
            "description": approach.description
        }
    }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};


exports.delete = function (req, res, next) {
    console.log(req.params.id);
    Approach.findByIdAndUpdate(req.params.id, {
        $set: {
            "isDelete": true,
        }
    }, function (err, post) {
        if (err) return next(err);
        res.json("success");
    });
};

exports.create = function (req, res, next) {
    var approach = req.body.approach;
    Approach.create(approach, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};


exports.checkExistsApproach = function (req, res, next) {
    var approach = req.body.approach;
    var ObjectId = mongoose.Types.ObjectId;
    if (approach._id != null) {
        Approach.find({ isDelete: { $ne: true }, name: new RegExp(["^", approach.name, "$"].join(""), "i"), _id: { $ne: ObjectId(approach._id) } })
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
        Approach.find({ isDelete: { $ne: true }, name: new RegExp(["^", approach.name, "$"].join(""), "i")})
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

