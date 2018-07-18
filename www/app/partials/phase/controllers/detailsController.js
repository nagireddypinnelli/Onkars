
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
        .module('id3.phase')
        .controller('PhaseDetailsController', PhaseDetailsController);
    PhaseDetailsController.$inject = ['$scope', '$state', 'PhaseService', '$timeout', '$window', '$rootScope', '$mdDialog', '$stateParams'];
    function PhaseDetailsController($scope, $state, PhaseService, $timeout, $window, $rootScope, $mdDialog, $stateParams) {

        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $scope.phase = {
            name: '',
        };

        PhaseService.getPhaseById($stateParams.id, function (response) {
            $scope.phase = response;
        });
    }

})(this.angular);