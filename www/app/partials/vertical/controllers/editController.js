
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
        .module('id3.vertical')
        .controller('VerticalEditController', VerticalEditController);

    VerticalEditController.$inject = ['$scope', '$state', 'VerticalService', '$timeout', '$window', '$rootScope', '$mdDialog', '$stateParams', ];
    function VerticalEditController($scope, $state, VerticalService, $timeout, $window, $rootScope, $mdDialog, $stateParams) {

        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');

        $scope.vertical = {
            name: '',
        };

        VerticalService.getVerticalById($stateParams.id, function (response) {
            $scope.vertical = response;
        });

        $scope.editVertical = function () {
            VerticalService.update($scope.vertical, function (response) {
                $state.go('app.vertical');
            });
        }
    }

})(this.angular);