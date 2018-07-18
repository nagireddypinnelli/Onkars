(function () {
    'use strict';

    /*
     * @ngdoc overview
     * @name HomeController
     * @description
     * 
     * Controller for the home module.
     * ===============================
     */

    angular
        .module('id3.home')
        .controller('HomeController', HomeController);
    HomeController.$inject = ['$scope', '$state', '$timeout', '$window', '$rootScope', '$mdDialog', 'Upload'];
    function HomeController($scope, $state, $timeout, $window, $rootScope, $mdDialog, Upload) {
        $window.scrollTo(0, 0);
        $scope.loggedInUser = null;
        $scope.loginErrorMessage = "";
        $scope.loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        var username = $window.sessionStorage.getItem('userName');
        $scope.role = $window.sessionStorage.getItem('roleSession');
        $scope.displayHomeNavOption = 1;
        $("body").css('overflow-y', 'scroll');
        if ($window.sessionStorage.getItem('homepage') == 'true') {
            $window.sessionStorage.setItem('homepage', 'false');

            if ($window.sessionStorage.getItem('loggedInUserSession') != undefined || $window.sessionStorage.getItem('loggedInUserSession') != 'null') {

                if ($window.sessionStorage.getItem('roleSession') == "" || $window.sessionStorage.getItem('roleSession') == 'null') {
                    $scope.loginErrorMessage = "Hi " + username + ", You are not an Authorized person !"
                    $window.sessionStorage.setItem('roleSession', null);
                    $window.sessionStorage.setItem('access-token', null);
                    $window.sessionStorage.setItem('loggedInUserSession', null);
                }
                else {
                    $state.go('app.problems');
                }
            }

            else {

                $scope.loggedInUser = null;
            }
        }


        if ($window.sessionStorage.getItem('loggedInUserSession') != undefined || $window.sessionStorage.getItem('loggedInUserSession') != 'null') {
            $scope.loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');

            if ($window.sessionStorage.getItem('loggedInUserSession') == 'null')
            {
                $scope.loggedInUser = null;
            }
        }

        $scope.logout = function () {
            $rootScope.loggedInUserSession = null;
            $rootScope.levelSession = null;
            $rootScope.roleSession = null;
            $rootScope.userName = "";
            $scope.loggedInUser = null;
            $rootScope.$broadcast('refresh-highlight-menu');
            $window.sessionStorage["roleSession"] = null;
            $window.sessionStorage.setItem('roleSession', null);
            $window.sessionStorage.setItem('access-token', null);
            $window.sessionStorage.setItem('loggedInUserSession', null);
            $window.sessionStorage.getItem('userName', null);
            $window.sessionStorage.setItem('homepage', 'false');
        }


        if ($(window).width() < 992) {
            $scope.displayHomeNavOption = 0;
        }

        $scope.hideNavoptions1 = function () {         
            $scope.displayHomeNavOption = (!$scope.displayHomeNavOption)
        }
      
        $(window).resize(function () {
            if ($(window).width() < 992) {
                $scope.displayHomeNavOption = 0;
            }
            else {
                $scope.displayHomeNavOption = 1;
            }
        });
        var vm = this;
        vm.test = 'test';
    }
})();