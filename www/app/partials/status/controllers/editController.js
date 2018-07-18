
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
        .module('id3.status')
        .controller('StatusEditController', StatusEditController);

    StatusEditController.$inject = ['$scope', '$state', 'StatusService', '$timeout', '$window', '$rootScope', '$mdDialog', '$stateParams', ];
    function StatusEditController($scope, $state, StatusService, $timeout, $window, $rootScope, $mdDialog, $stateParams) {

        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');

        $scope.status = {
            name: '',
        };

        StatusService.getStatusById($stateParams.id, function (response) {
            $scope.status = response;
        });

        $scope.editStatus = function () {
            StatusService.update($scope.status, function (response) {
                $state.go('app.domain');
            });
        }
    }

})(this.angular);