(function () {
    'use strict';

    /*
     * @name ProblemService
     * @description
     * 
     * # Service for Problem module
     * ==========================
     */

    angular
        .module('id3.problem')
        .factory('ProblemService', ProblemService);
    ProblemService.$inject = ['$http'];
    function ProblemService($http) {
        var service = {
            getProblemData: function getProblemData(limit, skip, callback) {
                $http.get('/api/problem/get/' + limit + '/' + skip)
					.success(function (response) {
					    callback(response);
					});
            },

            getRecentProblems: function getProblemData(userId, callback) {
                $http.get('/api/problem/getRecentProblems/' + userId)
					.success(function (response) {
					    callback(response);
					});
            },

            getLoggedInUserDetails :function(userId,callback){
                $http.get('/api/users/getUserDetailsById/'+userId)
                    .success(function(response){
                        callback(response);
                    });
            },

            getUserById: function getUserById(id, callback) {
                $http.get('/api/users/' + id)
				.success(function (response) {
				    callback(response);
				});
            },


            getBusinessProblemList: function (callback) {
                $http.get('/api/problem/get')
                .success(function (response) {
                    callback(response);
                })
            },

            create: function (problem, callback) {
                $http.post('/api/problem/create', {
                    problem: problem
                })
				.success(function (response) {
				    callback(response);
				})
				.error(function (response) {
				    callback("error");
				})
            },

            saveInDraft: function (problem, callback) {
                $http.post('/api/problem/saveInDraft', {
                    problem: problem
                })
				.success(function (response) {
				    callback(response);
				})
				.error(function (response) {
				    callback("error");
				})
            },

            getAccountList: function (callback) {
                $http.get('/api/account/get')
                .success(function (response) {
                    callback(response);
                })
            },
            getVerticalList: function (callback) {
                $http.get('/api/vertical/get')
                .success(function (response) {
                    callback(response);
                })
            },
            getApproachList: function (callback) {
                $http.get('api/approach/get')
                .success(function (response) {
                    callback(response);
                })
            },
            getCategoryList: function (callback) {
                $http.get('/api/category/get')
                .success(function (response) {
                    callback(response);
                })
            },
            getDiomainList: function (callback) {
                $http.get('/api/domain/get')
                .success(function (response) {
                    callback(response);
                })
            },

            getLabelList: function (callback) {
                $http.get('api/label/get')
                .success(function (response) {
                    callback(response);
                })
            },

            getPhaseList: function (callback) {
                $http.get('/api/phase/get')
                .success(function (response) {
                    callback(response);
                })
            },

            getInnovationchampions :function(callback){
                $http.get('/api/users/getInnovationchampions')
                .success(function (response) {
                    callback(response);
                })
            },

            getStatusList: function (callback) {
                $http.get('/api/status/get')
                .success(function (response) {
                    callback(response);
                })
            },

            getUserList: function (callback) {
                $http.get('/api/users/getUserList')
                .success(function (response) {
                    callback(response);
                })
            },

            addComment: function (comment, callback) {
                $http.post('/api/problem/addComment', {
                    comment: comment
                }).success(function (response) {
                    callback("success");
                })
                  .error(function (response) {
                      callback(response);
                  })
            },

            likeProblem: function (problem, callback) {
                $http.post('/api/problem/like', {
                    problem: problem
                }).success(function (response) {
                    callback("success");
                }).error(function (response) {
                    callback(response);
                })
            },

            unlikeProblem: function (problem, callback) {
                $http.post('/api/problem/unlike', {
                    problem: problem
                }).success(function (response) {
                    callback("success");
                }).error(function (response) {
                    callback(response);
                })
            },

            getProblemById: function (id, callback) {
                $http.get('/api/problem/get/' + id)
				.success(function (response) {
				    callback(response);
				});
            },

            getUserProblems: function (userId, callback) {
                $http.get('/api/problem/getuserproblems/' + userId)
                .success(function (response) {
                    callback(response);
                })
            },

            getProblemDataFilter: function getProblemDataFilter(filterType, filterValue, callback) {
                $http.get('/api/problem/getProblemsFilter' + '/' + filterType + '/' + filterValue + '/')
					.success(function (response) {
					    callback(response);
					});
            },

            getProblemsByDate: function (filterDateType, callback) {
                $http.get('/api/problem/getProblemByDate/' + filterDateType)
                .success(function (response) {
                    callback(response);
                })
                .error(function (response) {
                    callback(response);
                })
            },

            changeApprovalStatus: function (approvalStatus, callback) {
                $http.post('/api/problem/changeApprovalStatus', {
                    approvalStatus: approvalStatus
                })
                .success(function (response) {
                    callback(response);
                });
            },

            update: function (problem, callback) {
                $http.post('/api/problem/update', {
                    problem: problem
                })
              .success(function (response) {
                  callback(response);
              })
              .error(function (response) {
                  callback(response);
              })
            },

            deleteProblem: function (problemid, callback) {
                $http.post('/api/problem/delete', {
                    problemid: problemid
                })
                .success(function (response) {
                    callback(response);
                })
                .error(function (response) {
                    callback(response);
                })
            },

            updateFinalFormProblem: function (problem, callback) {
                $http.post('/api/problem/updateFinalFormProblem', {
                    problem: problem
                })
              .success(function (response) {
                  callback(response);
              })
              .error(function (response) {
                  callback(response);
              })
            },

            getUserDraftProblem: function (userId, callback) {
                $http.get('/api/problem/getUserDraftProblems/' + userId)
                .success(function (response) {
                    callback(response);
                })
                .error(function (response) {
                    callback(response)
                });
            },

            getStatusPhaseProblemCount: function (callback)
            {
                $http.get('api/problem/getEachStatusPhaseProblemCount')
                .success(function (response){
                    callback(response);
                })
            },

            //getUserProblems: function (userId, limit, skip, callback) {
            //    $http.get('/api/problem/getUserProblems/' + userId + '/' + limit + '/' + skip)
            //    .success(function (response) {
            //        callback(response);
            //    });
            //},

            getUserAllProblems: function (userId, callback) {
                $http.get('/api/problem/getUserProblems/' + userId)
                .success(function (response) {
                    callback(response);
                });
            },

            createLabel: function (label, callback) {
                $http.post('/api/label/create', {
                    label: label
                })
                .success(function (response) {
                    callback(response);
                })
                .error(function (response) {
                    callback(response);
                });
            },

            addProblemView: function (problem, callback) {
                $http.post('/api/problem/view', {
                    problem: problem
                }).success(function (response) {
                    callback("success");
                }).error(function (response) {
                    callback(response)
                });
            },

            excelExportByProblemId: function (problems, callback) {
                $http.post('/api/excel/getProblemDetailsByIds', {
                    problems: problems
                })
         .success(function (response) {
             callback("success");
         })
        .error(function (response) {
            callback(response);
        })
            }

        };
        return service;
    }

})();