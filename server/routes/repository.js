var express = require('express');
var router = express.Router();
var controller = require('../controllers/repository.js');

/* Get Get account list */
router.get('/get', controller.get);

/*Post Create new account*/
router.post('/create', controller.create);

router.post('/createInner', controller.createInnerRepository);

router.post('/addFiles', controller.addFiles)

router.get('/getById/:id', controller.getById);

router.post('/addtag', controller.addTagForSearch);

router.post('/remove', controller.removeTagForSearch);

module.exports = router;