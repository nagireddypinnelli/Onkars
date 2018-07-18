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
        .module('id3.category')
        .factory('CategoryService', CategoryService);

    CategoryService.$inject = ['$http'];
    function CategoryService($http) {
        var service = {
            getCategoryList: function (callback) {
                $http.get('/api/category/get')
				.success(function (response) {
				    callback(response);
				});
            },

            create: function (category, callback) {
                $http.post('/api/category/create', {
                    category: category
                })
				.success(function (response) {
				    callback("success");
				})
				.error(function (response) {
				    callback(response);
				})
            },

            getCategoryById: function (id, callback) {
                $http.get('/api/category/get/' + id)
				.success(function (response) {
				    callback(response);
				});
            },

            update: function (category, callback) {
                $http.post('/api/category/update', {
                    category: category
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