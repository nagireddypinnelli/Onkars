var express = require('express');
var router = express.Router();
var controller = require('../controllers/role.js');

/* Get Get Problem list */
router.get('/get', controller.get);

/*Post Create new status*/
router.post('/create', controller.create);

/*Get Get status details by Id */
router.get('/get/:id', controller.getById);

/*Post Update status details */
router.post('/update', controller.update);

/*Delete Remove role details */
router.delete('/delete/:id', controller.delete);

router.post('/checkExistsRole', controller.checkExistsRole);

module.exports = router;