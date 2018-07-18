(function () {
    'use strict';

    /*
     * @name AccountService
     * @description
     * 
     * # Service for account module
     * ==========================
     */

    angular
        .module('id3.account')
        .factory('AccountService', AccountService);

    AccountService.$inject = ['$http'];
    function AccountService($http) {
        var service = {
            getAccountList: function getAccountList(callback) {
                $http.get('/api/account/get')
				.success(function (response) {
				    callback(response);
				});
            },

            create: function (account, callback) {
                $http.post('/api/account/create', {
                    account: account
                })
				.success(function (response) {
				    callback("success");
				})
				.error(function (response) {
				    callback(response);
				})
            },

            getAccountById: function (id, callback) {
                $http.get('/api/account/get/' + id)
				.success(function (response) {
				    callback(response);
				});
            },

            update: function (account, callback) {
                $http.post('/api/account/update', {
                    account: account
                })
				.success(function (response) {
				    callback("success");
				})
				.error(function (response) {
				    callback(response);
				})
            },
        };

        return service;
    }

})();