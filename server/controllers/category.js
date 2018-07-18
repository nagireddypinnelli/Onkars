"use strict";
var mongoose = require('mongoose');
var Category = require('../models/category.js');

exports.get = function (req, res, next) {
    Category.find({ isDelete: { $ne: true } })
        .sort('name')
        .exec(function (err, categories) {
        if (err) return next(err);
        res.json(categories);
        next();
    });
};

exports.getById = function (req, res, next) {
    Category.findById(req.params.id)
        .exec(function (err, response) {
            if (err) return next(err);
            res.json(response);
        });
};

exports.update = function (req, res, next) {
    var category = req.body.category;
    Category.findByIdAndUpdate(category._id, {
        $set: {
            "name": category.name,
        }
    }, function (err, post) {
        console.log(err);
        if (err) return next(err);
        res.json(post);
    });
};

exports.delete = function (req, res, next) {
    Category.findByIdAndUpdate(req.params.id, {
        $set: {
            "isDelete": true,
        }
    }, function (err, post) {
        if (err) return next(err);
        res.json("success");
    });
};

exports.create = function (req, res, next) {
    var category = req.body.category;
    Category.create(category, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};

exports.checkExistsCategory = function (req, res, next) {
    var category = req.body.category;


    console.log(category);
    var ObjectId = mongoose.Types.ObjectId;
    if (category._id != null) {
        Category.find({ isDelete: { $ne: true },  name: new RegExp(["^", category.name, "$"].join(""), "i") , _id: { $ne: ObjectId(category._id) } })
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
        Category.find({ isDelete: { $ne: true },name: new RegExp(["^", category.name, "$"].join(""), "i") })
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
