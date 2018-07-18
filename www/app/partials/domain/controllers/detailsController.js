
(function (angular) {
    'use strict';

    /*
     * @ngdoc overview
     * @name DomainDetailsController
     * @description
     * 
     * Controller for the domain module.
     * ====================================
     */

    angular
        .module('id3.domain')
        .controller('DomainDetailsController', DomainDetailsController);

    DomainDetailsController.$inject = ['$scope', '$state', 'DomainService', '$timeout', '$window', '$rootScope', '$mdDialog', '$stateParams'];
    function DomainDetailsController($scope, $state, DomainService, $timeout, $window, $rootScope, $mdDialog, $stateParams) {

        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $scope.domain = {
            name: '',
        };

        DomainService.getDomainById($stateParams.id, function (response) {
            $scope.domain = response;
        });
    }

})(this.angular);