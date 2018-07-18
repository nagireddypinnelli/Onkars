(function (angular) {
    'use strict';

    /*
     * @ngdoc overview
     * @name AccountController
     * @description
     * 
     * Controller for the account module.
     * ====================================
     */

    angular
        .module('id3.phase')
        .controller('PhaseListController', PhaseListController);

    PhaseListController.$inject = ['$scope', '$state', 'PhaseService', '$timeout', '$window', '$rootScope', '$mdDialog'];
    function PhaseListController($scope, $state, PhaseService, $timeout, $window, $rootScope, $mdDialog) {
        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $scope.reverseSort = false;
        $scope.level = "none";
        PhaseService.getPhaseList(function (response) {
            $scope.phase = response;
        });
    }
})(this.angular);