
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
        .controller('StatusDetailsController', StatusDetailsController);

    StatusDetailsController.$inject = ['$scope', '$state', 'StatusService', '$timeout', '$window', '$rootScope', '$mdDialog', '$stateParams'];
    function StatusDetailsController($scope, $state, StatusService, $timeout, $window, $rootScope, $mdDialog, $stateParams) {

        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $scope.status = {
            name: '',
        };

        StatusService.getstatusById($stateParams.id, function (response) {
            $scope.status = response;
        });
    }

})(this.angular);