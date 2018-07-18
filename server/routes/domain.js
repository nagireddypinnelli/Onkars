var express = require('express');
var router = express.Router();
var controller = require('../controllers/domain.js');

/* Get Get domain list */
router.get('/get', controller.get);

/*Post Create new domain*/
router.post('/create', controller.create);

/*Get Get domain details by Id */
router.get('/get/:id', controller.getById);

/*Post Update domain details */
router.post('/update', controller.update);

/*Delete Remove domain details */
router.delete('/delete/:id', controller.delete);

router.post('/checkExistsDomain', controller.checkExistsDomain);

module.exports = router;