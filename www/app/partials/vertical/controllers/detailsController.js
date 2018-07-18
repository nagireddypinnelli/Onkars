
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
        .controller('VerticalDetailsController', VerticalDetailsController);

    VerticalDetailsController.$inject = ['$scope', '$state', 'VerticalService', '$timeout', '$window', '$rootScope', '$mdDialog', '$stateParams'];
    function VerticalDetailsController($scope, $state, VerticalService, $timeout, $window, $rootScope, $mdDialog, $stateParams) {

        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $scope.domain = {
            name: '',
        };

        VerticalService.getVerticlById($stateParams.id, function (response) {
            $scope.vertical = response;
        });
    }

})(this.angular);