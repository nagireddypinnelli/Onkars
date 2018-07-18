var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var passport = require('passport');
var mongoose = require('mongoose');
//var wsfedsaml2 = require('./lib/passport-wsfed-saml2/index').Strategy;
var User = require('../server/models/user.js');

//var jwtauth = require('./jwtauth.js');
//var https = require('https');
//var fs = require('fs');

var port = process.env.PORT || 5000;
console.log(port);

var app = express();

global.sessionTimeout = 20;
global.jwtToken = String(mongoose.Types.ObjectId());
global.sourceKey = '578344BD313E75640C6B4E31';
app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-access-token");

    res.header("Access-Control-Allow-Methods", "DELETE, GET, HEAD, POST, PUT, OPTIONS, TRACE");
    //res.header("Access-Control-Expose-Headers", "x-access-token");
    //jwtauth(req, res, next);

    next();
});
var path = require('path');
app.use(express.static(path.join(__dirname, '../uploads')));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(expressValidator());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('www'));
app.use(express.static('vendor'));
app.use(express.static('www/app/components/navbar'));
app.use(express.static('www/app/components/treeview'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, function (err) {
    console.log('Running server on port ' + port);
});

// SSL configuration
//var options = {
//    key: fs.readFileSync('ssl/id3_key.pem'),
//    cert: fs.readFileSync('ssl/id3_cert.crt')
//};

//https.createServer(options, app).listen(port, function (err) {
//    console.log('Running server on port ' + port);
//});


//app.get('/adfslogiin',
//	passport.authenticate('wsfed-saml2', { failureRedirect: '/', failureFlash: true }),
//	function (req, res) {
//	    res.render('callback', { user: req.user });

//	}
//);

//app.post('/',
//	passport.authenticate('wsfed-saml2', { failureRedirect: '/', failureFlash: true }),
//	function (req, res) {
//	    // res.render('callback', { user: req.user });
//	    res.render('callback', { user: req.user });
//	}
//);
var dependencies = require('./dependencies')(app);
var repository = require('./repository')(app);


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/ID3Db', function (err) {
mongoose.connect('mongodb://127.0.0.1:27017/ID3Db', function (err) {
    if (err) {
      console.log('------------------');
        console.log('connection error', err);
        console.log('------------------');
    } else {
        console.log('connection successful');
    }
});

//passport.use(new wsfedsaml2(
//	{
//	    //path: '/login/callback',
//	    callbackUrl: '/login/callback',
//	    realm: 'https://id3.ust-global.com/',
//	    homeRealm: '', // specify an identity provider to avoid showing the idp selector
//	    // identityProviderUrl: 'https://fs.ust-global.com/adfs/ls/',
//	    identityProviderUrl: 'https://idp.ust-global.com/adfs/ls/',
//	    authnContext: 'http://schemas.microsoft.com/ws/2008/06/identity/authenticationmethod/windows',
//	    identifierFormat: null,
//	    protocol: 'samlp',
//	    // setup either a certificate base64 encoded (cer) or just the thumbprint of the certificate if public key is embedded in the signature
//	    // cert: 'MIIEtTCCA52gAwIBAgIKZz7CsQAAAAAAlzANBgkqhkiG9w0BAQsFADBAMRMwEQYKCZImiZPyLGQBGRYDY29tMRQwEgYKCZImiZPyLGQBGRYEdXN0cjETMBEGA1UEAxMKRVhUQ0EtQVBBQzAeFw0xNDEyMTkwOTM0MTlaFw0xNjEyMTgwOTM0MTlaMG0xCzAJBgNVBAYTAklOMQ8wDQYDVQQIEwZLZXJhbGExEzARBgNVBAcTClRyaXZhbmRydW0xEzARBgNVBAoTClVTVCBHbG9iYWwxCzAJBgNVBAsTAklTMRYwFAYDVQQDEw1Ub2tlbi1TaWduaW5nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo+o1H7HedNJBQEKvFDnTD0d2jl83gt/zeIEsj4fgd0msCVdpTUJnoZ9eapQyuXqirgPLPBocRemWucH2jzKck+HVyBdFjctl0vL3CQhywiB/Pruynsajwe+jeHiiHZyHrwTGokdzTo9yVmEtdqgCj214RNCc99YrtXA+OZ/3FUZtfJK0/wOwqRvkHl0TLwCEC4d2G5tO51AGOpY0WY92mMyJ2FwHc+Ge+qPLeaVHqCcz7BKWXTcCohjh3hX7C4YvMHRH77VTd/3CKyRzn+qkEkfMPkiOZ96zoB2Yo/8LCx6y2H+dfnNYB7/15UybLIF9045sMEDMzVbfSJspt8CbuwIDAQABo4IBgjCCAX4wCwYDVR0PBAQDAgWgMBMGA1UdJQQMMAoGCCsGAQUFBwMBMHgGCSqGSIb3DQEJDwRrMGkwDgYIKoZIhvcNAwICAgCAMA4GCCqGSIb3DQMEAgIAgDALBglghkgBZQMEASowCwYJYIZIAWUDBAEtMAsGCWCGSAFlAwQBAjALBglghkgBZQMEAQUwBwYFKw4DAgcwCgYIKoZIhvcNAwcwHQYDVR0OBBYEFHGhOe4gptxCiTKPQcrj4iZB/BGWMB8GA1UdIwQYMBaAFOLXA5TDhfyV5frCLAuDyBQ2UZUiMDgGA1UdHwQxMC8wLaAroCmGJ2h0dHA6Ly93d3cudXN0cmkuY29tL3BraS9FWFRDQS1BUEFDLmNybDBDBggrBgEFBQcBAQQ3MDUwMwYIKwYBBQUHMAKGJ2h0dHA6Ly93d3cudXN0cmkuY29tL3BraS9FWFRDQS1BUEFDLmNydDAhBgkrBgEEAYI3FAIEFB4SAFcAZQBiAFMAZQByAHYAZQByMA0GCSqGSIb3DQEBCwUAA4IBAQARFxOZiDVmP5TJQPXkiMZhUn/i5FgEu8LkBo+ue93B68sfNLLFqJpDBPA0VepQkbr9FLr16PmCGrhveY4RKd70mdlADjURvuJFnCNIopFLVLmKmyZnO45TFp+N2wE7yqVnvKri1X5H5OWlRCMI1fLV6TACGzWsaizcsOvldOTS5n0td8zbJ34BLprhs4vWlfQ4QH+IhgUyLEx8fHjS3ThjldWreNW0RYSTmV/2yASXN9My+zX26N8rRQBSFNcCqQ/poCmJMozxAa05TlmiiGMySb/655NGmneTHzShDOTUfnqza13owu2Mpp6y59EKtNPFEN1Et3EmxE7Itm67y8rv'
//	    cert: 'MIIElDCCA3ygAwIBAgIKTrb0GwABAAAA+jANBgkqhkiG9w0BAQsFADBAMRMwEQYKCZImiZPyLGQBGRYDY29tMRQwEgYKCZImiZPyLGQBGRYEdXN0cjETMBEGA1UEAxMKRVhUQ0EtQVBBQzAeFw0xNjAzMTUxNTUxNTFaFw0xOTAzMTUxNTUxNTFaMHkxCzAJBgNVBAYTAklOMQ8wDQYDVQQIEwZLZXJhbGExEzARBgNVBAcTClRyaXZhbmRydW0xDDAKBgNVBAoTA1VTVDELMAkGA1UECxMCSVMxKTAnBgNVBAMTIFRva2VuLXNpZ25pbmctaWRwLnVzdC1nbG9iYWwuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwikrSm67CxUJk4mNFR46rlSd8aAXelptMzPy4pHFO+iB9Jpba0wqhmbliKifgKPJ/Gxr5Yn1/5Y4fZCDLOTm0mx/ucI+QiAffDi8wk6I2orMrUkyQYCf7mWs4gP3iU1uQTKiPD9OR8ZEtgaLPOR4fc7bcRUHaqcCvcjVGgaIcu/EYR2rIen7GjXBucXT6CXhummuX0YftB4LPGY90QzZpCXXYdlM8HT4LhF3hmtLELbhwt2Nk/DxnD+JLPzMB6mPcRAew1O3Kn1Qekig/3Y6WVJgkU3/reci8TgK0lFeHxN57U3AROaZwEjGfz6/4F/2KaGb068Td+E4TcNpVNCJZwIDAQABo4IBVTCCAVEwOwYJKwYBBAGCNxUHBC4wLAYkKwYBBAGCNxUImcd3g5rQceGdD4OCiGWD2aVYZIGivxiBu4lKAgFkAgEMMAsGA1UdDwQEAwIFoDAdBgNVHSUEFjAUBggrBgEFBQcDAgYIKwYBBQUHAwEwJwYJKwYBBAGCNxUKBBowGDAKBggrBgEFBQcDAjAKBggrBgEFBQcDATAdBgNVHQ4EFgQUCxSzzKdfdL3glyRWd1adcGKC8rowHwYDVR0jBBgwFoAU4tcDlMOF/JXl+sIsC4PIFDZRlSIwOAYDVR0fBDEwLzAtoCugKYYnaHR0cDovL3d3dy51c3RyaS5jb20vcGtpL0VYVENBLUFQQUMuY3JsMEMGCCsGAQUFBwEBBDcwNTAzBggrBgEFBQcwAoYnaHR0cDovL3d3dy51c3RyaS5jb20vcGtpL0VYVENBLUFQQUMuY3J0MA0GCSqGSIb3DQEBCwUAA4IBAQAPl5IqJz+42HKlsNKkMeBSvWa7R4bP+1P+uYg7ymSpUZS0N2MLu3CuLt0qFCEZJdSX/JQndOgfsssGH0Loe5RuuY561WoGOoVU2wJcK9aFDLEeTz5lnOuO4nxJBj6QKrr10vw3dPPx+bFxfwd+5yS9lgRw9JawcEN7+kQ5Z4SGCfsVvKx+rIQvORXUPP9Xv5PcXfQsFhnTVHXVZtB4H/VTRt1mOSRkHCsGA0PhDq6GXT1xN2MI+7HfO1lG5EHbFRaKkbqrfiuCnd43Am5ru7oqIlYYrTWM9bVPliHNdqCVMmTo3Rq6EJkBjp4MxxjlKfJf3AIP7+1+JcvppICZ2Pk+'
//	    //thumbprints: ['a3cff17cbf7e793a97861390eb698d00e9598537']
//	},
//	function (profile, done) {
//	    console.log("----------------Inside Function--------------------");
//	    console.log(profile);
//	    if (!profile.email) {
//	        return done(new Error("No email found"), null);
//	    }
//	    profile.email = profile.email;
//	    // asynchronous verification, for effect...
//	    process.nextTick(function () {
//	        User.find({ "email": profile.email })
//           .populate([{ path: 'role', select: 'name' }])
//           .exec(function (err, dbUser) {
//               if (err) {
//                   console.log("Error----", err);
//                   return done(err);
//               }
//               console.log("Email", profile.email);
//               console.log("---------------dbUser-------------", dbUser);
//               if (!dbUser || dbUser.length === 0) {
//                   var username;
//                   var name;
//                   var emailaddress;
//                   var loggedInUser;
//                   //  username = profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
//                   emailaddress = profile.email;
//                   name = profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
//                   var users = { name: name, email: emailaddress, role: '582c0858b1faa0e93c91f69c', username: emailaddress };
//                   console.log(users);
//                   User.find({ "email": users.email }, function (err, user) {
//                       if (user.length == 0) {
//                           UserLog.find({ "email": users.email }, function (err, userlog) {

//                               if (userlog.length == 0) {

//                                   UserLog.create(users, function (err1, userLoggedIn) {
//                                       console.log("Going to call Done", userLoggedIn);
//                                       return done(null, userLoggedIn);
//                                   });
//                               }
//                               else {
//                                   console.log("Going to call Doneerer", userlog[0]);
//                                   return done(null, userlog[0]);
//                               }
//                           })

//                           // return done(null);
//                       }
//                   });
//               }
//               else if (dbUser instanceof Array && dbUser.length > 0) {
//                   console.log('db user' + dbUser[0])
//                   dbUser[0].userRole = dbUser[0].role.name;
//                   try {
//                       var emailaddress = profile.email;
//                       var dbusername = emailaddress.replace('@ust-global.com','')
//                       dbusername = dbusername.split(".");
//                       var userFullname = dbusername[0] +' '+ dbusername[1];

//                       User.update({ "email": emailaddress }, {
//                           $set: {
//                               "name": userFullname,
//                           }
//                       }, function (err, post) {
//                          // if (err) return next(err);
//                           //res.json(post);
//                           console.log(err + post);
//                       });
//                   }
//                   catch(e){
//                       console.log("entering catch block");
//                   }

//                   finally
//                   {
//                       console.log(userFullname);
//                       return done(null, dbUser[0]);
//                   }
//               }
//           })
//	    });
//	}
//));


module.exports = app;
