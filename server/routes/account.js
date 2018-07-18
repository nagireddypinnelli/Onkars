var express = require('express');
var router = express.Router();
var controller = require('../controllers/account.js');

/* Get Get account list */
router.get('/get', controller.get);

/*Post Create new account*/
router.post('/create', controller.create);

/*Get Get account details by Id */
router.get('/get/:id', controller.getById);

/*Post Update account details */
router.post('/update', controller.update);

/*Delete Remove account details */
router.delete('/delete/:id', controller.delete)

router.post('/checkExistsAccount', controller.checkExistsAccount);

module.exports = router;