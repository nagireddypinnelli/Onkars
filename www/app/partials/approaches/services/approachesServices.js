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
        .module('id3.approaches')
        .factory('ApproachService', ApproachService);

    ApproachService.$inject = ['$http'];
    function ApproachService($http) {
        var service = {
            getapproachList: function (callback) {
                $http.get('/api/approach/get')
				.success(function (response) {
				    callback(response);
				});
            },

            create: function (approach, callback) {
                $http.post('/api/approach/create', {
                    approach: approach
                })
				.success(function (response) {
				    callback("success");
				})
				.error(function (response) {
				    callback(response);
				})
            },

            getApproachById: function (id, callback) {
                $http.get('/api/approach/get/' + id)
				.success(function (response) {
				    callback(response);
				});
            },

            update: function (approach, callback) {
                $http.post('/api/approach/update', {
                    approach: approach
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