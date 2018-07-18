
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
        .module('id3.category')
        .controller('CategoryDetailsController', CategoryDetailsController);

    CategoryDetailsController.$inject = ['$scope', '$state', 'CategoryService', '$timeout', '$window', '$rootScope', '$mdDialog', '$stateParams'];
    function CategoryDetailsController($scope, $state, CategoryService, $timeout, $window, $rootScope, $mdDialog, $stateParams) {

        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $scope.category = {
            name: '',
        };

        CategoryService.getCategoryById($stateParams.id, function (response) {
            $scope.category = response;
        });
    }

})(this.angular);