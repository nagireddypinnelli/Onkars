(function () {
    'use strict';

    /*
     * @name VerticalService
     * @description
     * 
     * # Service for vertical module
     * ==========================
     */

    angular
        .module('id3.vertical')
        .factory('VerticalService', VerticalService);

    VerticalService.$inject = ['$http'];
    function VerticalService($http) {
        var service = {
            getVerticalList: function (callback) {
                $http.get('/api/vertical/get')
				.success(function (response) {
				    callback(response);
				});
            },

            create: function (vertical, callback) {
                $http.post('/api/vertical/create', {
                    vertical: vertical
                })
				.success(function (response) {
				    callback("success");
				})
				.error(function (response) {
				    callback(response);
				})
            },

            getVerticalById: function (id, callback) {
                $http.get('/api/vertical/get/' + id)
				.success(function (response) {
				    callback(response);
				});
            },

            update: function (vertical, callback) {
                $http.post('/api/vertical/update', {
                    vertical: vertical
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