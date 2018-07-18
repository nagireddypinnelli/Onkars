
var mongoose = require('mongoose');
var Problem = require('../models/problem.js');
var Status = require('../models/status.js');
var Category = require('../models/category.js');
var Phase = require('../models/phase.js');
var User = require('../models/user.js');
var Account = require('../models/account.js');
var Domain = require('../models/domain.js');

exports.create = function (req, res, next) {
    var problem = req.body.problem;
    var Sequence = exports.Sequence || require('sequence').Sequence, sequence = Sequence.create(), err;
    sequence
    .then(function (next, err) {
        Problem.find().sort('-problemId').exec(function (err, problems) {
            if (err) return next(err);
            if (problems && problems.length > 0) {
                var pCount = problems[0].problemId;
                next(err, pCount);
            }
            else next(err, 0);
        });
    })
	.then(function (next, err, problemId) {
	    Phase.find({ "setFirst": "1" }).exec(function (err, phases) {
	        if (err) return next(err);
	        if (phases && phases.length > 0) {
	            next(err, problemId, phases[0]._id);
	        }
	        else next(err, problemId, "");
	    });
	})
	.then(function (next, err, problemId, phase) {
	    Status.find({ "setFirst": "1" }).exec(function (err, status) {
	        if (err) return next(err);
	        if (status && status.length > 0) {
	            next(err, problemId, phase, status[0]._id);
	        }
	        else next(err, problemId, phase, "");
	    });
	})
    .then(function (next, err, problemId, phase, status) {
        problem.problemId = Number(problemId + 1);
        problem.phase = phase;
        problem.status = status;
        Problem.create(problem, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    })
};

exports.createProblemInDraft = function (req, res, next) {
    var problem = req.body.problem;
    var Sequence = exports.Sequence || require('sequence').Sequence, sequence = Sequence.create(), err;
    sequence
    .then(function (next, err) {
        Problem.find().sort('-problemId').exec(function (err, problems) {
            if (err) return next(err);
            if (problems && problems.length > 0) {
                var pCount = problems[0].problemId;
                next(err, pCount);
            }
            else next(err, 0);
        });
    })
	.then(function (next, err, problemId) {
	    Phase.find({ "setFirst": "1" }).exec(function (err, phases) {
	        if (err) return next(err);
	        if (phases && phases.length > 0) {
	            next(err, problemId, phases[0]._id);
	        }
	        else next(err, problemId, "");
	    });
	})
	.then(function (next, err, problemId, phase) {
	    Status.find({ "setFirst": "1" }).exec(function (err, status) {
	        if (err) return next(err);
	        if (status && status.length > 0) {
	            next(err, problemId, phase, status[0]._id);
	        }
	        else next(err, problemId, phase, "");
	    });
	})
    .then(function (next, err, problemId, phase, status) {
       // problem.problemId = Number(problemId + 1);
        problem.phase = phase;
        problem.status = null;
        Problem.create(problem, function (err, post) {
            console.log(err);
            console.log(post);
            if (err) return next(err);
            res.json(post);
        });
    })
};



exports.getUserDraftProblems = function (req, res, next) {
    Problem.find({ createdBy: req.params.userId, status: null, phase: { $ne: null } })
    .sort({ createdDateTime: -1 })
    .populate([{ path: 'contributors', select: 'name' },
               { path: 'customerStakeholders', select: 'name' },
               { path: 'category', select: 'name' },
               { path: 'domain', select: 'name' },
               { path: 'account', select: 'name' },
               { path: 'vertical', select: 'name' },
               { path: 'status', select: 'name class ' },
               { path: 'phase', select:'name logo'}
    ])
    .exec(function (err, response) {
        if (err) return next(err);
        res.json(response);
    });
};


exports.get = function (req, res, next) {

    var query = "";








    Problem.find({ status: { $ne: null }, phase: { $ne: null } }).limit(parseInt(req.params.limit)).skip(parseInt(req.params.skip)).sort({ updatedDateTime: -1 })
            .populate([{ path: 'status', select: 'name class' },
                       { path: 'comments.commentedBy', select: 'name' },
                       { path: 'views', select: 'name' },
                       { path: 'createdBy', populate: {	path: 'role',	model: 'role' }  },
                       { path: 'contributors', select: 'name' },
                       { path: 'customerStakeholders', select: 'name' },
                       { path: 'category', select: 'name' },
                       { path: 'domain', select: 'name' },
                       { path: 'account', model: 'account', populate: [{ path: 'vertical', model: 'vertical' }, { path: 'domain', model: 'domain' }] },
                       { path: 'phase', populate: {	path: 'phase',	model: 'phase' }  },
                       { path: 'tags.accountId', select: 'name' },
                       { path: 'tags.categoryId', select: 'name' },
                       { path: 'vertical', select: 'name' },
                       { path: 'likes.user', select: 'name' },
                       { path: 'labels', select: 'name' },
                       { path: 'innovationChampion', select: 'name' }])
            .exec(function (err, response) {
                if (err) return next(err);
                res.json(response);
            });
};


exports.getAllProblem = function (req, res, next) {
    Problem.find({ status: { $ne: null }, phase: { $ne: null }}).sort({ updatedDateTime: -1 })
            .populate([{ path: 'status', select: 'name class' },
                       { path: 'comments.commentedBy', select: 'name' },
                       { path: 'views', select: 'name' },
                       { path: 'createdBy', populate: { path: 'role', model: 'role' } },
                       { path: 'contributors', select: 'name' },
                       { path: 'customerStakeholders', select: 'name' },
                       { path: 'category', select: 'name' },
                       { path: 'domain', select: 'name' },
                       { path: 'account', model: 'account', populate: [{ path: 'vertical', model: 'vertical' }, { path: 'domain', model: 'domain' }] },
                       { path: 'phase', populate: { path: 'phase', model: 'phase' } },
                       { path: 'tags.accountId', select: 'name' },
                       { path: 'tags.categoryId', select: 'name' },
                       { path: 'vertical', select: 'name' },
                       { path: 'likes.user', select: 'name' },
                       { path: 'labels', select: 'name' },
                      // { path: 'innovationChampion', select: 'name' }
            ])
            .exec(function (err, response) {
                if (err) return next(err);
                res.json(response);
            });
};

exports.getUserProblems = function (req, res, next) {
    Problem.find({ createdBy: req.params.userId, status: { $ne: null }, phase: { $ne: null } })
        .limit(parseInt(req.params.limit))
        .skip(parseInt(req.params.skip))
        .sort({ createdDateTime: -1 })
        .populate([{ path: 'status', select: 'name class' },
                       { path: 'comments.commentedBy', select: 'name' },
                       { path: 'views', select: 'name' },
                       { path: 'createdBy', populate: {	path: 'role',	model: 'role' }  },
                       { path: 'contributors', select: 'name' },
                       { path: 'customerStakeholders', select: 'name' },
                       { path: 'category', select: 'name' },
                       { path: 'domain', select: 'name' },
                       { path: 'account', model: 'account', populate: [{ path: 'vertical', model: 'vertical' }, { path: 'domain', model: 'domain' }] },
                       { path: 'phase', populate: {	path: 'phase',	model: 'phase' }  },
                       { path: 'tags.accountId', select: 'name' },
                       { path: 'tags.categoryId', select: 'name' },
                       { path: 'vertical', select: 'name' },
                       { path: 'likes.user', select: 'name' },
                       { path: 'labels', select: 'name' },
                       { path: 'innovationChampion', select: 'name' },
         ])
        .exec(function (err, response) {
            if (err) return next(err);
         res.json(response);
         });
};


exports.getUserAllProblems = function (req, res, next) {
    Problem.find({ createdBy: req.params.userId, status: { $ne: null }, phase: { $ne: null } })
        .sort({ createdDateTime: -1 })
        .populate([{ path: 'status', select: 'name class' },
                       { path: 'comments.commentedBy', select: 'name' },
                       { path: 'views', select: 'name' },
                       { path: 'createdBy', populate: { path: 'role', model: 'role' } },
                       { path: 'contributors', select: 'name' },
                       { path: 'customerStakeholders', select: 'name' },
                       { path: 'category', select: 'name' },
                       { path: 'domain', select: 'name' },
                       { path: 'account', model: 'account', populate: [{ path: 'vertical', model: 'vertical' }, { path: 'domain', model: 'domain' }] },
                       { path: 'phase', populate: { path: 'phase', model: 'phase' } },
                       { path: 'tags.accountId', select: 'name' },
                       { path: 'tags.categoryId', select: 'name' },
                       { path: 'vertical', select: 'name' },
                       { path: 'likes.user', select: 'name' },
                       { path: 'labels', select: 'name' },
                       { path: 'innovationChampion', select: 'name' }
        ])
         .exec(function (err, response) {
          if (err) return next(err);
          res.json(response);
          });
};

exports.getRecentProblems = function (req, res, next) {
    var problem = req.body.problem;
    var Sequence = exports.Sequence || require('sequence').Sequence, sequence = Sequence.create(), err;
    sequence
    .then(function (next, err) {
        User.find({ _id: req.params.userId})
            .populate([{ path: 'role', select: 'name' }])
            .exec(function (err, response) {
                if (err) return next(err);
                next(err, response);
            });
    })
	.then(function (next, err, users) {
	    if (users && users.length > 0) {
	        if (users[0].role.name == "Innovation champion" ||users[0].role.name =="Admin") {
	            Problem.find({ status: { $ne: null }, phase: { $ne: null } }).sort({ createdDateTime: -1 })
                .populate([{ path: 'status', select: 'name class' },
                           { path: 'comments.commentedBy', select: 'name' },
                           { path: 'views', select: 'name' },
                           { path: 'createdBy', populate: {	path: 'role',	model: 'role' }  },
                           { path: 'contributors', select: 'name' },
                           { path: 'customerStakeholders', select: 'name' },
                           { path: 'category', select: 'name' },
                           { path: 'domain', select: 'name logo' },
                           { path: 'account', model: 'account', populate: [{ path: 'vertical', model: 'vertical' }, { path: 'domain', model: 'domain' }] },
                           { path: 'phase', populate: {	path: 'phase',	model: 'phase' }  },
                           { path: 'tags.accountId', select: 'name' },
                           { path: 'tags.categoryId', select: 'name' },
                           { path: 'vertical', select: 'name' },
                           { path: 'likes.user', select: 'name' }])
                .exec(function (err, response) {
                    if (err) return next(err);
                    next(err, response);
                });
	        }
	        else {
	            Problem.find({ createdBy: req.params.userId, status: { $ne: null }, phase: { $ne: null } }).sort({ createdDateTime: -1 })
					.populate([{ path: 'status', select: 'name class' },
							   { path: 'comments.commentedBy', select: 'name' },
							   { path: 'views', select: 'name' },
							   { path: 'createdBy', populate: {	path: 'role',	model: 'role' }  },
							   { path: 'contributors', select: 'name' },
							   { path: 'customerStakeholders', select: 'name' },
							   { path: 'category', select: 'name' },
							   { path: 'domain', select: 'name logo' },
							   { path: 'account', model: 'account', populate: [{ path: 'vertical', model: 'vertical' }, { path: 'domain', model: 'domain' }] },
							   { path: 'phase', populate: {	path: 'phase',	model: 'phase' }  },
							   { path: 'tags.accountId', select: 'name' },
							   { path: 'tags.categoryId', select: 'name' },
							   { path: 'vertical', select: 'name' },
							   { path: 'likes.user', select: 'name' }])
					.exec(function (err, response) {
					    if (err) return next(err);
					    next(err, response);
					});
	        }
	    }
	    else next(err, []);
	})
	.then(function (next, err, problems) {
	    res.json(problems);
	});
};

exports.delete = function(req,res,next)
{
    Problem.findOneAndRemove({ _id: req.body.problemid}, function (err, result) {
        if (err) return next(err);
        res.json(result);
    });
}


exports.getById = function (req, res, next) {
    Problem.findById(req.params.id)
            .populate([{ path: 'status', select: 'name class' },
                       { path: 'comments.commentedBy', select: 'name' },
                       { path: 'views', select: 'name' },
                       { path: 'createdBy', populate: {	path: 'user',	model: 'User' }},
                       //{ path: 'contributors', select: 'name' },
					   //{ path: 'solutionContributors', select: 'name' },
                       { path: 'customerStakeholders', select: 'name' },
                       { path: 'category', select: 'name' },
					   { path: 'vertical', select: 'name' },
                       { path: 'domain', select: 'name' },                       
                       { path: 'phase', populate: {	path: 'phase',	model: 'phase' }},
                       { path: 'tags.accountId', select: 'name' },
                       { path: 'tags.categoryId', select: 'name' },
                       { path: 'likes.user', select: 'name' },
                       { path: 'approach', select: 'name' },                     
                       { path: 'innovationChampion', select: 'name' },
                       { path: 'account', model: 'account', populate: [{ path: 'vertical', model: 'vertical' }, { path: 'domain', model: 'domain' }] }
            ])
       // .populate({ path: 'account', model: 'account', populate: [{ path: 'vertical', model: 'vertical' }, { path: 'domain', model: 'domain' }] })
            .exec(function (err, response) {
                if (err) return next(err);
                res.json(response);
            });
};

exports.update = function (req, res, next) {
    var problem = req.body.problem
    Problem.findByIdAndUpdate(problem._id, {
        $set: {
            "title": problem.title,
            "problemStatement": problem.problemStatement,
            "phase": problem.phase,
            "category": problem.category,
            "account": problem.account,
            "domain": problem.domain,
            "businessImpact": problem.businessImpact,
            "estimate": problem.estimate,
            "ustShare": problem.ustShare,
            "targetBusinessUnit": problem.targetBusinessUnit,
            "otherInfo": problem.otherInfo,
            "geographics": problem.geographics,
            "assumptions": problem.assumptions,
            "solutionNeedDate": problem.solutionNeedDate,
            "vertical": problem.vertical,
            "solutionPlannedClosureDate": problem.solutionPlannedClosureDate,
            "approach": problem.approach,
            "labels": problem.labels,
            "priority": problem.priority,
			"attachments": problem.attachments,
            "contributors": problem.contributors,
            "estimateOfCustomer": problem.estimateOfCustomer,
            "customerStakeholders": problem.customerStakeholders,
            "targetBusinessGeography": problem.targetBusinessGeography,
            "customerPains": problem.customerPains,
            "customerGains": problem.customerGains,
            "solutionContributors": problem.solutionContributors,
            "status": problem.status,
            "updatedBy": problem.updatedBy,
            "updatedDateTime": new Date(),
            "innovationChampion": problem.innovationChampion
        }
    }, function (err, post) {

        console.log(err);
        if (err) return next(err);
        res.json(post);
    });
};

exports.updateFinalFormProblem = function (req, res, next) {
    var problem = req.body.problem
    var Sequence = exports.Sequence || require('sequence').Sequence, sequence = Sequence.create(), err;
    sequence
    .then(function (next, err) {
        Status.find({ "setFirst": "1" }).exec(function (err, status) {
            if (err) return next(err);
            if (status && status.length > 0) {
                next(err, status[0]._id);
            }
            else next(err,  null);
        });
    }).then(function (next, err, statusId) {
            Problem.find().sort('-problemId').exec(function (err, problems) {
                if (err) return next(err);
                if (problems && problems.length > 0) {
                    var pCount = problems[0].problemId;
                    next(err, statusId, pCount);
                }
                else next(err, 0);
            });
        })
    .then(function (next, err, statusId,problemId) {
        Problem.findByIdAndUpdate(problem._id, {
            $set: {
                "title": problem.title,
                "problemStatement": problem.problemStatement,
                "status": statusId,
                "category": problem.category,
                "account": problem.account,
                "domain": problem.domain,
                "businessImpact": problem.businessImpact,
                "estimate": problem.estimate,
                "ustShare": problem.ustShare,
                "targetBusinessUnit": problem.targetBusinessUnit,
                "otherInfo": problem.otherInfo,
                "geographics": problem.geographics,
                "assumptions": problem.assumptions,
                "solutionNeedDate": problem.solutionNeedDate,
                "solutionPlannedClosureDate": problem.solutionPlannedClosureDate,
                "vertical": problem.vertical,
                "priority": problem.priority,
                "attachments": problem.attachments,
                "contributors": problem.contributors,
                "estimateOfCustomer": problem.estimateOfCustomer,
                "customerStakeholders": problem.customerStakeholders,
                "targetBusinessGeography": problem.targetBusinessGeography,
                "customerPains": problem.customerPains,
                "customerGains": problem.customerGains,
                "solutionContributors": problem.solutionContributors,
                "updatedDateTime": new Date(),
                "problemId" : Number(problemId + 1),
                //"owner": problem.owner                
            }
        }, function (err, post) {

            console.log(err);
            if (err) return next(err);
            res.json(post);
        });
    });
};


exports.getProblemsFilter = function (req, res, next) {
    var Sequence = exports.Sequence || require('sequence').Sequence, sequence = Sequence.create(), err;
    sequence
	.then(function (next) {
	    resObj = [{
	        path: req.params.filterType,
	        match: { name: { $in: [req.params.filterValue] } }
	    }, { path: 'comments.commentedBy', select: 'name' }, { path: 'views', select: 'name' }, { path: 'createdBy', select: 'name' }, { path: 'contributors', select: 'name' }, { path: 'customerStakeholders', select: 'name' }, { path: 'category', select: 'name' }, { path: 'tags.accountId', select: 'name' }, { path: 'tags.categoryId', select: 'name' }, { path: 'likes.user', select: 'name' }];
	    if (req.params.filterType != "phase")
	        resObj.push({ path: 'phase', select: 'name' });

	    if (req.params.filterType != "domain")
	        resObj.push({ path: 'domain', select: 'name' });

	    if (req.params.filterType != "account")
	        resObj.push({ path: 'account', select: 'name' });

	    if (req.params.filterType != "status")
	        resObj.push({ path: 'status', select: 'name' });

	    Problem.find({}).populate(resObj)
			.exec(function (err, response) {
			    if (!err && response)
			        next(err, response);
			})
	})
	.then(function (next, err, problems) {
	    var resObject = [];
	    if (problems.length == 0) res.json(resObject);
	    for (var problemIndex = 0; problemIndex < problems.length; problemIndex++) {
	        if ((req.params.filterType == "phase" && problems[problemIndex].phase != null) || (req.params.filterType == "status" && problems[problemIndex].status != null) || (req.params.filterType == "domain" && problems[problemIndex].domain != null) || (req.params.filterType == "account" && problems[problemIndex].account != null))
	            resObject.push(problems[problemIndex]);
	        if (problemIndex + 1 == problems.length) {
	            res.json(resObject);
	        }
	    }
	});
};

exports.addComment = function (req, res, next) {
    Problem.findByIdAndUpdate(req.body.comment.id, {
        $push: {
            'comments': { 'commentedBy': req.body.comment.createdBy, 'comment': req.body.comment.comment }
        },
        $set: {
            "updatedBy": req.body.comment.createdBy,
            "updatedDateTime": new Date(),
        }
    },
    function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};

exports.likeProblem = function (req, res, next) {
    Problem.findByIdAndUpdate(req.body.problem.id, {
        $push: {
            'likes': {
                'user': req.body.problem.likedby
            }
        }
    },
  function (err, post) {
      if (err) return next(err);
      res.json(post);
  });
};

exports.unlikeProblem = function (req, res, next) {
    Problem.findByIdAndUpdate(req.body.problem.id, {
        $pull: {
            'likes': {
                'user': req.body.problem.likedby
            }
        }
    },
  function (err, post) {
      if (err) return next(err);
      res.json(post);
  });
};


exports.viewProblem = function (req, res, next) {
    Problem.findByIdAndUpdate(req.body.problem.id, {
        $push: {
            'views': req.body.problem.viewedBy           
        }
    },
  function (err, post) {
      if (err) return next(err);
      res.json(post);
  });
};

exports.getProblemsByDate = function (req, res, next) {
    var currentDate = new Date();
    var filterType = req.params.filterType;
    var filterDate = new Date();
    if (filterType == 'Last24Hr')
    {
        filterDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - 1,
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds(),
        currentDate.getMilliseconds()
        );
    }
    if (filterType == 'Last7Days')
    {
        filterDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - 7,
        00,
        00,
        00);        
    }
    if (filterType == 'Last30Days')
    {
       filterDate = new Date(
       currentDate.getFullYear(),
       currentDate.getMonth() -1,
       currentDate.getDate(),
       00,
       00,
       00);
    }
    if (filterType == 'Last3Months')
    {
       filterDate = new Date(
       currentDate.getFullYear(),
       currentDate.getMonth() - 3,
       currentDate.getDate(),
       00,
       00,
       00);      
    }
    if (filterType == 'YeartoDate')
    {
       filterDate = new Date(
       currentDate.getFullYear(),
       0,
       1,
       00,
       00,
       00);
    }
    Problem.find({
        createdDateTime: { $gte: filterDate },
        status: { $ne: null },
        phase: { $ne: null }
        }).populate([{ path: 'status', select: 'name class' },
                     { path: 'comments.commentedBy', select: 'name' },
                     { path: 'views', select: 'name' },
                     { path: 'createdBy', populate: { path: 'role', model: 'role' } },
                     { path: 'contributors', select: 'name' },
                     { path: 'customerStakeholders', select: 'name' },
                     { path: 'category', select: 'name' },
                     { path: 'domain', select: 'name' },
                     { path: 'account', model: 'account', populate: [{ path: 'vertical', model: 'vertical' }, { path: 'domain', model: 'domain' }] },
                     { path: 'phase', populate: { path: 'phase', model: 'phase' } },
                     { path: 'tags.accountId', select: 'name' },
                     { path: 'tags.categoryId', select: 'name' },
                     { path: 'vertical', select: 'name' },
                     { path: 'likes.user', select: 'name' },
                     { path: 'labels', select: 'name' }])
            .exec(function (err, response) {
                if (err) return next(err);
                res.json(response);
         });
};

exports.changeApprovalStatus = function (req, res, next) {
    var approvalStatus = req.body.approvalStatus
    approvalStatus.approvalDate = new Date();
    Problem.findByIdAndUpdate(approvalStatus.id, {
        $set: {
            "approvalStatus": approvalStatus,
        }
    }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};

exports.getTopContributors = function (req, res, next) {

    var Sequence = exports.Sequence || require('sequence').Sequence, sequence = Sequence.create(), err;
    sequence
	.then(function (next) {

	    Problem.aggregate(
        [
        { $group: { _id: "$createdBy", "count": { $sum: 1 } } },
        { $sort: { "count": -1 } },
        { $limit: 3 },
        ])
        .exec(function (err, response) { 
            if (err) return next(err);   
            next(err,response);
        })
	})
	.then(function (next, err, response) {
	    var data = response;
    console.log(data[0]._id);
    if (data != null)
    {
        for (var i = 0; i < data.length; i++)
        {
            console.log(data[i]._id);
            User.findById(data[i]._id, function (err, post) {
                console.log(err);
                console.log(post);
                data[i]= post;
            });
        }
        next(err, response,data);
    }
	}).then(function (next, err, count, userdetails) {
	    res.json(userdetails);
	})
};

exports.getEachStatusPhaseProblemCount = function (req, res, next) {
    var statusPhaseCount = {};
    var Sequence = exports.Sequence || require('sequence').Sequence, sequence = Sequence.create(), err;
    sequence
    .then(function (next) {
        Problem.aggregate([
            { $group: { _id: "$phase", "count": { $sum: 1 } } }
        ])
        .exec(function (err, phaseCount) {
            if (err) return next(err,"");
            next(err, phaseCount)
        })
    }).then(function (next, err, phaseCount) {
        statusPhaseCount.phase = phaseCount;
        Problem.aggregate([
          { $group: { _id: "$status", "count": { $sum: 1 } } }
        ])
      .exec(function (err, statusCount) {
          if (err) return next(err, "");
          statusPhaseCount.status = statusCount;
          res.json(statusPhaseCount);
      })
    })
};


