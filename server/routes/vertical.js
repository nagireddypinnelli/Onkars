var express = require('express');
var router = express.Router();
var controller = require('../controllers/vertical.js');

/* Get Get vertical list */
router.get('/get', controller.get);

/*Post Create new vertical*/
router.post('/create', controller.create);

/*Get Get vertical details by Id */
router.get('/get/:id', controller.getById);

/*Post Update vertical details */
router.post('/update', controller.update);

/*Delete Remove vertical details */
router.delete('/delete/:id', controller.delete);

router.post('/checkExistsVertical', controller.checkExistsVertical);

module.exports = router;