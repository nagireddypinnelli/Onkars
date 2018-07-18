'use strict';

var mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
 // GoogleStrategy = require('passport-google').Strategy,
  User = mongoose.model('User'),
  request = require('request');


/*passport.serializeUser(function (user, done) {
    done(null, user);
});
*/

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// Serialize the user id to push into the session
passport.serializeUser(function (user, done) {
   done(null, user.id);
});

// Deserialize the user object based on a pre-serialized token
// which is the user id
// passport.deserializeUser(function (id, done) {
//    User.findOne({
//        _id: id
//    }, '-salt -hashed_password', function (err, user) {
//        done(err, user);
//    });
// });

// Use local strategy using API
/*
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
	function (username, password, done) {
	    var formData = [{
	        "userId": username,
	        "password": password,
	        "deviceId": "45878testdevice",
	        "deviceType": 1,
	        "osVersion": "latest",
	        "appVersion": "new version 10"
	    }];
	    console.log('inside REST strategy');

	    request({
	        url: 'http://10.30.254.131:8080/HappinessApp/rest/home/loginAuth',  
	        qs: { from: 'fab portal', time: +new Date() },  
	        method: 'POST',
	        json: formData,
	        headers: {  
	            'Content-Type': 'application/json'
	        }
	    },

            function (err, httpResponse, body) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                else {
                    if (body.loginStatus == true) {
                        var user = {
                            "_id": "55127502966c6e8019c27726",
                            "name": body.firstName + ' ' + body.lastName,
                            "email": body.mail,
                            "username": username,
                            "provider": "local",
                            "role": "Viewer",
                            "__v": 0
                        };
                        return done(null, user);
                    }
                    else {
                        return done(null, false, {
                            message: 'Unknown user'
                        });
                    }
                    
                }

            });

	}
));
*/

// Use local strategy
 
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
	function (username, password, done) {
	    User.findOne({
	        username: username
	    }, function (err, user) {
	        if (err) {
	            return done(err);
	        }
	        if (!user) {
	            return done(null, false, {
	                message: 'Unknown user'
	            });
	        }
	        if (!user.authenticate(password)) {
	            return done(null, false, {
	                message: 'Invalid password'
	            });
	        }
	        return done(null, user);
	    });
	}
));



 


// Use google strategy
/*
passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/auth/google/return',
    realm: 'http://localhost:3000/'
},

function (identifier, profile, done) {
    process.nextTick(function () {
        profile.identifier = identifier;
        return done(null, profile);
    });
}
));*/

module.exports = passport;
