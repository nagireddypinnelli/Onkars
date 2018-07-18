var express = require('express');
var router = express.Router();
var controller = require('../controllers/phase.js');

/* Get Get Phase list */
router.get('/get', controller.get);

/*Post Create new phase*/
router.post('/create', controller.create);

/*Get Get phase details by Id */
router.get('/get/:id', controller.getById);

/*Post Update phase details */
router.post('/update', controller.update);

/*Delete Remove phase details */
router.delete('/delete/:id', controller.delete);

router.post('/checkExistsPhase', controller.checkExistsPhase);

module.exports = router;