(function (angular) {
    'use strict';

    /*
     * @ngdoc overview
     * @name DomainCrateController
     * @description
     * 
     * Controller for the domain module.
     * ====================================
     */

    angular
        .module('id3.domain')
        .controller('DomainCreateController', DomainCreateController);

    DomainCreateController.$inject = ['$scope', '$state', 'DomainService', '$timeout', '$window', '$rootScope', '$mdDialog'];
    function DomainCreateController($scope, $state, DomainService, $timeout, $window, $rootScope, $mdDialog) {
        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');

        $scope.domain = {
            name: '',
        };
        $scope.createDomain = function ()
        {
            DomainService.create($scope.domain, function (response) {
                $state.go('app.domain');
            });
        }

    }

})(this.angular);