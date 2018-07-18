"use strict";
var mongoose = require('mongoose');
var crypto = require('crypto');
var User = require('../models/user.js');
var passport = require('../controllers/passport.js');

var ReportProblem = require('../models/reportProblem.js');
var passport = require('../controllers/passport.js');
var userSession = require('../core/userSession.js');

var mongoose = require('mongoose');
var crypto = require('crypto');
var User = require('../models/user.js');
var passport = require('../controllers/passport.js');


var passport = require('../controllers/passport.js');
var userSession = require('../core/userSession.js');
//var Mailer = require('../core/email.js');

exports.signout = function (req, res) {
    req.logout();
    res.redirect('/');
};

exports.getUsersByOrganization = function (req, res) {

};


exports.create = function (req, res, next) {
    var user = new User(req.body.user);
    user.provider = 'local';

    // because we set our user.provider to local our models/user.js validation will always be true
    //req.assert('name', 'You must enter a name').notEmpty();
    //req.assert('email', 'You must enter a valid email address').isEmail();
    //req.assert('password', 'Password must be between 8-20 characters long').len(8, 20);
    //req.assert('username', 'Username cannot be more than 20 characters').len(1, 20);
    //req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

    //var errors = req.validationErrors();
    //if (errors) {
    //    return res.status(400).send(errors);
    //}

    user.save(function (err) {
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    res.status(400).json([{
                        msg: 'Username already taken',
                        param: 'username'
                    }]);
                    break;
                default:
                    var modelErrors = [];
                    if (err.errors) {
                        for (var x in err.errors) {
                            modelErrors.push({
                                param: x,
                                msg: err.errors[x].message,
                                value: err.errors[x].value
                            });
                        }
                        res.status(400).json(modelErrors);
                    }
            }
            return res.status(400);
        }


        //var message = {
        //    to: '',
        //    subject: '',
        //    text: '',
        //    html: '',
        //    attachments: []
        //};// Message objects

        //message.to = user.email.toString();
        //message.subject = 'One user has ceated';
        //message.text = 'One user has ceated';
        //message.html = 'One user has ceated';
        //Mailer.sendLink(message);

        return res.status(200).json("success");
    });
};

exports.update = function (req, res, next) {
    User.findByIdAndUpdate(req.body.user._id, {
        $set: {
            "name": req.body.user.name,
            "username": req.body.user.username,
            "role": req.body.user.role,
            "email": req.body.user.email,
            "account": req.body.user.account,
            "contactInfo": req.body.user.contactInfo,
        }
    }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};

exports.delete = function (req, res, next) {
    User.findByIdAndUpdate(req.params.id, {
        $set: {
            "isDelete": true,
        }
    }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};


exports.unblockUser = function (req, res, next) {
    User.findByIdAndUpdate(req.params.id, {
        $set: {
            "isDelete": false,
        }
    }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};


exports.getById = function (req, res, next) {
    User.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};

exports.getUserDetailsById = function (req, res, next) {
    if (!req.params.id == null) {
        User.findById(req.params.id)
        .populate({ path: 'account', model: 'account', populate: [{ path: 'vertical', model: 'vertical' }, { path: 'domain', model: 'domain' }] })
        //.populate('account')
        .exec(function (err, response) {
            if (err) return next(err);
            res.json(response);
        });
    }
    
}

exports.updateUsersRole = function (req, res, next) {
    var users = req.body.users.users;
    var roleId = req.body.users.roleId;
    for (var i = 0; i < users.length; i++) {
        User.findByIdAndUpdate(users[i], {
            $set: {
                "role": roleId,
            }
        }, function (err, post) {
            if (err) return next(err);
        });
    }
    res.json("success");
}


exports.blockUsers = function (req, res, next) {
    var users = req.body.users.users;
    for (var i = 0; i < users.length; i++) {
        User.findByIdAndUpdate(users[i], {
            $set: {
                "isDelete": true,
            }
        }, function (err, post) {
            if (err) return next(err);
        });
    }

    res.json("success");
}

exports.unblockUsers = function (req, res, next) {
    var users = req.body.users.users;
    for (var i = 0; i < users.length; i++) {
        User.findByIdAndUpdate(users[i], {
            $set: {
                "isDelete": false,
            }
        }, function (err, post) {
            if (err) return next(err);
        });
    }
    res.json("success");
}

exports.get = function (req, res, next) {


};

exports.removeOrgAccountProjectUser = function (req, res, next) {


};

exports.removeUserOrgStructure = function (req, res, next) {


};



//exports.delete = function (req, res, next) {
//    Component.findByIdAndRemove(req.params.id, req.body, function (err, post) {
//        if (err) return next(err);
//        res.json(post);
//    });
//};

function createJWTUserSession(userId, device) {

    console.log("userId, device", userId)
    console.log("device", device)

    return new Promise(function (resolve, reject) {
        userSession.CloseAllActiveSessions(userId, device).then(function (count) {
            userSession.CreateUserSession(userId, device).then(function (session) {
                session = JSON.parse(JSON.stringify(session));
                session.token = session.publicToken;
                delete session.publicToken;
                resolve({
                    token: session.token,
                    loggedInTime: session.loggedInTime
                });
            });
        });

    });
};

exports.createSession = function (req, res, next) {
    var userId = req.user._id;
    var device = req.body.device
    createJWTUserSession(userId, device).then(function (session) {
        res.send({
            user: req.user,
            userSession: session,
            redirect: (req.user) ? req.get('referer') : false
        });
    })
};

exports.getInnovationchampions = function(req,res ,next)
{
    var ObjectId = mongoose.Types.ObjectId;
    User.find({ isDelete: { $ne: true }, role: ObjectId("582c08b2b1faa0e93c91f69e") })
  .exec(function (err, users) {
      if (err) return next(err);
      res.json(users);
  });
}

exports.authenticate = function (req, res, next) {
    return passport.authenticate('local');
};

exports.authenticateGoogle = function (req, res, next) {
    return passport.authenticate('google');
};

exports.loggedIn = function (req, res, next) {

};



function in_array(item, itemArray) {
    var found = 0;
    for (var i = 0, len = itemArray.length; i < len; i++) {
        if (itemArray[i]["_id"] == item) return itemArray[i]["name"];
        found++;
    }
    return -1;
}


exports.getUserDetails = function (req, res, next) {

};



function itemInArray(item, arr) {
    var returnVal = 0;
    if (arr == undefined || arr.length == 0) return returnVal;
    for (var m = 0; m < arr.length; m++) {
        if (item == arr[m]) returnVal = 1;
        if (m == arr.length - 1) {

            return returnVal;
        }
    }

}

function getUser(item, arr) {
    var returnVal = "";
    if (arr && arr.length > 0) {
        for (var m = 0; m < arr.length; m++) {
            if (item == arr[m]._id) returnVal = arr[m].name;
            if (m == arr.length - 1) {

                return returnVal;
            }
        }
    }
    else return returnVal;
}

exports.getEmployedBy = function (req, res, next) {

};

exports.getUserRoles = function (req, res, next) {

};



exports.changepassword = function (req, res, next) {
    User.findById(req.body.userId, function (err, userObj) {
        var prevSalt = new Buffer(userObj.salt, 'base64');
        var oldPassword = crypto.pbkdf2Sync(req.body.passwords.oldPassword, prevSalt, 10000, 64).toString('base64');
        if (oldPassword === userObj.hashed_password) {
            var user = new User();
            user.password = req.body.passwords.newPassword;
            User.findByIdAndUpdate(req.body.userId, {
                $set: {
                    "hashed_password": user.hashed_password,
                    "salt": user.salt
                }
            }, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        } else {
            res.json({
                "error": 'Password mismatch'
            });
        }
    });
};

exports.getUserList = function (req, res, next) {
    //var condition = { isDelete: { $ne: true } };
    User.find({ isDelete: { $ne: true } }).
    populate([{ path: 'role', select: 'name' },
              { path: 'account', select: 'name' }])
    .exec(function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
};

exports.blockedUsers = function (req, res, next) {
    User.find({ isDelete: true }).
    populate([{ path: 'role', select: 'name' },
              { path: 'account', select: 'name' }])
    .exec(function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
}
exports.checkOrgNameUnique = function (req, res, next) {

};


exports.getUserRole = function (req, res, next) {
    User.findById(req.params.uId)
            .populate([{ path: 'role', select: 'name' }])
            .exec(function (err, response) {
                if (err) return next(err);
                res.json(response);
            });
};

exports.getblockedUsersCount = function (req, res, next) {
    User.find({ isDelete: true }).
      count()
      .exec(function (err, count) {
          if (err) return next(err);
          res.json(count);
      });
};

exports.checkExistingEmailId = function (req, res, next) {
    var user = req.body.user;
    var ObjectId = mongoose.Types.ObjectId;
    if (user._id != null) {
        User.find({ isDelete: { $ne: true }, email: new RegExp(["^", user.email, "$"].join(""), "i"), _id: { $ne: ObjectId(user._id) } })
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
        User.find({ isDelete: { $ne: true }, email: new RegExp(["^", user.email, "$"].join(""), "i") })
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
