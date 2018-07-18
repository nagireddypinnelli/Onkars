
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
        .module('id3.approaches')
        .controller('ApproachEditController', ApproachEditController);

    ApproachEditController.$inject = ['$scope', '$state', 'ApproachService', '$timeout', '$window', '$rootScope', '$mdDialog', '$stateParams', ];
    function ApproachEditController($scope, $state, ApproachService, $timeout, $window, $rootScope, $mdDialog, $stateParams) {

        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');

        $scope.approach = {
            name: '',
        };

        ApproachService.getApproachById($stateParams.id, function (response) {
            $scope.approach = response;
        });

        $scope.editApproach = function () {
            ApproachService.update($scope.approach, function (response) {
                $state.go('app.approaches');
            });
        }
    }

})(this.angular);