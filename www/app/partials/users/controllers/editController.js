
(function (angular) {
    'use strict';

    /*
     * @ngdoc overview
     * @name EditController
     * @description
     * 
     * Controller for the user module.
     * ====================================
     */

    angular
        .module('id3.user')
        .controller('UserEditController', UserEditController);
    UserEditController.$inject = ['$scope', '$state', 'UsersService', '$timeout', '$window', '$rootScope', '$mdDialog', '$stateParams'];
    function UserEditController($scope, $state, UsersService, $timeout, $window, $rootScope, $mdDialog, $stateParams) {
        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $window.scrollTo(0, 0);
        $scope.reverseSort = false;
        $scope.user = {
            name: '',
            account: '',
            username: '',
            contactInfo: '',
            email: '',
            role: ''
        };

        UsersService.getAccountList(function (response){
            $scope.accounts = response;
        });
		
		UsersService.getRoleList(function (response) {
			$scope.roles = response;
		});

        $scope.updateUserDetails = function () {
            var user = $scope.user;
            UsersService.updateUser(user, function (response) {
                $state.go('app.users');
            });
        }

        UsersService.getUserById($stateParams.id, function (response) {
            $scope.user = response;
        });
    }

})(this.angular);