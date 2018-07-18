var express = require('express');
var router = express.Router();
var controller = require('../controllers/problem.js');

/* Get Get Problem list */
router.get('/get/:limit/:skip', controller.get);

/* Get Get Problem details */
router.get('/get/:id', controller.getById);

router.get('/getEachStatusPhaseProblemCount', controller.getEachStatusPhaseProblemCount);

/*Get Get Problem By  UserId*/
router.get('/getuserproblems/:userId/:limit/:skip', controller.getUserProblems);

/* Get Get Problem list */
router.get('/get', controller.getAllProblem);

/*Get Get Problem By  UserId*/
router.get('/getuserproblems/:userId', controller.getUserAllProblems);

/*POST Create Business problem*/
router.post('/create', controller.create);

/* Get Get Problem list filter */
router.get('/getProblemsFilter/:filterType/:filterValue/', controller.getProblemsFilter);

/*Post Update problem details*/
router.post('/update', controller.update);

/*Post Add comment*/
router.post('/addComment', controller.addComment);

/*Post Like Business Problem */
router.post('/like', controller.likeProblem);

/*Post Like Business Problem */
router.post('/unlike', controller.unlikeProblem);

/*Post Update Business Problem Views*/
router.post('/view', controller.viewProblem)

/*Get Filter Business problem by date */
router.get('/getProblemByDate/:filterType', controller.getProblemsByDate);

/*Post  Update Approvel Status*/
router.post('/changeApprovalStatus', controller.changeApprovalStatus);

/*Get Get Recent Business Problem*/
router.get('/getRecentProblems/:userId', controller.getRecentProblems);

/*Get Get User problems from draf */
router.get('/getUserDraftProblems/:userId', controller.getUserDraftProblems);

/*Post Update Business Problem */
router.post('/updateFinalFormProblem', controller.updateFinalFormProblem);

/*Post Save Business Problems in Draft*/
router.post('/saveInDraft', controller.createProblemInDraft);

/*Post Delete Business Problem */
router.post('/delete', controller.delete);

/*Get Get Top contributors */
router.get('/getTopContributors', controller.getTopContributors);

module.exports = router;

