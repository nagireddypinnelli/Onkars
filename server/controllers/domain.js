"use strict";
var mongoose = require('mongoose');
var Domain = require('../models/domain.js');

exports.get = function (req, res, next) {
    Domain.find({ isDelete: { $ne: true } })
        .sort('name')
        .exec(function (err, domain) {
        if (err) return next(err);
        res.json(domain);
        next();
    });
};

exports.getById = function (req, res, next) {
    Domain.findById(req.params.id)
        .exec(function (err, response) {
            if (err) return next(err);
            res.json(response);
        });
};

exports.delete = function (req, res, next) {
    Domain.findByIdAndUpdate(req.params.id, {
        $set: {
            "isDelete": true,
        }
    }, function (err, post) {
        if (err) return next(err);
        res.json("success");
    });
};

exports.update = function (req, res, next) {
    var domain = req.body.domain;
    Domain.findByIdAndUpdate(domain._id, {
        $set: {
            "name": domain.name,
            "description": domain.description
        }
    }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};

exports.create = function (req, res, next) {
    var domain = req.body.domain;
    Domain.create(domain, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};

exports.checkExistsDomain = function (req, res, next) {
    var domain = req.body.domain;
    var ObjectId = mongoose.Types.ObjectId;
    if (domain._id != null) {
        Domain.find({ isDelete: { $ne: true }, name: new RegExp(["^", domain.name, "$"].join(""), "i"), _id: { $ne: ObjectId(domain._id) } })
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
        Domain.find({ isDelete: { $ne: true }, name: new RegExp(["^", domain.name, "$"].join(""), "i") })
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
