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
        .module('id3.category')
        .controller('CategoryCreateController', CategoryCreateController);

    CategoryCreateController.$inject = ['$scope', '$state', 'CategoryService', '$timeout', '$window', '$rootScope', '$mdDialog'];
    function CategoryCreateController($scope, $state, CategoryService, $timeout, $window, $rootScope, $mdDialog) {
        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');

        $scope.category = {
            name: '',
        };
        $scope.createCategory = function () {
            CategoryService.create($scope.category, function (response) {
                $state.go('app.categories');
            });
        }
    }

})(this.angular);