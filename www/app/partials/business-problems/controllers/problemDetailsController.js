
(function (angular) {
    'use strict';

    /*
     * @ngdoc overview
     * @name ProblemController
     * @description
     * 
     * Controller for the problem module.
     * ====================================
     */

    angular
        .module('id3.problem')
        .controller('ProblemDetailsController', ProblemDetailsController);
    ProblemDetailsController.$inject = ['$scope', '$state', 'ProblemService', '$timeout', '$window', '$rootScope', '$mdDialog', '$stateParams'];
    function ProblemDetailsController($scope, $state, ProblemService, $timeout, $window, $rootScope, $mdDialog, $stateParams) {
        $scope.roleSession = $window.sessionStorage.getItem('roleSession');
        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $window.scrollTo(0, 0);
        $scope.$watch('createTilte', function (newValue, oldValue) {
            if (newValue != undefined) {
                $rootScope.$emit("AssignProblemTitle", newValue);
                // $rootScope.AssignProblemTitle = newValue;
                // $scope.data.title = newValue;
            }
        });
        $scope.loggedInUserID = loggedInUser;
        $window.scrollTo(0, 0);
        $scope.reverseSort = false;
        $scope.level = "none";
        $scope.comment = "";
        $scope.problemdata = {
            title: '',
            problemStatement: '',
            contributors: [""],
            customerStakholders: [
              {
                  name: '',
                  role: ''
              }
            ],
            phase: "",
            category: "",
            account: "",
            domain: "",
            businessImpact: "",
            estimate: "",
            ustShare: "",
            targetBusinessUnit: "",
            geographics: "",
            otherInfo: "",
            assumptions: "",
            customerPains: [{
                tilte: '',
                quantifiedValue: '',
                impactedTask: '',
                customerStakeholders: '',
                role: ''
            }],
            customerGains: [{
                tilte: '',
                quantifiedValue: '',
                impactedTask: '',
                customerStakeholders: '',
                role: ''
            }],
            createdBy: loggedInUser
        };

        $scope.displayFilteroption = true;
        $scope.displayRecent = true;
        $scope.displaytimeline = true;


        if ($(window).width() < 992) {
            $scope.displayFilteroption = false;

            $scope.displayRecent = false;

        }

        $(window).resize(function () {

            if ($(window).width() < 992) {
                if ($(".fixed-menu-left").hasClass("active") == false) {
                    $scope.displayFilteroption = false;
                }

                if ($(".fixed-menu-right").hasClass("active") == false) {
                    $scope.displayRecent = false;
                }
            }
            else {
                $scope.displayFilteroption = true;

                $scope.displayRecent = true;

                $scope.displaytimeline = true;
            }
        });

        var problem = {};
        problem.id = $stateParams.id;
        problem.viewedBy = loggedInUser;
        ProblemService.addProblemView(problem, function (response) {
            ProblemService.getProblemById($stateParams.id, function (response) {
                $scope.problemdata = response;
                ProblemService.getUserList(function (users) {
                    $scope.users = users;
                    angular.forEach($scope.problemdata.contributors, function (problemContributor, key) {
                        angular.forEach(users, function (user, index) {
                            if (user._id == problemContributor) {
                                $scope.problemdata.contributors[key] = user.name;
                            }
                        });
                    });
                    angular.forEach($scope.problemdata.solutionContributors, function (solutionContributors, key) {
                        angular.forEach(users, function (user, index) {
                            if (user._id == solutionContributors) {
                                $scope.problemdata.solutionContributors[key] = user.name;
                            }
                        });
                    });
                    $scope.problemdata.userlikes = [];
                    if ($scope.problemdata.likes.length > 0) {
                        angular.forEach($scope.problemdata.likes, function (like, index) {
                            $scope.problemdata.userlikes.push(like.user._id)
                        });
                    }
                });

            });
        })

        ProblemService.getLabelList(function (labels) {
            $scope.labels = labels;
        });

        ProblemService.getPhaseList(function (phase) {
            $scope.phases = phase;

        });
        $scope.addComment = function (keyEvent) {
            var comment = {};
            comment.createdBy = loggedInUser;
            comment.phase = $scope.problemdata.phase._id;
            comment.comment = $scope.comment;
            comment.id = $scope.problemdata._id;
            ProblemService.addComment(comment, function (response) {
                comment.commnetedDate = new Date();
                comment.commentedBy = {};
                comment.commentedBy.name = $window.sessionStorage.getItem('userName');
                $scope.problemdata.comments.push(comment);
                $scope.comment = "";
            });
        }

        $scope.addlike = function (likedProblem, id, index) {
            var problem = {};
            problem.id = id;
            problem.likedby = loggedInUser;           
            ProblemService.likeProblem(problem, function (response) {
                likedProblem.likes.push(problem);

                if ($scope.problemdata._id == id) {
                    $scope.problemdata.userlikes.push(loggedInUser)
                }

                ProblemService.getRecentProblems(loggedInUser, function (responseRecent) {
                    $scope.recentProblems = responseRecent;
                });
            })
        }

        $rootScope.$on("ReloadProblem", function () {
            $scope.createTilte = "";
        });

        $scope.unlike = function (likedProblem, id, index) {
            var problem = {};
            problem.id = id;
            problem.likedby = loggedInUser;           
            ProblemService.unlikeProblem(problem, function (response) {
                likedProblem.likes.pop(problem);

                if ($scope.problemdata._id == id) {
                    $scope.problemdata.userlikes.pop(loggedInUser)
                }

                ProblemService.getRecentProblems(loggedInUser, function (responseRecent) {
                    $scope.recentProblems = responseRecent;
                });
            })
        }

        $scope.showhidefilteroptions = function () {
            $scope.displayFilteroption = true;

            $scope.displayRecent = false;

            $scope.displaytimeline = false;

            $("body").css('overflow-y', 'hidden');

            $('header, .nav-mob-res-logo ').removeClass('nav-up').addClass('nav-down');

            $('.menu-fixed').removeClass('nav-relative').addClass('nav-static');
        }

        $scope.back = function () {
            window.history.back();
        };


        $scope.showhiderecent = function () {
            $scope.displayRecent = true;

            $scope.displayFilteroption = false;

            $scope.displaytimeline = false;

            $("body").css('overflow-y', 'scroll');
        }

        $scope.showTimeline = function () {
            $scope.displayRecent = false;

            $scope.displayFilteroption = false;

            $scope.displaytimeline = true;

            $("body").css('overflow-y', 'scroll');
        }

        $scope.showScroll = function () {
            $("body").css('overflow-y', 'scroll');
        }

        //ProblemService.getRecentProblems(loggedInUser, function (responseRecent) {
        //    $scope.recentProblems = responseRecent;
        //    var commentsboxheight = angular.element('#row_' + index).height();
        //    if (commentsboxheight == 0) {
        //        angular.element('#row' + index).triggerHandler('click');
        //    }
        //});
    }

})(this.angular);