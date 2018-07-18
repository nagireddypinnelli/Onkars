
(function (angular) {
    'use strict';

    /*
     * @ngdoc overview
     * @name CreateController
     * @description
     * 
     * Controller for the user module.
     * ====================================
     */

    angular
        .module('id3.user')
        .controller('CreateController', CreateController);
    CreateController.$inject = ['$scope', '$state', 'UsersService', '$timeout', '$window', '$rootScope', '$mdDialog'];
    function CreateController($scope, $state, UsersService, $timeout, $window, $rootScope, $mdDialog) {
        $window.scrollTo(0, 0);
        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $scope.reverseSort = false;

        $scope.newuser = {
            name: '',
            account: '',
            username: '',
			contactInfo: '',
            email: '',
			role: ''
        };
        $scope.errorMessage = '';
			
		UsersService.getAccountList(function (response) {
			$scope.accounts = response;
		});

		UsersService.getRoleList(function (response) {
			$scope.roles = response;
		});	
             
        $scope.createUser = function()
        {
            $scope.newuser.username = $scope.newuser.username.toLowerCase();
            var newuser = $scope.newuser;
            $scope.newuser.password = 'password';
            if ($scope.newuser.account == '')
            {
                $scope.newuser.account = null;
            }
            UsersService.create($scope.newuser, function (response) {
                $scope.errorMessage = "";
                if (response == 'success')
                {
                    $scope.newuser = {
                        name: "",
                        account: "",
                        username: "",
                        contactInfo: "",
                        email: "",
                        role: ""
                    };
                    angular.element('#usercreateconfirm').modal('show');
                    //$state.go('app.home');
                }
                else {
                    console.log(response)
                    $scope.errorMessage =  response;
                }
            });
        }

        $scope.hideErrorMesssage = function (field) {
            if (field == 'account') {
                angular.element('#accountSelectBox').children('.error').hide();
            }
            if (field == 'role') {
                angular.element('#roleSelectBox').children('.error').hide();
            }
        }

        $scope.redirectHomepage = function () {
       
            //angular.element("#myUserNav").css('height', '0%');

            //angular.element("body").css('overflow-y', 'visible');

            //angular.element('.wizard .content').hide();

            //angular.element('.wizard>.content').css({ 'width': (($('body').width())) + 'px' });

            //angular.element('.container-content.create-user').css({ 'z-index': '0', 'display': 'none' });
          //  $state.go('app.problems');
            
        }

        $scope.CloseNav = function () {
            angular.element("#myUserNav").css('height', '0%');

            angular.element("body").css('overflow-y', 'visible');

            angular.element("body").css('position', 'static');

            angular.element('.wizard .content').hide();

            angular.element('.wizard>.content').css({ 'width': (($('body').width())) + 'px' });

            angular.element('.container-content.create-user').css({ 'z-index': '0', 'display': 'none' });                         
        }
    }

})(this.angular);