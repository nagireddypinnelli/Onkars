(function () {
    'use strict';

    /*
     * @name spinner
     * @description
     * id3.spinner
     * # Service for spinner
     * ==========================
     */

    angular
        .module('id3.spinner')
        .factory('spinner', spinner)

    function spinner($rootScope) {
        var service = {
            show: function () {
                $rootScope.spinnerStatus = true;
            },
            hide: function () {
                $rootScope.spinnerStatus = false;
            }
        };

        return service;
    }

})();