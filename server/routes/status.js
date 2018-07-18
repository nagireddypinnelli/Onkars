var express = require('express');
var router = express.Router();
var controller = require('../controllers/status.js');

/* Get Get status list */
router.get('/get', controller.get);

/*Post Create new status*/
router.post('/create', controller.create);

/*Get Get status details by Id */
router.get('/get/:id', controller.getById);

/*Post Update status details */
router.post('/update', controller.update);

/*Delete Remove status details */
router.delete('/delete/:id', controller.delete)


router.post('/checkExistsStatus', controller.checkExistsStatus);
module.exports = router;