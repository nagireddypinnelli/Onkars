(function () {
    'use strict';

    /*
     * @name UsersService
     * @description
     * 
     * # Service for Users module
     * ==========================
     */

    angular
        .module('id3.user')
        .factory('ProfileService', ProfileService);

    ProfileService.$inject = ['$http'];

    function ProfileService($http) {
        var service = {
            addProfile: function (user, callback) {
                $http.post('/api/profile/create', {
                        user: user 
                })
				.success(function (response) {
				    callback("success");
				})
				.error(function (response) {
				    callback(response);
				})
            },
            getAccountList: function getAccountList(callback) {
                $http.get('/api/account/get')
				.success(function (response) {
				    callback(response);
				});
            },
            addFile: function (fileDetails, callback) {
                $http.post('/api/profile/addFiles ', {
                    fileDetails: fileDetails,
                })
                 .success(function (response) {
                     callback(response);
                 }).error(function (error) {
                     callback(error);
                 });
            },
            getProfileDetails: function getProfileDetails(userId, callback) {
                $http.get('/api/users/' + userId)
				.success(function (response) {
				    callback(response);
				});
            },
        }
        return service;
    }
})();

