"use strict";
var mongoose = require('mongoose');
var Phase = require('../models/phase.js');

exports.get = function (req, res, next) {
    Phase.find({ isDelete: { $ne: true } }, function (err, phase) {
        if (err) return next(err);
        res.json(phase);
        next();
    });
};

exports.getById = function (req, res, next) {
    Phase.findById(req.params.id)
        .exec(function (err, response) {
            if (err) return next(err);
            res.json(response);
        });
};

exports.update = function (req, res, next) {
    var phase = req.body.phase;
    Phase.findByIdAndUpdate(phase._id, {
        $set: {
            "name": phase.name,
        }
    }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};


exports.delete = function (req, res, next) {
    Phase.findByIdAndUpdate(req.params.id, {
        $set: {
            "isDelete": true,
        }
    }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};

exports.create = function (req, res, next) {
    var phase = req.body.phase;
    Phase.create(phase, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};

exports.checkExistsPhase = function (req, res, next) {
    var phase = req.body.phase;
    var ObjectId = mongoose.Types.ObjectId;
    if (phase._id != null) {
        Phase.find({ isDelete: { $ne: true },  name: new RegExp(["^", phase.name, "$"].join(""), "i"), _id: { $ne: ObjectId(phase._id) } })
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
        Phase.find({ isDelete: { $ne: true }, name: new RegExp(["^", phase.name, "$"].join(""), "i") })
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