"use strict";
var mongoose = require('mongoose');
var Group = require('../models/group.js');

exports.get = function (req, res, next) {
    Group.find({ isDelete: { $ne: true } }, function (err, label) {
        if (err) return next(err);
        res.json(label);
        next();
    });
};


exports.getById = function (req, res, next) {
    Group.findById(req.params.id)
        .exec(function (err, response) {
            if (err) return next(err);
            res.json(response);
        });
};

exports.update = function (req, res, next) {
    var group = req.body.group;
    Group.findByIdAndUpdate(group._id, {
        $set: {
            "name": group.name,
        }
    }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};

exports.delete = function (req, res, next) {
    Group.findByIdAndUpdate(req.params.id, {
        $set: {
            "isDelete": true,
        }
    }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};

exports.create = function (req, res, next) {
    var group = { name: req.body.group };
    Group.find({ name: req.body.group }, function (err, response) {
        if (response.length > 0) {
            return res.json("Group already exist");
        }
        else {
            Group.create(group, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        }
    })
};

exports.addUsers = function (req, res, next) {
    var users = req.body.users.users;
    var groupId = req.body.users.groupId;
        Group.findByIdAndUpdate(groupId, {
            $addToSet: {
                users: users
            }
        }, function (err, post) {
            if (err) return next(err);
            res.json('Success');
        });   
}
