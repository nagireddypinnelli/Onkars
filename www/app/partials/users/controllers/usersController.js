(function () {
    'use strict';

    /*
     * @ngdoc overview
     * @name UserController
     * @description
     * 
     * Controller for the users module.
     * ===============================
     */

    angular
        .module('id3.user')
        .controller('UserController', UserController);

    UserController.$inject = ['UsersService', '$scope', '$window', '$rootScope', 'spinner'];

    function UserController(UsersService, $scope, $window, $rootScope, spinner) {
        $window.scrollTo(0, 0);
        UsersService.getUserList(function (response) {
            $scope.users = response;
        });

        $scope.currentPage = 1;
        $scope.pageSize = 10;

        $scope.pageChangeHandler = function (num) {
            console.log('going to page ' + num);
        };
    }
})();