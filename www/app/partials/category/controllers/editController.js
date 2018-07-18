
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
        .controller('CategoryEditController', CategoryEditController);

    CategoryEditController.$inject = ['$scope', '$state', 'CategoryService', '$timeout', '$window', '$rootScope', '$mdDialog', '$stateParams', ];
    function CategoryEditController($scope, $state, CategoryService, $timeout, $window, $rootScope, $mdDialog, $stateParams) {

        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');

        $scope.category = {
            name: '',
        };

        CategoryService.getCategoryById($stateParams.id, function (response) {
            $scope.category = response;
        });

        $scope.editCategory = function () {
            CategoryService.update($scope.category, function (response) {
                $state.go('app.categories');
            });
        }
    }

})(this.angular);