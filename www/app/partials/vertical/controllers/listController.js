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
        .controller('VerticalListController', VerticalListController);

    VerticalListController.$inject = ['$scope', '$state', 'VerticalService', '$timeout', '$window', '$rootScope', '$mdDialog'];
    function VerticalListController($scope, $state, VerticalService, $timeout, $window, $rootScope, $mdDialog) {
        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $scope.reverseSort = false;
        $scope.level = "none";
        VerticalService.getVerticalList(function (response) {
            $scope.vertical = response;
        });
    }
})(this.angular);