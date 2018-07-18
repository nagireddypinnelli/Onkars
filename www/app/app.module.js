(function() {
    'use strict';
    angular.module('id3', [

        /**
         * @ngdoc overview

         * @name id3
         * @description
         * # id3
         *
         * Main module of the application.
         * ===============================
         */
        'id3.home',
        'id3.insight',
        'id3.problem',
		'id3.account',
        'id3.domain',
        'id3.user',
		'id3.login',
        'id3.spinner',
        'id3.status',
        'id3.vertical',
        'id3.phase',
        'id3.modules',
        'id3.repository',
        //'id3.category',
        /*
         * Components
         */
        'EdgeNavbar',
        'EdgeTreeView',
        'ContextMenu',

        /*
         * dependencies
         */

        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'ngMaterial',
        'ngMessages',
		'ngFileUpload',
        'angularTreeview',
		'angularUtils.directives.dirPagination',
        'angularSlideables',
        'localytics.directives',
		'infinite-scroll'

    ])
      .config(function ($httpProvider, $windowProvider) {          
          var $window = $windowProvider.$get();
          if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};    
          } 
          $httpProvider.defaults.cache = false;
          $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
          $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
          $httpProvider.interceptors.push(function ($q, $injector, $log) {
              var $rootScope = $injector.get('$rootScope');
              return {
                  responseError: function (rejection) {
                      
                      if (rejection.status === 401) {
                          var $state = $injector.get('$state');

                          $state.go('app.login');
                      }
                      return $q.reject(rejection);
                  },
                  request: function (config) {
                      config.headers['x-access-token'] = $window.sessionStorage.getItem('access-token');
                      
                      return config;
                  },
                  response: function (response) {
                      var token = response.config.headers["x-access-token"];
                      if (token !== undefined && token !== null) {
                          $window.sessionStorage.setItem('access-token', token);
                      }
                      return response;
                  }
              };
          });
      });

})();
