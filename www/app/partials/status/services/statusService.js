(function () {
    'use strict';

    /*
     * @name PhaseService
     * @description
     * 
     * # Service for Phase module
     * ==========================
     */

    angular
        .module('id3.status')
        .factory('StatusService', StatusService);

    StatusService.$inject = ['$http'];
    function StatusService($http) {
        var service = {
            getStatusList: function(callback) {
                $http.get('/api/status/get')
				.success(function (response) {
				    callback(response);
				});
            },

            create: function (status, callback) {
                $http.post('/api/status/create', {
                    status: status
                })
				.success(function (response) {
				    callback("success");
				})
				.error(function (response) {
				    callback(response);
				})
            },

            getStatusById: function (id, callback) {
                $http.get('/api/status/get/' + id)
				.success(function (response) {
				    callback(response);
				});
            },

            update: function (status, callback) {
                $http.post('/api/status/update', {
                    status: status
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