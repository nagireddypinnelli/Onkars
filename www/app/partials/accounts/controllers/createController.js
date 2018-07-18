
(function (angular) {
    'use strict';

    /*
     * @ngdoc overview
     * @name AccountCreateController
     * @description
     * 
     * Controller for the account module.
     * ====================================
     */

    angular
        .module('id3.account')
        .controller('AccountCreateController', AccountCreateController);

    AccountCreateController.$inject = ['$scope', '$state', 'AccountService', '$timeout', '$window', '$rootScope', '$mdDialog', 'DomainService'];
    function AccountCreateController($scope, $state, AccountService, $timeout, $window, $rootScope, $mdDialog, DomainService) {

        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $scope.reverseSort = false;
        $scope.domains = "";
        $scope.account = {
            name: '',
            domain: ''
        };

        DomainService.getDomainList(function (domains) {
           $scope.domains = domains;
        });

        $scope.createAccount = function()
        {
            AccountService.create($scope.account ,function (response) {
                $state.go('app.accounts');
            });
        }

    }

})(this.angular);