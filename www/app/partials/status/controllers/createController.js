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
        .module('id3.status')
        .controller('StatusCreateController', StatusCreateController);

    StatusCreateController.$inject = ['$scope', '$state', 'StatusService', '$timeout', '$window', '$rootScope', '$mdDialog'];
    function StatusCreateController($scope, $state, StatusService, $timeout, $window, $rootScope, $mdDialog) {
        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $scope.status = {
            name: '',
        };

        $scope.createStatus = function () {
            StatusService.create($scope.status, function (response) {
                $state.go('app.status');
            });
        }

    }

})(this.angular);