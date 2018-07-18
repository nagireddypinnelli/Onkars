/*
 * Configures the UI-Router states and their 
 * associated URL routes and views
 */
(function (angular) {
    angular
        .module('id3')

    /** 
     * Main Routing of application
     * ===========================
     */

    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$windowProvider', configureStates]);
    ///////////////////////////////////////

    function configureStates($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $window) {
        // otherwise state and redirecting to home
        $urlRouterProvider.otherwise('/home');

        console.log($urlRouterProvider);
        //alert($window.sessionStorage.getItem('loggedInUserSession'));
        // specific routing to url's and respective views
        $stateProvider
            .state('app', {
                views: {
                    "main": {
                        templateUrl: 'app/partials/main/mainView.html',

                    },
                    "main@app": {
                        templateUrl: 'app/partials/main/templates/main.html',
                    }
                },
                //resolve: {
                //    authCheck: function ($rootScope, $location) {
                //        if ($rootScope.loggedInUserSession == "" || $rootScope.loggedInUserSession == null || $rootScope.loggedInUserSession == 'undefined') {
                //            $location.path('/home');
                //        }
                //    }
                //}
            })
             .state('app.home1', {
                 url: '',
                 views: {
                     "content": {
                         templateUrl: 'app/partials/home/homeView.html',
                         controller: 'HomeController'
                     }
                 },
             })

            .state('app.users', {
                url: '/users',
                views: {
                    "content": {
                        templateUrl: 'app/partials/users/templates/users-list.html',
                        controller: 'UserController'
                    }
                },
                resolve: {
                    authCheck: function ($rootScope, $location) {
                        if ($rootScope.loggedInUserSession == "" || $rootScope.loggedInUserSession == null || $rootScope.loggedInUserSession == 'undefined') {
                            $location.path('/login');
                        }
                    }
                }
            })
            .state('app.user/create', {
                url: '/users/create',
                views: {
                    'content': {
                        templateUrl: 'app/partials/users/templates/create.html',
                        controller: 'CreateController',
                    }
                },

            })
            .state('app.manage', {
                url: '/users/manage',
                views: {
                    'content': {
                        templateUrl: 'app/partials/users/templates/manage.html',
                        controller: 'ManageController',
                    }
                },

            })
       .state('app.users/update/:id', {
           url: '/users/update/:id',
           views: {
               'content': {
                   templateUrl: 'app/partials/users/templates/edit.html',
                   controller: 'UserEditController',
               }
           },
           resolve: {
               authCheck: function ($rootScope, $location) {
                   if ($rootScope.loggedInUserSession == "" || $rootScope.loggedInUserSession == null || $rootScope.loggedInUserSession == 'undefined') {
                       $location.path('/login');
                   }
               }
           }
       }).state('app.repository/manage', {
           url: '/repository/manage',
           views: {
               'content': {
                   templateUrl: 'app/partials/repository/templates/createMain.html',
                   controller: 'RepositoryController',
               }
           },

        }).state('app.repository/innerFolder/:id', {
           url: '/repository/innerFolder/:id',
           views: {
               'content': {
                   templateUrl: 'app/partials/repository/templates/innerFolder.html',
                   controller: 'InnerRepositoryController',
               } 
           },
        }).state('app.allrepository', {
            url: '/allrepository', 
                views: {
                    'content': {
                        templateUrl: 'app/partials/repository/templates/allrepository.html',
                        controller: 'RepositoryController',
                    }
                },
        }).state('app.allrepository/allRepoinnerFolder/:id', {
            url: '/allrepository/allRepoinnerFolder/:id',
            views: {
                'content': {
                    templateUrl: 'app/partials/repository/templates/allrepositoryInner.html',
                    controller: 'InnerRepositoryController',
                }
            },
        }).state('app.profile/myprofile', {
            url: '/profile/myprofile',
            views: {
                'content': {
                    templateUrl: 'app/partials/profile/template/profile.html',
                    controller: 'profileController',
                }
            },

        }).state('app.accounts', {
                url: '/accounts',
                views: {
                    "content": {
                        templateUrl: 'app/partials/accounts/templates/accounts-list.html',
                        controller: 'AccountListController'
                    },
                    "list@app.problems": {
                        templateUrl: 'app/partials/accounts/templates/accounts-list.html',
                        controller: 'AccountListController'
                    }
                },
                resolve: {
                    authCheck: function ($rootScope, $location) {
                        if ($rootScope.loggedInUserSession == "" || $rootScope.loggedInUserSession == null || $rootScope.loggedInUserSession == 'undefined') {
                            $location.path('/login');
                        }
                    }
                }
            })
        .state('app.account/create', {
            url: '/account/create',
            views: {
                'content': {
                    templateUrl: 'app/partials/accounts/templates/create.html',
                    controller: 'AccountCreateController',
                }
            },
            resolve: {
                authCheck: function ($rootScope, $location) {
                    if ($rootScope.loggedInUserSession == "" || $rootScope.loggedInUserSession == null || $rootScope.loggedInUserSession == 'undefined') {
                        $location.path('/login');
                    }
                }
            }
        })
		.state('app.account/update/:id', {
		    url: '/account/update/:id',
		    views: {
		        'content': {
		            templateUrl: 'app/partials/accounts/templates/edit.html',
		            controller: 'AccountEditController',
		        }
		    },
		    resolve: {
		        authCheck: function ($rootScope, $location) {
		            if ($rootScope.loggedInUserSession == "" || $rootScope.loggedInUserSession == null || $rootScope.loggedInUserSession == 'undefined') {
		                $location.path('/login');
		            }
		        }
		    }
		}).state('app.problems', {
		    url: '/problems',
		    views: {
		        "content": {
		            templateUrl: 'app/partials/business-problems/templates/problems-list.html',
		            controller: 'ProblemController'
		        },
		        "list@app.problems": {
		            templateUrl: 'app/partials/business-problems/templates/problems-list.html',
		            controller: 'ProblemController'
		        }
		    }
		}).state('app.draftProblem/:id', {
		    url: '/draftProblem/:id',
		    views: {
		        "content": {
		            templateUrl: 'app/partials/business-problems/templates/problem-draft.html',
		            controller: 'ProblemDraftController'
		        }
		    }
		}).state('app.problems/:uId', {
		    url: '/problems/:uId',
		    views: {
		        "content": {
		            templateUrl: 'app/partials/business-problems/templates/problems-list.html',
		            controller: 'ProblemController'
		        },
		        "list@app.problems": {
		            templateUrl: 'app/partials/business-problems/templates/problems-list.html',
		            controller: 'ProblemController'
		        }
		    }
		}).state('app.problem/create', {
		    url: '/problem/create',
		    views: {
		        'content': {
		            templateUrl: 'app/partials/business-problems/templates/create.html',
		            controller: 'ProblemCreateController',
		        }
		    }
		}).state('app.problem/MyProblem/:id', {
		    url: '/problem/MyProblem/:id',
		    views: {
		        'content': {
		            templateUrl: 'app/partials/business-problems/templates/myBusinessProblem.html',
		            controller: 'MyBusinessProblemController',
		        }
		    }
		}).state('app.problem/update/:id', {
		    url: '/problem/update/:id',
		    views: {
		        'content': {
		            templateUrl: 'app/partials/business-problems/templates/edit.html',
		            controller: 'ProblemEditController',
		        }
		    }
		}).state('app.modules', {
		    url: '/modules',
		    views: {
		        'content': {
		            templateUrl: 'app/partials/Modules/templates/modules.html',
		            controller: 'ModulesController',
		        }
		    }
		}).state('app.categories', {
		    url: '/categories',
		    views: {
		        "content": {
		            templateUrl: 'app/partials/category/templates/category-list.html',
		            controller: 'CategoryListController'
		        }
		    },
		    resolve: {
		        authCheck: function ($rootScope, $location) {
		            if ($rootScope.loggedInUserSession == "" || $rootScope.loggedInUserSession == null || $rootScope.loggedInUserSession == 'undefined') {
		                $location.path('/login');
		            }
		        }
		    }
		}).state('app.category/create', {
		    url: '/category/create',
		    views: {
		        'content': {
		            templateUrl: 'app/partials/category/templates/create.html',
		            controller: 'CategoryCreateController',
		        }
		    },
		    resolve: {
		        authCheck: function ($rootScope, $location) {
		            if ($rootScope.loggedInUserSession == "" || $rootScope.loggedInUserSession == null || $rootScope.loggedInUserSession == 'undefined') {
		                $location.path('/login');
		            }
		        }
		    }
		}).state('app.category/update/:id', {
		    url: '/category/update/:id',
		    views: {
		        'content': {
		            templateUrl: 'app/partials/category/templates/edit.html',
		            controller: 'CategoryEditController',
		        }
		    },
		    resolve: {
		        authCheck: function ($rootScope, $location) {
		            if ($rootScope.loggedInUserSession == "" || $rootScope.loggedInUserSession == null || $rootScope.loggedInUserSession == 'undefined') {
		                $location.path('/login');
		            }
		        }
		    }
		}).state('app.phases', {
		    url: '/category',
		    views: {
		        "content": {
		            templateUrl: 'app/partials/phase/templates/phase-list.html',
		            controller: 'PhaseListController'
		        }
		    },
		    resolve: {
		        authCheck: function ($rootScope, $location) {
		            if ($rootScope.loggedInUserSession == "" || $rootScope.loggedInUserSession == null || $rootScope.loggedInUserSession == 'undefined') {
		                $location.path('/login');
		            }
		        }
		    }
		}).state('app.phase/create', {
		    url: '/phase/create',
		    views: {
		        'content': {
		            templateUrl: 'app/partials/phase/templates/create.html',
		            controller: 'PhaseCreateController',
		        }
		    },
		    resolve: {
		        authCheck: function ($rootScope, $location) {
		            if ($rootScope.loggedInUserSession == "" || $rootScope.loggedInUserSession == null || $rootScope.loggedInUserSession == 'undefined') {
		                $location.path('/login');
		            }
		        }
		    }
		}).state('app.phase/update/:id', {
		    url: '/phase/update/:id',
		    views: {
		        'content': {
		            templateUrl: 'app/partials/phase/templates/edit.html',
		            controller: 'PhaseEditController',
		        }
		    },
		    resolve: {
		        authCheck: function ($rootScope, $location) {
		            if ($rootScope.loggedInUserSession == "" || $rootScope.loggedInUserSession == null || $rootScope.loggedInUserSession == 'undefined') {
		                $location.path('/login');
		            }
		        }
		    }
		}).state('app.domain', {
		    url: '/domain',
		    views: {
		        "content": {
		            templateUrl: 'app/partials/domain/templates/domain-list.html',
		            controller: 'DomainListController'
		        }
		    },
		    resolve: {
		        authCheck: function ($rootScope, $location) {
		            if ($rootScope.loggedInUserSession == "" || $rootScope.loggedInUserSession == null || $rootScope.loggedInUserSession == 'undefined') {
		                $location.path('/login');
		            }
		        }
		    }
		}).state('app.domain/create', {
		    url: '/domain/create',
		    views: {
		        'content': {
		            templateUrl: 'app/partials/domain/templates/create.html',
		            controller: 'DomainCreateController',
		        }
		    },
		    resolve: {
		        authCheck: function ($rootScope, $location) {
		            if ($rootScope.loggedInUserSession == "" || $rootScope.loggedInUserSession == null || $rootScope.loggedInUserSession == 'undefined') {
		                $location.path('/login');
		            }
		        }
		    }
		}).state('app.domain/update/:id', {
		    url: '/domain/update/:id',
		    views: {
		        'content': {
		            templateUrl: 'app/partials/domain/templates/edit.html',
		            controller: 'DomainEditController',
		        }
		    },
		    resolve: {
		        authCheck: function ($rootScope, $location) {
		            if ($rootScope.loggedInUserSession == "" || $rootScope.loggedInUserSession == null || $rootScope.loggedInUserSession == 'undefined') {
		                $location.path('/login');
		            }
		        }
		    }
		}).state('app.status', {
		    url: '/status',
		    views: {
		        "content": {
		            templateUrl: 'app/partials/status/templates/status-list.html',
		            controller: 'StatusListController'
		        }
		    },
		    resolve: {
		        authCheck: function ($rootScope, $location) {
		            if ($rootScope.loggedInUserSession == "" || $rootScope.loggedInUserSession == null || $rootScope.loggedInUserSession == 'undefined') {
		                $location.path('/login');
		            }
		        }
		    }
		}).state('app.status/create', {
		    url: '/status/create',
		    views: {
		        'content': {
		            templateUrl: 'app/partials/status/templates/create.html',
		            controller: 'StatusCreateController',
		        }
		    },
		    resolve: {
		        authCheck: function ($rootScope, $location) {
		            if ($rootScope.loggedInUserSession == "" || $rootScope.loggedInUserSession == null || $rootScope.loggedInUserSession == 'undefined') {
		                $location.path('/login');
		            }
		        }
		    }
		}).state('app.status/update/:id', {
		    url: '/status/update/:id',
		    views: {
		        'content': {
		            templateUrl: 'app/partials/status/templates/edit.html',
		            controller: 'StatusEditController',
		        }
		    },
		    resolve: {
		        authCheck: function ($rootScope, $location) {
		            if ($rootScope.loggedInUserSession == "" || $rootScope.loggedInUserSession == null || $rootScope.loggedInUserSession == 'undefined') {
		                $location.path('/login');
		            }
		        }
		    }
		}).state('app.vertical', {
		    url: '/vertical',
		    views: {
		        "content": {
		            templateUrl: 'app/partials/vertical/templates/vertical-list.html',
		            controller: 'VerticalListController'
		        }
		    },
		    resolve: {
		        authCheck: function ($rootScope, $location) {
		            if ($rootScope.loggedInUserSession == "" || $rootScope.loggedInUserSession == null || $rootScope.loggedInUserSession == 'undefined') {
		                $location.path('/login');
		            }
		        }
		    }
		}).state('app.vertical/create', {
		    url: '/vertical/create',
		    views: {
		        'content': {
		            templateUrl: 'app/partials/vertical/templates/create.html',
		            controller: 'VerticalCreateController',
		        }
		    },
		    resolve: {
		        authCheck: function ($rootScope, $location) {
		            if ($rootScope.loggedInUserSession == "" || $rootScope.loggedInUserSession == null || $rootScope.loggedInUserSession == 'undefined') {
		                $location.path('/login');
		            }
		        }
		    }
		}).state('app.vertical/update/:id', {
		    url: '/vertical/update/:id',
		    views: {
		        'content': {
		            templateUrl: 'app/partials/vertical/templates/edit.html',
		            controller: 'VerticalEditController',
		        }
		    },
		    resolve: {
		        authCheck: function ($rootScope, $location) {
		            if ($rootScope.loggedInUserSession == "" || $rootScope.loggedInUserSession == null || $rootScope.loggedInUserSession == 'undefined') {
		                $location.path('/login');
		            }
		        }
		    }
		})
		 .state('app.problem/details/:id', {
		     url: '/problem/details/:id',
		     views: {
		         'content': {
		             templateUrl: 'app/partials/business-problems/templates/problem-details.html',
		             controller: 'ProblemDetailsController',
		         }
		     },
		 }).state('app.problem/comment/:id', {
		     url: '/problem/comment/:id',
		     views: {
		         'content': {
		             templateUrl: 'app/partials/business-problems/templates/problemComment.html',
		             controller: 'ProblemEditController',
		         }
		     },
		 }).state('app.home', {
		     url: '/home',
		     views: {
		         'content': {
		             templateUrl: 'app/partials/home/homeView.html',
		             controller: 'HomeController',
		         }
		     },
		 }).state('app.login', {
		     url: '/login',
		     views: {
		         "content": {
		             templateUrl: 'app/partials/login/login.html',
		             controller: 'LoginController'
		         }
		     },

		 });
    };
})(this.angular);