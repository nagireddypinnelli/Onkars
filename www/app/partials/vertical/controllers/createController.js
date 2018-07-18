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
        .module('id3.vertical')
        .controller('VerticalCreateController', VerticalCreateController);

    VerticalCreateController.$inject = ['$scope', '$state', 'VerticalService', '$timeout', '$window', '$rootScope', '$mdDialog'];
    function VerticalCreateController($scope, $state, VerticalService, $timeout, $window, $rootScope, $mdDialog) {
        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');

        $scope.vertical = {
            name: '',
        };

        $scope.createVertical = function () {
            VerticalService.create($scope.vertical, function (response) {
                $state.go('app.vertical');
            });
        }

    }

})(this.angular);