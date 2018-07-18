var Promise = require('bluebird');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var UserSessions = require('../models/activeSessions.js');
var User = require('../models/user.js');
var _ = require('underscore-node'); 

exports.GetAllUserWithStatusJson = function (columns, criteria) {
    return new Promise(function (resolve, reject) {
        return _getAllUsersData(columns, criteria).then(function (res) {
            resolve(_bindUserSectionStatus(JSON.parse(JSON.stringify(res))));
        })
    });
}


exports.GetAllUserPhoto = function () {
    return new Promise(function (resolve, reject) {
        User.find().select('_id name username photo')
            .exec(function (err, users) {
                if (err) reject(err);
                resolve(users);
            })
    });
}


exports.GetAllUsers = function (columns) {
    return new Promise(function (resolve, reject) {
        User.find().select(columns)
            .exec(function (err, users) {
                if (err) reject(err);
                resolve(users);
            })
    });
}

exports.GetUser = function (condition, columns) {
    return new Promise(function (resolve, reject) {
        User.findOne(condition).select(columns)
            .exec(function (err, user) {
                if (err) reject(err);
                resolve(user);
            })
    });
}


exports.CreateUserSession = function (userId, device) {

    return new Promise(function (resolve, reject) {
        var userSession = new UserSessions({
            userId: userId,
            loggedInTime: new Date(),
            loggedOutTime: null,
            lastActiveTime: new Date(),
            status: 1,
            device: device
        });
        var expires = new Date();
        expires.setMinutes(expires.getMinutes() + global.sessionTimeout);
        var token = jwt.encode({
            iss: userSession._id,
            exp: expires
        }, global.jwtToken);
        userSession.token = token;
        userSession.publicToken = token.substring(token.indexOf('.') + 1, token.length);
        userSession.save(function (err, session) {
            if (err) return reject(err);
            resolve(session);
        });
    });
}



exports.CloseAllActiveSessions = function (userId, device) {
    return new Promise(function (resolve, reject) {
        UserSessions.update({ userId: userId, status: 1, device: device }, {
            status: -1,
            loggedOutTime: new Date()
        }, function (err, count) {
            if (err) return reject(err);
            resolve(count);
        });
    });
}

exports.CloseUserSessionByPublicToken = function (token) {
    return new Promise(function (resolve, reject) {
        UserSessions.findOne({ publicToken: token }, function (err, session) {
            if (err || session === null) return reject(err);
            session.status = 0;
            session.loggedOutTime = new Date();
            resolve(session.save());
        });
    });
}


exports.GetUserSessionById = function (id) {
    return new Promise(function (resolve, reject) {
        UserSessions.findById(id, function (err, doc) {
            if (err) reject(err);
            resolve(doc);
        })
    });
}

exports.GetUserSessionByPublicToken = function (token) {
    return new Promise(function (resolve, reject) {
        UserSessions.findOne({ publicToken: token }, function (err, doc) {
            if (err) reject(err);
            resolve(doc);
        })
    });
}


exports.UpdateLastActiveTime = function (id) {
    return new Promise(function (resolve, reject) {
        UserSessions.findById(id, function (err, data) {
            if (err || data == null) reject(err);
            data.lastActiveTime = new Date();
            resolve(data.save());
        })
    });
}

exports.UpdateToken = function (id) {
    return new Promise(function (resolve, reject) {
        UserSessions.findById(id, function (err, data) {
            if (err || data == null) reject(err);
            var expires = new Date();
            expires.setMinutes(expires.getMinutes() + global.sessionTimeout);
            var token = jwt.encode({
                iss: data._id,
                exp: expires
            }, global.jwtToken);
            data.token = token;
            data.lastActiveTime = new Date();
            resolve(data.save(function (err, newData) {
                return newData;
            }));
        })
    });

}


/**************************** local functions ***********************/

function _getAllUsersData(columns, criteria) {
    return new Promise(function (resolve, reject) {
        User.find(criteria).select(columns)
            .exec(function (err, users) {
                if (err) reject(err);
                resolve(users);
            });
    });
}

function _bindUserSectionStatus(userList) {
    return new Promise(function (resolve, reject) {
        if (userList !== undefined && userList !== null && userList.length > 0) {
            var uIds = _.pluck(userList, '_id');
            UserSessions.find().where('userId').in(uIds).sort({ loggedInTime: -1 }).find(function (err, sessions) {
                if (err) reject(err);
                for (x in userList) {
                    userList[x].status = 'inActive';
                    if (sessions !== null && sessions.length > 0) {
                        var d = _.findWhere(sessions, { userId: userList[x]._id });
                        if (d !== undefined && d.loggedOutTime == null) {
                            userList[x].status = 'active';
                        }
                    }
                }
                resolve(userList);

            });
        } else {
            resolve(userList);
        }

    });
}


