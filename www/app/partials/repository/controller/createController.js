
(function (angular) {
    'use strict';

    /*
     * @ngdoc overview
     * @name AccountCreateController
     * @description
     * 
     * Controller for the account module.
     * ====================================
     */

    angular
        .module('id3.repository')
        .controller('RepositoryController', RepositoryController);

    RepositoryController.$inject = ['$scope', '$state', '$timeout', '$window', '$rootScope', '$mdDialog', 'DomainService', 'RepositoryService'];
    function RepositoryController($scope, $state, $timeout, $window, $rootScope, $mdDialog, DomainService, RepositoryService) {

        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $rootScope.filename = $window.sessionStorage.getItem('filename');
        $scope.showfolder = false;
        RepositoryService.getRepositoryList(function (response) {
            $scope.repository = response;
         });

        $scope.fodernames = [];

        $scope.create = function () {
            $scope.folderDetails = {
                folderName: $scope.repositoryName,
                tag: "search",
                ismainFolder :true
            };
           
            RepositoryService.create($scope.folderDetails, function (response) {
                if (response.err) {
                    $scope.showError = true;
                    $rootScope.errmessage = response.err.errors;
                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'app/partials/repository/templates/modal.html',
                        parent: angular.element(document.body),
                        //targetEvent: ev,
                        clickOutsideToClose: true
                    });

                 
                } else {
                        $scope.showError = false;
                        $scope.showfolder = response.ismainFolder;
                        var folderName = {
                        folderName: response.folderName,
                        ismainFolder: response.ismainFolder,
                        _id: response._id
                    };
                        $scope.fodernames.push(folderName);
                    }
            });
        }

        function DialogController($scope, $mdDialog) {
            $scope.error = $rootScope.errmessage.folderName.message;
            $scope.hide = function () {
                $mdDialog.hide();
            };
        }

    }

})(this.angular);