module.exports = function (app) {

    var express = require('express');
    var bodyParser = require('body-parser');
    var path = require('path');

    app.use(express.static('www'));
    app.use(express.static('vendor'));
    app.use(express.static('www/app/components/navbar'));
    app.use(express.static('www/app/components/treeview'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    var multer = require('multer');


    var nodemailer = require('nodemailer');

    /* users call */
    var users = require('./routes/users');
    app.use('/api/users',
		function (req, res, next) {
		    return next();
		}, users);

    var problem = require('./routes/problem');
    app.use('/api/problem',
        function (req, res, next) {
            return next();
        }, problem);

    var account = require('./routes/account');
    app.use('/api/account',
        function (req, res, next) {
            return next();
        }, account);

    var category = require('./routes/category');
    app.use('/api/category',
        function (req, res, next) {
            return next();
        }, category);

    var domain = require('./routes/domain');
    app.use('/api/domain',
        function (req, res, next) {
            return next();
        }, domain);

    var phase = require('./routes/phase');
    app.use('/api/phase',
        function (req, res, next) {
            return next();
        }, phase);

    var status = require('./routes/status');
    app.use('/api/status',
        function (req, res, next) {
            return next();
        }, status);

    var role = require('./routes/role');
    app.use('/api/role',
        function (req, res, next) {
            return next();
        }, role);

    var label = require('./routes/label');
    app.use('/api/label',
        function (req, res, next) {
            return next();
        }, label);

    var approach = require('./routes/approach');
    app.use('/api/approach',
        function (req, res, next) {
            return next();
        }, approach);

    var vertical = require('./routes/vertical');
    app.use('/api/vertical',
        function (req, res, next) {
            return next();
        }, vertical);

    var group = require('./routes/group');
    app.use('/api/group',
        function (req, res, next) {
            return next();
        }, group);

	var repository = require('./routes/repository');
	app.use('/api/repository',
		function (req, res, next) {
		    return next();
		}, repository);

    var excelExport = require('./routes/excel-export');
    app.use('/api/excel',
        function (req, res, next) {
            return next();
        }, excelExport);

    var repository = require('./routes/email');
    app.use('/api/email',
        function (req, res, next) {
            return next();
        }, excelExport);

    /* profile page save*/
    var profile = require('./routes/profile');
    app.use('/api/profile',
		function (req, res, next) {
		    return next();
		}, profile);


    var fileString;

    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
          cb(null, './www/uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            fileString = path.parse(file.originalname).name + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]
            cb(null, fileString);
        }
    });

    var upload = multer({ //multer settings
        storage: storage
    }).single('file');

    /** API path that will upload the files */
    app.post('/api/create/upload', function (req, res) {
        upload(req, res, function (err) {
            if (err) {
                res.json({ error_code: 1, err_desc: err });
                return;
            }
            res.json({ error_code: 0, err_desc: null, file_name: fileString });
        });
    });


    app.post('/api/send/email', function (req, res) {
       
        console.log("helooo",req.body.mailDetails);

        nodemailer.createTestAccount((err, account) => {

            console.log("team checking");

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: '10.11.1.130',
                port: 25,
                secure: false, // true for 465, false for other ports
                logger: true,
                debug: true,
                auth: {
                    user: 'onkaresh.ghali@ust-global.com', // generated ethereal user
                    pass: 'Ubics@1991!@#1234' // generated ethereal password
                },
                tls: { rejectUnauthorized: false }
            });

            console.log("sending mail");


            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Fred Foo 👻" <onkaresh.ghali@ust-global.com>', // sender address
                to: 'onkaresh.ghali@ust-global.com', // list of receivers
                subject: 'Hello ✔', // Subject line
                text: 'Hello world?', // plain text body
                html: '<b>Hello world?</b>' // html body
            };

            console.log("mailoptions")

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        });

    });

  

}

