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
        .module('id3.phase')
        .factory('PhaseService', PhaseService);

    PhaseService.$inject = ['$http'];
    function PhaseService($http) {
        var service = {
            getPhaseList: function getPhaseList(callback) {
                $http.get('/api/phase/get')
				.success(function (response) {
				    callback(response);
				});
            },

            create: function (phase, callback) {
                $http.post('/api/phase/create', {
                    phase: phase
                })
				.success(function (response) {
				    callback("success");
				})
				.error(function (response) {
				    callback(response);
				})
            },

            getphaseById: function (id, callback) {
                $http.get('/api/phase/get/' + id)
				.success(function (response) {
				    callback(response);
				});
            },

            update: function (phase, callback) {
                $http.post('/api/phase/update', {
                    phase: phase
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