
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
        .controller('PhaseEditController', PhaseEditController);

    PhaseEditController.$inject = ['$scope', '$state', 'PhaseService', '$timeout', '$window', '$rootScope', '$mdDialog', '$stateParams', ];
    function PhaseEditController($scope, $state, PhaseService, $timeout, $window, $rootScope, $mdDialog, $stateParams) {

        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $scope.phase = {
            name: '',
        };

        PhaseService.getphaseById($stateParams.id, function (response) {
            $scope.phase = response;
        });

        $scope.editPhase = function () {
            PhaseService.update($scope.phase, function (response) {
                $state.go('app.phases');
            });
        }
    }

})(this.angular);