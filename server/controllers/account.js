"use strict";
var mongoose = require('mongoose');
var Account = require('../models/account.js');

exports.get = function (req, res, next) {    
    Account.find({ isDelete: { $ne: true } }).sort('name')
            .populate([{ path: 'domain', select: 'name' }])
            .populate([{ path: 'vertical', select: 'name' }])
            .exec(function (err, response) {                
                 if (err) return next(err);
				res.json(response);
            });	
};

exports.create = function (req, res, next) {
    Account.create(req.body.account, function (err, account) {
        if (err) return next(err);
        res.json(account);
    });
};

exports.getById = function (req, res, next) {
    Account.findById(req.params.id)
            .populate([{ path: 'domain', select: 'name' }])
            .populate([{ path: 'vertical', select: 'name' }])
            .exec(function (err, response) {
                if (err) return next(err);
                res.json(response);
            });
};


exports.delete = function (req, res, next) {
    Account.findByIdAndUpdate(req.params.id, {
        $set: {
            "isDelete": true,
        }
    }, function (err, post) {
        if (err) return next(err);
        res.json("success");
    });
};

exports.update = function (req, res, next) {
    var account = req.body.account;
    Account.findByIdAndUpdate(account._id, {
        $set: {
            "name": account.name,
            "domain": account.domain,
            "description": account.description,
            "vertical": account.vertical,
            "accountType": account.accountType,
            "customerEngagement": account.customerEngagement,
            "customerInnovationAdaption": account.customerInnovationAdaption,
            "weightedPipeline": account.weightedPipeline
        }
    }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};

exports.checkExistsAccount = function (req, res, next) {
    var account = req.body.account;
    var ObjectId = mongoose.Types.ObjectId;
    if (account._id != null) {
        Account.find({ isDelete: { $ne: true }, name: new RegExp(["^", account.name, "$"].join(""), "i"), _id: { $ne: ObjectId(account._id) } })
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
        Account.find({ isDelete: { $ne: true }, name: new RegExp(["^", account.name, "$"].join(""), "i")})
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


