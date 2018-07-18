var express = require('express');
var router = express.Router();
var controller = require('../controllers/approach.js');

/* Get Get Problem list */
router.get('/get', controller.get);

/*Post Create new domain*/
router.post('/create', controller.create);

/*Get Get domain details by Id */
router.get('/get/:id', controller.getById);

/*Post Update domain details */
router.post('/update', controller.update);

/*Delete Remove Approach details */
router.delete('/delete/:id', controller.delete);

router.post('/checkExistsApproach', controller.checkExistsApproach);

module.exports = router;