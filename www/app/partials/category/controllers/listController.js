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
        .controller('CategoryListController', CategoryListController);
                                                  
    CategoryListController.$inject = ['$scope', '$state', 'CategoryService', '$timeout', '$window', '$rootScope', '$mdDialog'];
    function CategoryListController($scope, $state, CategoryService, $timeout, $window, $rootScope, $mdDialog) {
        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $scope.reverseSort = false;
        $scope.level = "none";

        CategoryService.getCategoryList(function (response) {
            $scope.categories = response;

        });
    }
})(this.angular);