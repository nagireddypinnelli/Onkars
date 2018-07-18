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
        .module('id3.modules')
        .factory('ModulesService', ModulesService);

    ModulesService.$inject = ['$http'];
    function ModulesService($http) {
        var service = {
            getAccountList: function getAccountList(callback) {
                $http.get('/api/account/get')
				.success(function (response) {
				    callback(response);
				});
            },

            createAccount: function (account, callback) {
                $http.post('/api/account/create', {
                    account: account
                })
				.success(function (response) {
				    callback("success");
				})
				.error(function (response) {
				    callback(response);
				})
            },

            getAccountById: function (id, callback) {
                $http.get('/api/account/get/' + id)
				.success(function (response) {
				    callback(response);
				});
            },

            updateAccount: function (account, callback) {
                $http.post('/api/account/update', {
                    account: account
                })
				.success(function (response) {
				    callback("success");
				})
				.error(function (response) {
				    callback(response);
				})
            },

            deleteAccount: function (id, callback) {
                $http.delete('/api/account/delete/' + id)
				.success(function (response) {
				    callback(response);
				});
            },

            getDomainList: function getDomainList(callback) {
                $http.get('/api/domain/get')
				.success(function (response) {
				    callback(response);
				});
            },

            createDomain: function (domain, callback) {
                $http.post('/api/domain/create', {
                    domain: domain
                })
				.success(function (response) {
				    callback("success");
				})
				.error(function (response) {
				    callback(response);
				})
            },

            getdomainById: function (id, callback) {
                $http.get('/api/domain/get/' + id)
				.success(function (response) {
				    callback(response);
				});
            },

            updateDomain: function (domain, callback) {
                $http.post('/api/domain/update', {
                    domain: domain
                })
				.success(function (response) {
				    callback("success");
				})
				.error(function (response) {
				    callback(response);
				})
            },

            deleteDomain: function (id, callback) {
                $http.delete('/api/domain/delete/' + id)
				.success(function (response) {
				    callback(response);
				});
            },


            deleteRole: function (id, callback) {
                $http.delete('/api/role/delete/' + id)
				.success(function (response) {
				    callback(response);
				});
            },


            getRoleList: function getRoleList(callback) {
                $http.get('/api/role/get')
				.success(function (response) {
				    callback(response);
				});
            },

            createRole: function (role, callback) {
                $http.post('/api/role/create', {
                    role: role
                })
				.success(function (response) {
				    callback("success");
				})
				.error(function (response) {
				    callback(response);
				})
            },

            getroleById: function (id, callback) {
                $http.get('/api/role/get/' + id)
				.success(function (response) {
				    callback(response);
				});
            },

            updateRole: function (role, callback) {
                $http.post('/api/role/update', {
                    role: role
                })
				.success(function (response) {
				    callback("success");
				})
				.error(function (response) {
				    callback(response);
				})
            },


            getLabelList: function getLabelList(callback) {
                $http.get('/api/label/get')
				.success(function (response) {
				    callback(response);
				});
            },

            createLabel: function (label, callback) {
                $http.post('/api/Label/create', {
                    label: label
                })
				.success(function (response) {
				    callback("success");
				})
				.error(function (response) {
				    callback(response);
				})
            },

            getlabelById: function (id, callback) {
                $http.get('/api/label/get/' + id)
				.success(function (response) {
				    callback(response);
				});
            },

            updateLabel: function (label, callback) {
                $http.post('/api/label/update', {
                    label: label
                })
				.success(function (response) {
				    callback("success");
				})
				.error(function (response) {
				    callback(response);
				})
            },

            deleteLabel: function (id, callback) {
                $http.delete('/api/label/delete/' + id)
				.success(function (response) {
				    callback(response);
				});
            },


            deleteApproach: function (id, callback) {
                $http.delete('/api/approach/delete/' + id)
				.success(function (response) {
				    callback(response);
				});
            },

            getApproachList: function (callback) {
                $http.get('/api/approach/get')
				.success(function (response) {
				    callback(response);
				});
            },

            createApproach: function (approach, callback) {
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

            updateApproach: function (approach, callback) {
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

            deleteVertical: function (id, callback) {
                $http.delete('/api/vertical/delete/' + id)
				.success(function (response) {
				    callback(response);
				});
            },
            getVerticalList: function (callback) {
                $http.get('/api/vertical/get')
				.success(function (response) {
				    callback(response);
				});
            },

            createVertical: function (vertical, callback) {
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

            updateVertical: function (vertical, callback) {
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

            getCategoryList: function (callback) {
                $http.get('/api/category/get')
				.success(function (response) {
				    callback(response);
				});
            },

            deleteCategory: function (id, callback) {
                $http.delete('/api/category/delete/' + id)
				.success(function (response) {
				    callback(response);
				});
            },

            createCategory: function (category, callback) {
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

            updateCategory: function (category, callback) {
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


                     getStatusList: function (callback) {
                $http.get('/api/status/get')
				.success(function (response) {
				    callback(response);
				});
            },

            deleteStatus: function (id, callback) {
                $http.delete('/api/status/delete/' + id)
				.success(function (response) {
				    callback(response);
				});
            },

            createStatus: function (status, callback) {
                $http.post('/api/status/create', {
                    status: status
                })
				.success(function (response) {
				    callback("success");
				})
				.error(function (response) {
				    callback(response);
				})
            },

            getStatusById: function (id, callback) {
                $http.get('/api/status/get/' + id)
				.success(function (response) {
				    callback(response);
				});
            },

            updateStatus: function (status, callback) {
                $http.post('/api/status/update', {
                    status: status
                })
				.success(function (response) {
				    callback("success");
				})
				.error(function (response) {
				    callback(response);
				})
            },

            checkExistsStatus :function(status ,callback)
            {
                $http.post('/api/status/checkExistsStatus', {
                    status:status
                })
                .success(function (response) {
                    callback(response);
                })
                .error(function (respnse) {
                    callback(response);
                })
            },

            checkExistsAccount: function (account, callback) {
                $http.post('/api/account/checkExistsAccount', {
                    account: account
                })
                .success(function (response) {
                    callback(response);
                })
                .error(function (respnse) {
                    callback(response);
                })
            },


            checkExistsApproach: function (approach, callback) {
                $http.post('/api/approach/checkExistsApproach', {
                    approach: approach
                })
                .success(function (response) {
                    callback(response);
                })
                .error(function (respnse) {
                    callback(response);
                })
            },


            checkExistsCategory: function (category, callback) {
                $http.post('/api/category/checkExistsCategory', {
                    category: category
                })
                .success(function (response) {
                    callback(response);
                })
                .error(function (respnse) {
                    callback(response);
                })
            },


            checkExistsDomain: function (domain, callback) {
                $http.post('/api/domain/checkExistsDomain', {
                    domain: domain
                })
                .success(function (response) {
                    callback(response);
                })
                .error(function (respnse) {
                    callback(response);
                })
            },

            checkExistsLabel: function (label, callback) {
                $http.post('/api/label/checkExistsLabel', {
                    label: label
                })
                .success(function (response) {
                    callback(response);
                })
                .error(function (respnse) {
                    callback(response);
                })
            },


            checkExistsPhase: function (phase, callback) {
                $http.post('/api/phase/checkExistsPhase', {
                    phase: phase
                })
                .success(function (response) {
                    callback(response);
                })
                .error(function (respnse) {
                    callback(response);
                })
            },


            checkExistsRole: function (role, callback) {
                $http.post('/api/role/checkExistsRole', {
                    role: role
                })
                .success(function (response) {
                    callback(response);
                })
                .error(function (respnse) {
                    callback(response);
                })
            },


            checkExistsVertical: function (vertical, callback) {
                $http.post('/api/vertical/checkExistsVertical', {
                    vertical: vertical
                })
                .success(function (response) {
                    callback(response);
                })
                .error(function (respnse) {
                    callback(response);
                })
            },

        };

        return service;
    }

})();