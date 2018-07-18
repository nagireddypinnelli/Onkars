(function (angular) {
    'use strict';

    /*
     * @ngdoc overview
     * @name DomainListController
     * @description
     * 
     * Controller for the domain module.
     * ====================================
     */

    angular
        .module('id3.domain')
        .controller('DomainListController', DomainListController);

    DomainListController.$inject = ['$scope', '$state', 'DomainService', '$timeout', '$window', '$rootScope', '$mdDialog'];
    function DomainListController($scope, $state, DomainService, $timeout, $window, $rootScope, $mdDialog) {
        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $scope.reverseSort = false;
        $scope.level = "none";

        DomainService.getDomainList(function (response) {
            $scope.domains = response;
        });
    }
})(this.angular);