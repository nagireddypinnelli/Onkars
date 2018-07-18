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
        .module('id3.domain')
        .controller('StatusListController', StatusListController);

    StatusListController.$inject = ['$scope', '$state', 'StatusService', '$timeout', '$window', '$rootScope', '$mdDialog'];
    function StatusListController($scope, $state, StatusService, $timeout, $window, $rootScope, $mdDialog) {
        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $scope.reverseSort = false;
        $scope.level = "none";
        StatusService.getStatusList(function (response) {
            $scope.status = response;
        });
    }
})(this.angular);