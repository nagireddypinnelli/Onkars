(function (angular) {
    'use strict';

    /*
     * @ngdoc overview
     * @name ApproachCreateController
     * @description
     * 
     * Controller for the approaches module.
     * ====================================
     */

    angular
        .module('id3.approaches')
        .controller('ApproachCreateController', ApproachCreateController);

    ApproachCreateController.$inject = ['$scope', '$state', 'ApproachService', '$timeout', '$window', '$rootScope', '$mdDialog'];
    function ApproachCreateController($scope, $state, ApproachService, $timeout, $window, $rootScope, $mdDialog) {
        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');

        $scope.approach = {
            name: '',
        };
        $scope.createApproach = function () {
            ApproachService.create($scope.approach, function (response) {
                $state.go('app.approaches');
            });
        }
    }

})(this.angular);