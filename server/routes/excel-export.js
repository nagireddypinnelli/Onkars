var express = require('express');
var router = express.Router();
var controller = require('../controllers/excel-export.js');

/* Get Get account list */
router.get('/problems', controller.exportAllProblems);


router.post('/getProblemDetailsByIds', controller.exportByProblemId);

/*Post Create new account*/

router.get('/getusers', controller.exportUserDetails);

router.post('/getUserDetailsByIds', controller.exportUserDetailsByIds);

router.get('/getAccount', controller.exportAccountDetails);

module.exports = router;