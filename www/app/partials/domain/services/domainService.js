(function () {
    'use strict';

    /*
     * @name AccountService
     * @description
     * 
     * # Service for Problem module
     * ==========================
     */

    angular
        .module('id3.domain')
        .factory('DomainService', DomainService);

    DomainService.$inject = ['$http'];
    function DomainService($http) {
        var service = {
            getDomainList: function getDomainList(callback) {
                $http.get('/api/domain/get')
				.success(function (response) {
				    callback(response);
				});
            },

            create: function (domain, callback) {
                $http.post('/api/domain/create', {
                    domain: domain
                })
				.success(function (response) {
				    callback("success");
				})
				.error(function (response) {
				    callback(response);
				})
            },

            getdomainById: function (id, callback) {
                $http.get('/api/domain/get/' + id)
				.success(function (response) {
				    callback(response);
				});
            },

            update: function (domain, callback) {
                $http.post('/api/domain/update', {
                    domain: domain
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