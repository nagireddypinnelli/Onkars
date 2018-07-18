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

   
    var fileString;

    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
           cb(null, './www/uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            fileString = path.parse(file.originalname).name + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]
            cb(null, fileString);
        }
    });

    var upload = multer({ //multer settings
        storage: storage
    }).single('file');

    /** API path that will upload the files */
    app.post('/api/repository/upload', function (req, res) {

        upload(req, res, function (err) {
            if (err) {
                res.json({ error_code: 1, err_desc: err });
                return;
            }
            res.json({ error_code: 0, err_desc: null, file_name: fileString });
        });
    });


    app.post('/api/profile/upload', function (req, res) {
        upload(req, res, function (err) {
            if (err) {
                res.json({ error_code: 1, err_desc: err });
                return;
            }
            res.json({ error_code: 0, err_desc: null, file_name: fileString });
        });
    });

}

