"use strict";
var mongoose = require('mongoose');
var Role = require('../models/role.js');

exports.get = function (req, res, next) {
    Role.find({ isDelete: { $ne: true } }, function (err, role) {
        if (err) return next(err);
        res.json(role);
        next();
    });
};

exports.getById = function (req, res, next) {
    Role.findById(req.params.id)
        .exec(function (err, response) {
            if (err) return next(err);
            res.json(response);
        });
};

exports.update = function (req, res, next) {
    var role = req.body.role;
    Role.findByIdAndUpdate(role._id, {
        $set: {
            "name": role.name,
            "description": role.description
        }
    }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};


exports.delete = function (req, res, next) {
    Role.findByIdAndUpdate(req.params.id, {
        $set: {
            "isDelete": true,
        }
    }, function (err, post) {
        if (err) return next(err);
        res.json("success");
    });
};

exports.create = function (req, res, next) {
    var role = req.body.role;
    Role.create(role, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};


exports.checkExistsRole = function (req, res, next) {
    var role = req.body.role;
    var ObjectId = mongoose.Types.ObjectId;
    if (role._id != null) {
        Role.find({ isDelete: { $ne: true }, name: new RegExp(["^", role.name, "$"].join(""), "i") , _id: { $ne: ObjectId(role._id) } })
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
        Role.find({ isDelete: { $ne: true }, name: new RegExp(["^", role.name, "$"].join(""), "i") })
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
