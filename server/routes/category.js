var express = require('express');
var router = express.Router();
var controller = require('../controllers/category.js');

/* Get Get Category list */
router.get('/get', controller.get);

/*Post Create new category*/
router.post('/create', controller.create);

/*Get Get category details by Id */
router.get('/get/:id', controller.getById);

/*Post Update category details */
router.post('/update', controller.update);

/*Delete Remove Category details */
router.delete('/delete/:id', controller.delete);

router.post('/checkExistsCategory', controller.checkExistsCategory);

module.exports = router;