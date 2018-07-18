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
        .controller('ProblemDraftController', ProblemDraftController);
    ProblemDraftController.$inject = ['$scope', '$state', 'ProblemService', '$timeout', '$window', '$rootScope', '$mdDialog', '$stateParams'];
    function ProblemDraftController($scope, $state, ProblemService, $timeout, $window, $rootScope, $mdDialog, $stateParams) {
        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $scope.loggedInUserID = loggedInUser;
        $scope.roleSession = $window.sessionStorage.getItem('roleSession');
        $scope.problemList = [];
        $window.scrollTo(0, 0);
        $scope.displayFilteroption = true;
        $scope.displayRecent = true;
        $scope.displaytimeline = true;
        $scope.userDetils = {};

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

        $scope.$watch('createTilte', function (newValue, oldValue) {
            if (newValue != undefined) {
                $rootScope.$emit("AssignProblemTitle", newValue);
                // $rootScope.AssignProblemTitle = newValue;
                // $scope.data.title = newValue;
            }
        });

        $scope.updateDraftProblem = function(problemId)
        {
            openNav();
            $rootScope.$emit("updateDraftProblem", problemId)
        }

        $rootScope.$on("getDraftProblem", function () {
            ProblemService.getUserDraftProblem(loggedInUser, function (problemlist) {
                $scope.problems = problemlist;
            });
        });


        if ($window.sessionStorage.getItem('loggedInUserSession') == 'null' || $window.sessionStorage.getItem('loggedInUserSession') == null) {
            $state.go('app.home')
        }
        ProblemService.getUserDraftProblem(loggedInUser, function (problemlist) {
            $scope.problems = problemlist;
        });

        ProblemService.getRecentProblems(loggedInUser, function (response) {
            $scope.recentProblems = response;
        });

        ProblemService.getUserById($stateParams.id, function (response) {
            $scope.userDetils = response;
        });

        $scope.showhidefilteroptions = function () {
            $scope.displayFilteroption = true;

            $scope.displayRecent = false;

            $scope.displaytimeline = false;

            $("body").css('overflow-y', 'hidden');

            $('header, .nav-mob-res-logo ').removeClass('nav-up').addClass('nav-down');

            $('.menu-fixed').removeClass('nav-relative').addClass('nav-static');
        }

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
    }




})(this.angular);