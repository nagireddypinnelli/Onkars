var express = require('express');
var router = express.Router();
var controller = require('../controllers/users');
var passport = require('passport');

router.get('/getInnovationchampions', controller.getInnovationchampions);

router.get('/getUserDetailsById/:id', controller.getUserDetailsById);

router.post('/checkExistingEmailId', controller.checkExistingEmailId);

/* GET Get all users list */
router.get('/getUserList/', controller.getUserList);

router.get('/getblockedUsersCount', controller.getblockedUsersCount);

router.get('/getBlockedList/', controller.blockedUsers);

router.post('/updateUsersRole/', controller.updateUsersRole);

router.post('/blockUsers/', controller.blockUsers);

router.post('/unblockUsers', controller.unblockUsers);

/*POST Create users with role*/
router.post('/create', controller.create);

/* GET listing. */
//router.get('/', controller.get);

/* GET Get user details by userId */
router.get('/:id', controller.getById);

/*Delete Delete  User*/
router.delete('/delete/:id', controller.delete);

/*post Unblock  User*/
router.post('/unblock/:id', controller.unblockUser);


/*POST Update user Details */
router.post('/update/', controller.update);

router.get('/blockedUsers/', controller.blockedUsers);

/*Post  Get LoggedInUserDetails*/
router.post('/loginUserDetails/', controller.getUserDetails);

router.post('/login/', controller.authenticate(), controller.createSession);

router.get('/getUserRole/:uId', controller.getUserRole);

router.post('/changepassword/', controller.changepassword);

router.post('/login/callback',
	passport.authenticate('wsfed-saml2', { failureRedirect: '/', failureFlash: true }),
	function (req, res) {
	    res.render('callback', { user: req.user });
	}
);


module.exports = router;
