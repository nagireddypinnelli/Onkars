var express = require('express');
var router = express.Router();
var controller = require('../controllers/profile');
//var Usercontroller = require('../controllers/users');
var passport = require('passport');


/*Post  Get LoggedInUserDetails*/
router.post('/create', controller.update);
router.post('/addFiles', controller.addFiles);
router.get('/get/:id', controller.getProfileList);

module.exports = router;
