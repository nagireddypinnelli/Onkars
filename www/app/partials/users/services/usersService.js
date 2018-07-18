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
        .factory('UsersService', UsersService);

    UsersService.$inject = ['$http'];

    function UsersService($http) {
        var service = {

            create: function (user, callback) {
                $http.post('/api/users/create', {
                    user: user
                })
				.success(function (response) {
				    callback("success");
				})
				.error(function (response) {
				    callback(response);
				})
            },


            getRoleList: function (callback) {
                $http.get('/api/role/get')
                .success(function (response) {
                    callback(response);
                })
            },
            getAccountList: function (callback) {
                $http.get('/api/account/get')
                .success(function (response) {
                    callback(response);
                })
            },

            getUserList: function getUserList(callback) {
                $http.get('/api/users/getUserList/')
				.success(function (response) {
				    callback(response);
				});
            },
            getUserRole: function getUserRole(uId, callback) {
                $http.get('/api/users/getUserRole/' + uId)
				.success(function (response) {
				    callback(response);
				});
            },
            login: function (username, password, callback) {
                $http.post('/api/users/login', {
                    username: username,
                    password: password,
                    device: "web"
                })
				.success(function (response) {
				    callback(response);
				})
				.error(function () {
				    callback(0);
				})
            },
            getUserById: function getUserById(id, callback) {
                $http.get('/api/users/' + id)
				.success(function (response) {
				    callback(response);
				});
            },

            blockUser: function (id, callback) {
                $http.delete('/api/users/delete/' + id)
                .success(function (response) {
                    callback(response);
                })
            },

            unblockUser: function (id, callback) {
                $http.post('/api/users/unblock/' + id)
                .success(function (response) {
                    callback(response);
                })
            },

            blockUserCount: function (callback) {
                $http.get('/api/users/getblockedUsersCount')
                .success(function (response) {
                    callback(response);
                })
            },

            getBlockedUsers: function (callback) {
                $http.get('/api/users/getBlockedList')
                .success(function (response) {
                    callback(response);
                })
            },

            updateUser: function (user, callback) {
                $http.post('/api/users/update', {
                    user: user
                })
				.success(function (response) {
				    callback("updateUser_success");
				})
				.error(function (response) {
				    callback(response);
				})
            },



            getAccountList: function (callback) {
                $http.get('/api/account/get')
                .success(function (response) {
                    callback(response);
                })
            },
            getVerticalList: function (callback) {
                $http.get('/api/vertical/get')
                .success(function (response) {
                    callback(response);
                })
            },
            getApproachList: function (callback) {
                $http.get('api/approach/get')
                .success(function (response) {
                    callback(response);
                })
            },
            getCategoryList: function (callback) {
                $http.get('/api/category/get')
                .success(function (response) {
                    callback(response);
                })
            },
            getDiomainList: function (callback) {
                $http.get('/api/domain/get')
                .success(function (response) {
                    callback(response);
                })
            },

            getLabelList: function (callback) {
                $http.get('api/label/get')
                .success(function (response) {
                    callback(response);
                })
            },

            getPhaseList: function (callback) {
                $http.get('/api/phase/get')
                .success(function (response) {
                    callback(response);
                })
            },

            getStatusList: function (callback) {
                $http.get('/api/status/get')
                .success(function (response) {
                    callback(response);
                })
            },

            getUserList: function (callback) {
                $http.get('/api/users/getUserList')
                .success(function (response) {
                    callback(response);
                })
            },

            addComment: function (comment, callback) {
                $http.post('/api/problem/addComment', {
                    comment: comment
                }).success(function (response) {
                    callback("success");
                })
                  .error(function (response) {
                      callback(response);
                  })
            },

            likeProblem: function (problem, callback) {
                $http.post('/api/problem/like', {
                    problem: problem
                }).success(function (response) {
                    callback("success");
                }).error(function (response) {
                    callback(response);
                })
            },

            createGroup: function (group, callback) {
                $http.post('/api/group/create', {
                    group: group
                })
                .success(function (response) {
                    callback(response);
                })
                .error(function (response) {
                    callback(response);
                });
            },

            getTopContributors: function (callback) {
                $http.get('/api/problem/getTopContributors')
                .success(function (response) {
                    callback(response);
                })
            },

            getGroupList: function (callback) {
                $http.get('api/group/get')
                .success(function (response) {
                    callback(response);
                })
            },

            addUserInGroup: function (users, callback) {
                $http.post('/api/group/addUsers', {
                    users: users
                })
				.success(function (response) {
				    callback("success");
				})
				.error(function (response) {
				    callback(response);
				})
            },

            assignUsersRole: function (users, callback) {
                $http.post('/api/users/updateUsersRole', {
                    users: users
                })
                .success(function (response) {
                    callback("success");
                })
                .error(function (response) {
                    callback(response);
                })
            },

            blockUsers: function (users, callback) {
                $http.post('/api/users/blockUsers', {
                    users: users
                })
            .success(function (response) {
                callback("success");
            })
            .error(function (response) {
                callback(response);
            })
            },

            unblockUsers: function (users, callback) {
                $http.post('/api/users/unblockUsers', {
                    users: users
                })
            .success(function (response) {
                callback("success");
            })
            .error(function (response) {
                callback(response);
            })
            },

            ExcelexportByUserId: function (users ,callback) {
                $http.post('api/excel/getUserDetailsByIds', {
                    users: users
                })
             .success(function (response) {
                 callback("success");
             })
            .error(function (response) {
                callback(response);
            })
            }
        }
        return service;
    }
})();