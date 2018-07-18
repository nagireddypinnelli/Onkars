"use strict";
var mongoose = require('mongoose');
var Vertical = require('../models/vertical.js');

exports.get = function (req, res, next) {
    Vertical.find({ isDelete: { $ne: true } })
        .sort('name')
        .exec(function (err, vertical) {
        if (err) return next(err);
        res.json(vertical);
        next();
    });
};

exports.getById = function (req, res, next) {
    Vertical.findById(req.params.id)
        .exec(function (err, response) {
            if (err) return next(err);
            res.json(response);
        });
};

exports.update = function (req, res, next) {
    var vertical = req.body.vertical;
    Vertical.findByIdAndUpdate(vertical._id, {
        $set: {
            "name": vertical.name,
            "description": vertical.description
        }
    }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};

exports.delete = function (req, res, next) {
    Vertical.findByIdAndUpdate(req.params.id, {
        $set: {
            "isDelete": true,
        }
    }, function (err, post) {
        if (err) return next(err);
        res.json("success");
    });
};

exports.create = function (req, res, next) {
    var vertical = req.body.vertical;
    Vertical.create(vertical, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};

exports.checkExistsVertical = function (req, res, next) {
    var vertical = req.body.vertical;
    console.log(vertical)

    var ObjectId = mongoose.Types.ObjectId;
    if (vertical._id != null) {
        Vertical.find({ isDelete: { $ne: true }, name: new RegExp(["^", vertical.name, "$"].join(""), "i") , _id: { $ne: ObjectId(vertical._id) } })
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
        Vertical.find({ isDelete: { $ne: true }, name: new RegExp(["^", vertical.name, "$"].join(""), "i") })
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
