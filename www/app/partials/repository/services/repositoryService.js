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
        .module('id3.repository')
        .factory('RepositoryService', RepositoryService);

    RepositoryService.$inject = ['$http'];
    function RepositoryService($http) {
        var service = {
            getRepositoryList: function getRepositoryList(callback) {
                $http.get('/api/repository/get')
				.success(function (response) {
			       callback(response);
				});
            },
            create: function (repository, callback) {
                $http.post('/api/repository/create', {
                    repository: repository,
                })
				.success(function (response) {
				    callback(response);
				}).error(function (error) {
                    callback(error);
				});
            },
            createInnerFolder: function (innerFolder, callback) {
                $http.post('/api/repository/createInner', {
                    innerFolder: innerFolder,
                })
				.success(function (response) {
				    callback(response);
				}).error(function (error) {
				    callback(error);
				});
            },
            getRepositoryById: function (id, callback) {
                $http.get('/api/repository/getById/' + id)
				.success(function (response) {
				    callback(response);
				});
            },

            addFile: function (fileDetails, callback) {
               $http.post('/api/repository/addFiles ', {
                    fileDetails: fileDetails,
                })
				.success(function (response) {
				    callback(response);
				}).error(function (error) {
				    callback(error);
				});
            },
            getallRepositoryList: function getRepositoryList(callback) {
                $http.get('/api/repository/getAllRepo')
				.success(function (response) {
				    callback(response);
				});
            },
            addtag: function (tagDetails, callback) {
                $http.post('/api/repository/addtag', {
                    tagDetails: tagDetails,
                })
				.success(function (response) {
				    callback("success");
				}).error(function (error) {
				    callback(error);
				});
            },
            removetag: function (removeTagDetails, callback) {
                $http.post('/api/repository/remove', {
                    removeTagDetails: removeTagDetails,
                })
				.success(function (response) {
				    callback("success");
				}).error(function (error) {
				    callback(error);
				});
            },

            sendmail: function (mailDetails, callback) {
                $http.post('/api/send/email', {
                    mailDetails: mailDetails,
                })
				.success(function (response) {
				    callback("success");
				}).error(function (error) {
				    callback(error);
				});
            },
        };

        return service;
    }

})();