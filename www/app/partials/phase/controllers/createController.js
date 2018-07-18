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
        .controller('PhaseCreateController', PhaseCreateController);

    PhaseCreateController.$inject = ['$scope', '$state', 'PhaseService', '$timeout', '$window', '$rootScope', '$mdDialog'];
    function PhaseCreateController($scope, $state, PhaseService, $timeout, $window, $rootScope, $mdDialog) {
        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $scope.phase = {
            name: '',
        };

        $scope.createPhase = function () {
            PhaseService.create($scope.phase, function (response) {
                $state.go('app.phases');
            });
        }
    }

})(this.angular);