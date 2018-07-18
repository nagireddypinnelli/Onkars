(function(angular) {
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
        .module('id3.account') 
        .controller('AccountListController', AccountListController);
    
    AccountListController.$inject = ['$scope', '$state', 'AccountService', '$timeout', '$window', '$rootScope', '$mdDialog'];
    function AccountListController($scope, $state, AccountService, $timeout, $window, $rootScope, $mdDialog) {
        
		var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
		$scope.reverseSort = false;
		$scope.level = "none";	
			
		AccountService.getAccountList(function(response){
			$scope.accounts = response;
		});	
    }
    
})(this.angular);