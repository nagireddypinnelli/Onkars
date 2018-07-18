
(function (angular) {
    'use strict';

    /*
     * @ngdoc overview
     * @name AccountEditController
     * @description
     * 
     * Controller for the account module.
     * ====================================
     */

    angular
        .module('id3.account')
        .controller('AccountEditController', AccountEditController);

    AccountEditController.$inject = ['$scope', '$state', 'AccountService', '$timeout', '$window', '$rootScope', '$mdDialog', '$stateParams', 'DomainService'];
    function AccountEditController($scope, $state, AccountService, $timeout, $window, $rootScope, $mdDialog, $stateParams, DomainService) {

        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
             
        $scope.account = {
            name: '',
            domain: ''
        };
      
        AccountService.getAccountById($stateParams.id, function (response) {
            $scope.account = response;
            console.log(response);
        });

        DomainService.getDomainList(function (domain) {
            $scope.domains = domain;
        });

        $scope.updateAccount = function () {
            AccountService.update($scope.account, function (response) {
                $state.go('app.problems');
            });
        }
    }

})(this.angular);