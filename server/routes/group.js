var express = require('express');
var router = express.Router();
var controller = require('../controllers/group.js');

/* Get Get Label list */
router.get('/get', controller.get);

/*Post Create new Label*/
router.post('/create', controller.create);

/*Get Get Label details by Id */
router.get('/get/:id', controller.getById);

/*Post Update Label details */
router.post('/update', controller.update);

/*Delete Remove label details */
router.delete('/delete/:id', controller.delete);

router.post('/addUsers', controller.addUsers);

module.exports = router;