
(function (angular) {
    'use strict';

    /*
     * @ngdoc overview
     * @name ApproachDetailsController
     * @description
     * 
     * Controller for the problem module.
     * ====================================
     */

    angular
        .module('id3.approaches')
        .controller('ApproachDetailsController', ApproachDetailsController);

    ApproachDetailsController.$inject = ['$scope', '$state', 'ApproachService', '$timeout', '$window', '$rootScope', '$mdDialog', '$stateParams'];
    function ApproachDetailsController($scope, $state, ApproachService, $timeout, $window, $rootScope, $mdDialog, $stateParams) {

        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $scope.approach = {
            name: '',
        };

        ApproachService.getApproachById($stateParams.id, function (response) {
            $scope.approach = response;
        });
    }

})(this.angular);