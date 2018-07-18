
(function (angular) {
    'use strict';

    /*
     * @ngdoc overview
     * @name AccountDetailsController
     * @description
     * 
     * Controller for the account module.
     * ====================================
     */

    angular
        .module('id3.account')
        .controller('AccountDetailsController', AccountDetailsController);

    AccountDetailsController.$inject = ['$scope', '$state', 'AccountService', '$timeout', '$window', '$rootScope', '$mdDialog', '$stateParams'];
    function AccountDetailsController($scope, $state, AccountService, $timeout, $window, $rootScope, $mdDialog, $stateParams) {

        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');

        $scope.account = {
            name: '',
            domain: ''
        };

        AccountService.getAccountById($stateParams.id, function (response) {
            $scope.account = response;
        });
    }

})(this.angular);