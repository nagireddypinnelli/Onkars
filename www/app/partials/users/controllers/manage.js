(function (angular) {
    'use strict';

    /*
     * @ngdoc overview
     * @name ManageController
     * @description
     * 
     * Controller for the problem module.
     * ====================================
     */

    angular
        .module('id3.user')
        .filter('roleFilter', function () {
            return function (user, rolefilter) {
                if (user != undefined && user != false && user != true) {
                    return user.filter(function (task) {
                        if (rolefilter.length == 0 || rolefilter == undefined) {
                            return true;
                        }
                        else if (rolefilter.indexOf(task.role.name) != -1) {
                            return true;
                        }
                        return false;
                    });
                }
                return;
            };
        })
        .controller('ManageController', ManageController);
    ManageController.$inject = ['$scope', '$state', 'UsersService', '$timeout', '$window', '$rootScope', '$mdDialog', '$stateParams'];
    function ManageController($scope, $state, UsersService, $timeout, $window, $rootScope, $mdDialog, $stateParams) {
        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $("body").css('overflow-y', 'scroll');
        $window.scrollTo(0, 0);
        var username = $window.sessionStorage.getItem('userName');
        $scope.loggedInUserID = loggedInUser;
        $scope.loggedInUser = loggedInUser;
        $scope.reverseSort = false;
        $scope.level = "none";
        $scope.tags = [];
        $scope.statuesFilloggedInUserter = [];
        $scope.userfilter = [];
        $scope.statusfilter = [];
        $scope.fromDate = "";
        $scope.toDate = "";
        $scope.accounts = "";
        $scope.groups = "";
        $scope.filterByaccount = [];
        $scope.filterByVertical = [];
        $scope.filterByDomain = [];
        $scope.filterByCreate = [];
        $scope.selectedRole = [];
        $scope.sortBy = 'name';
        $scope.reverse = false;
        $scope.filterType = "";
        $scope.createTilte = "";
        $scope.roleSession = $window.sessionStorage.getItem('roleSession');
        $scope.usersList = [];
        $scope.limit = 2;
        $scope.numberToDisplay = 5;
        $scope.searchKeyword = "";
        $scope.toggleValue = false;
        $scope.users = [];
        $scope.showSortOption = 1;
        $scope.displayFilteroption = true;
        $scope.displayRecent = true;
        $scope.displaytimeline = true;
        $scope.blockedUserCount = "";
        $scope.displayactions = false;
        $scope.inactiveUsers = false;
        $scope.role_error = false;
        $scope.errorMessage = "";
        $scope.newgroup = "";
        $scope.user = {
            name: "",
            account: "",
            username: "",
            contactInfo: "",
            email: "",
            role: "",
            _id: ""
        };

        if ($window.sessionStorage.getItem('loggedInUserSession') == 'null' || $window.sessionStorage.getItem('loggedInUserSession') == null) {
            $state.go('app.home')
        }

        $scope.mobilefilter = function (keyword) {
            $rootScope.$emit("searchKeyword", keyword);
            // $scope.searchKeyword = keyword;
        }

        $scope.clearSearch = function () {
            $scope.searchKeyword = "";
        }

        $rootScope.$on("searchKeyword", function (event, data) {
            $scope.searchKeyword = data;

        });


        if ($(window).width() < 992) {
            $scope.displayFilteroption = false;

            $scope.displayRecent = false;
        }

        $(window).resize(function () {
            if ($(window).width() < 992) {
                if ($(".fixed-menu-left").hasClass("active") == false) {
                    $scope.displayFilteroption = false;
                }

                if ($(".fixed-menu-right").hasClass("active") == false) {
                    $scope.displayRecent = false;
                }
            }
            else {
                $scope.displayFilteroption = true;

                $scope.displayRecent = true;

                $scope.displaytimeline = true;
            }
        });

        $scope.$watch('createTilte', function (newValue, oldValue) {
            if (newValue != undefined) {
                $rootScope.$emit("AssignProblemTitle", newValue);
                // $rootScope.AssignProblemTitle = newValue;
                // $scope.data.title = newValue;
            }
        });

        $rootScope.$on("ReloadProblem", function () {
            $scope.createTilte = "";
            $scope.getBusinessProblem();
        });

        //$scope.toggle = function () {
        //    $scope.$broadcast('event:toggle');
        //    $scope.toggleValue = !$scope.toggleValue;
        //}

        //$scope.toggleChange = function () {
        //    if (!$scope.toggleValue) {
        //        $scope.toggle();
        //    }
        //}

        $scope.noMoreItemsAvailable = false;
        //$scope.getBusinessProblem = function () {
        //    $scope.showSortOption = 1;
        //    UsersService.getUserList(function (response) {
        //        $scope.users = response;
        //        $scope.loadMore();
        //    });
        //}

        UsersService.getUserList(function (userlist) {
            $.LoadingOverlay("hide");
            $scope.showSortOption = 1
            $scope.users = userlist;
            $scope.loadMore();
        });

        UsersService.getRoleList(function (role) {
            UsersService.getUserList(function (userlist) {
                for (var i = 0; i < role.length; i++) {
                    role[i].roleCount = 0;
                    angular.forEach(userlist, function (user, key) {
                        if (role[i]._id == user.role._id) {
                            role[i].roleCount++;
                        }
                    });
                }

               
            });
            $scope.roles = role;
        });

        $scope.resetFilter = function () {
            $scope.filterByaccount = [];
            $scope.filterByVertical = [];
            $scope.filterByDomain = [];
            $scope.filterByCreate = [];
            $scope.fromDate = "";
            $scope.toDate = "";
            $scope.searchKeyword = "";
        }

        $scope.loadMore = function () {
            if ($scope.users != null || $scope.users != "" || $scope.users != undefined) {
                if ($scope.users != 'undefined') {
                    if ($scope.numberToDisplay + 5 < $scope.users.length) {
                        $scope.numberToDisplay += 5;
                    } else {
                        $scope.numberToDisplay = $scope.users.length;
                    }
                }
            }
        }


        $scope.sortproblem = function (sortBy) {
            $scope.reverse = ($scope.sortBy === sortBy) ? !$scope.reverse : false;
            $scope.sortBy = sortBy;
        }

        $scope.userKeywordFilter = function (filter) {
            return function (user) {
                if (filter == "") {
                    return true;
                }
                else if (filter != "") {
                    filter = filter.toLowerCase()
                    var name = String(user.name);
                    var email = String(user.email);
                    var usernme = String(user.username);
                    var account = "";
                    if (user.account != undefined) {
                        account = String(user.account.name);
                    }
                    if (name.toLowerCase().indexOf(filter) >= 0) {
                        return true;
                    }
                    else if (usernme.toLowerCase().indexOf(filter) >= 0) {
                        return true;
                    }
                    else if (account.toLowerCase().indexOf(filter) >= 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            };
        };

        $scope.showhidefilteroptions = function () {
            $scope.displayFilteroption = true;

            $scope.displayRecent = false;

            $scope.displaytimeline = false;

            $("body").css('overflow-y', 'hidden');

            $('header, .nav-mob-res-logo ').removeClass('nav-up').addClass('nav-down');

            $('.menu-fixed').removeClass('nav-relative').addClass('nav-static');
        }

        $scope.showhiderecent = function () {
            $scope.displayRecent = true;

            $scope.displayFilteroption = false;

            $scope.displaytimeline = false;

            $("body").css('overflow-y', 'scroll');
        }

        $scope.showTimeline = function () {
            $scope.displayRecent = false;

            $scope.displayFilteroption = false;

            $scope.displaytimeline = true;

            $("body").css('overflow-y', 'scroll');
        }

        $scope.showScroll = function () {
            $("body").css('overflow-y', 'scroll');
        }

        $scope.sortUser = function (sortBy) {
            $scope.reverse = ($scope.sortBy === sortBy) ? !$scope.reverse : false;
            $scope.sortBy = sortBy;
        }

        $scope.rolefilterchange = function () {
            $scope.tags = [];
            $scope.selectedRole = [];
            angular.forEach($scope.userfilter, function (value, key) {
                if (value != undefined) {
                    $scope.tags.push(value.name);
                    $scope.selectedRole.push(value)
                }
            });

            angular.forEach($scope.roles, function (value, key) {
                angular.element('#role' + value._id).removeClass('SelectedDiv');
                angular.element('#role' + value._id).addClass('unSelectedDiv');
            })

            if ($scope.selectedRole.length > 0) {
                angular.forEach($scope.selectedRole, function (value, key) {

                    angular.element('#role' + value._id).removeClass('unSelectedDiv');
                    angular.element('#role' + value._id).addClass('SelectedDiv');
                })
            }
        }

        $scope.reverseSort = false;
        $scope.errorMessage = '';

        UsersService.getAccountList(function (response) {
            $scope.accounts = response;
        });


        //$scope.opencreateUser = function () {
        //    $scope.user = {
        //        name: "",
        //        account: "",
        //        username: "",
        //        contactInfo: "",
        //        role: "",
        //        _id: ""
        //    };
        //}

        $scope.emailValidationError = "";

         $scope.emailValidation= function () {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            console.log($scope.user.email)
            $scope.emailValidationError  = "Please enter the valid email Id"
           // return re.test($scope.user.email);
        }

        $scope.createUser = function () {
            if ($("#createUserForm").valid()) {
                if ($scope.user.role == "")
                {
                    $scope.role_error = true;
                    return;
                }
                $scope.user.username = $scope.user.username.toLowerCase();
                var user = $scope.user;
                $scope.user.password = 'password';
                if ($scope.user.account == '') {
                    $scope.user.account = null;
                }
                $scope.newUser = {
                    name: $scope.user.name,
                    account: $scope.user.account,
                    username: $scope.user.username,
                    contactInfo: $scope.user.contactInfo,
                    email: $scope.user.email,
                    role: $scope.user.role,
                };

                UsersService.create($scope.newUser, function (response) {
                    $scope.errorMessage = "";
                    if (response == 'success') {
                        $scope.userEmailId = "";
                        $scope.user = {
                            name: "",
                            account: "",
                            username: "",
                            contactInfo: "",
                            email: "",
                            role: "",
                            _id: ""
                        };
                        angular.element('#usercreateconfirm').modal('show');

                        $rootScope.$emit("ReloadUsers", {
                        });
                        //$state.go('app.home');
                    }
                    else {
                        $scope.errorMessage = response;
                    }
                });
            }   
        }

        $rootScope.$on("ReloadUsers", function () {
            //$scope.createTilte = "";
            $scope.getusers();
            $scope.userEmailId = "";
        });


        $scope.getusers = function () {
            UsersService.getUserList(function (response) {
                $scope.showSortOption = 1;
                $scope.users = response;
               
                UsersService.getRoleList(function (role) {
                    for (var i = 0; i < role.length; i++) {
                        role[i].roleCount = 0;
                        angular.forEach($scope.users, function (user, key) {
                            if (role[i]._id == user.role._id) {
                                role[i].roleCount++;
                            }
                        });
                    }

                    $scope.roles = role;
                });

            });
        },

        $scope.InactiveUsers = function () {

            if ($('#checkAll').prop('checked')) {
                $("#checkAll").trigger("click");
            }

            $scope.displayactions = false;
            if ($scope.inactiveUsers)
            {
                $scope.displayactions = false;
                angular.element('#aciveAndInactiveUsers').addClass('SelectedDiv');
                angular.element('#aciveAndInactiveUsers').removeClass('unSelectedDiv');
                UsersService.getBlockedUsers(function (response) {
                    $scope.users = response;
                    UsersService.getRoleList(function (role) {
                        $scope.tags = [];
                        $scope.userfilter = [];
                            for (var i = 0; i < role.length; i++) {
                                role[i].roleCount = 0;
                                angular.forEach($scope.users, function (user, key) {
                                    if (role[i]._id == user.role._id) {
                                        role[i].roleCount++;
                                    }
                                });
                            }                       
                        $scope.roles = role;
                    });
                });
            }
            else {
                angular.element('#aciveAndInactiveUsers').removeClass('SelectedDiv');
                angular.element('#aciveAndInactiveUsers').addClass('unSelectedDiv');
                UsersService.getUserList(function (response) {
                    $scope.showSortOption = 1;
                    $scope.users = response;
                    UsersService.getRoleList(function (role) {
                        $scope.tags = [];
                        $scope.userfilter = [];
                        for (var i = 0; i < role.length; i++) {
                            role[i].roleCount = 0;
                            angular.forEach($scope.users, function (user, key) {
                                if (role[i]._id == user.role._id) {
                                    role[i].roleCount++;
                                }
                            });
                        }

                        $scope.roles = role;
                    });
                });
            }
        },

        $scope.hideErrorMesssage = function (field) {
            if (field == 'account') {
                angular.element('#accountSelectBox').children('.error').hide();
            }
            if (field == 'role') {
                angular.element('#roleSelectBox').children('.error').hide();
            }
        }

        $scope.redirectHomepage = function () {

            //angular.element("#myUserNav").css('height', '0%');

            //angular.element("body").css('overflow-y', 'visible');

            //angular.element('.wizard .content').hide();

            //angular.element('.wizard>.content').css({ 'width': (($('body').width())) + 'px' });

            //angular.element('.container-content.create-user').css({ 'z-index': '0', 'display': 'none' });
            //  $state.go('app.problems');

        }

        $scope.removeRole_errorMsg = function () {
            $scope.role_error = false;
        }

        $scope.CloseNav = function () {
            $scope.user = {
                name: "",
                account: "",
                username: "",
                contactInfo: "",
                email: "",
                role: "",
                _id: ""
            };

            $scope.userEmailId = "";
            $scope.role_error = false;
            angular.element("#errorMessageForLabel").text("");

            $('label.error').remove();

            angular.element("#myUserNav").css('height', '0%');

            angular.element("body").css('overflow-y', 'visible');

            angular.element("body").css('position', 'static');

            angular.element('.wizard .content').hide();

            angular.element('.wizard>.content').css({ 'width': (($('body').width())) + 'px' });

            angular.element('.container-content.create-user').css({ 'z-index': '0', 'display': 'none' });

            angular.element("nav.nav-main").css('opacity', '1');  
        }

        $scope.getUserDetails = function (userId) {         
            $rootScope.$emit("userDetails", userId);         
        }

        $rootScope.$on("userDetails", function (event, userId) {
            angular.element("#errorMessageForLabel").text("");
            $.LoadingOverlay("show");
            UsersService.getUserById(userId, function (response) {
                $scope.user = response;
                $.LoadingOverlay("hide");
            });
        });


        $scope.updateUserDetails = function () {
                if ($("#createUserForm").valid()) {
                    //var scope = angular.element('div[ng-controller="ManageController"]').scope();
                    //scope.updateUserDetails();
                    var user = $scope.user;
                    UsersService.updateUser(user, function (response) {
                        angular.element('#userupdateconfirm').modal('show');
                        if (response == "updateUser_success") {
                            $scope.CloseNav();
                            $rootScope.$emit("ReloadUsers", {
                            });
                        }
                    });
                }                    
        }

        $scope.addNewGroup = function (newgroup) {
            if ($scope.newgroup != "") {
                UsersService.createGroup(newgroup, function (response) {
                    if (response == 'Group already exist') {
                        angular.element("#errorMessageForLabel").text("Group already exist!");
                    }
                    else {
                        $scope.newgroup = "";
                        angular.element("#errorMessageForLabel").text("");
                        angular.element('#newgroup').val("")
                        $scope.newlabel = "";
                        $scope.groups.push(response);
                    }
                });
            }
            else {
                angular.element("#errorMessageForLabel").text("Please enter new group!");
            }
        };

        UsersService.getGroupList(function (response) {
            $scope.groups = response;
        });

        UsersService.blockUserCount(function (response) {
            $scope.blockedUserCount = response;
        });

        $scope.blockUser = function (userId) {
            UsersService.blockUser($scope.blockingUserId, function (response) {
                $scope.tags = [];
                $scope.userfilter = [];
                UsersService.blockUserCount(function (response) {
                    $scope.blockedUserCount = response;
                });

                $rootScope.$emit("ReloadUsers", {
                });
            });

            angular.element('#blockUserSuccess').modal('show');
        };
        $scope.blockingUserId = "";
        $scope.unblockingUserId = "";
        $scope.getunblockingUserId = function (userId) {

            $scope.unblockingUserId = userId;
        }

        $scope.getblockingUserId = function (userId) {

            $scope.blockingUserId = userId;
        }

        $scope.unblockUser = function (userId) {

            $scope.tags = [];
            $scope.userfilter = [];
            UsersService.unblockUser($scope.unblockingUserId, function (response) {
                UsersService.blockUserCount(function (response) {
                    $scope.blockedUserCount = response;
                });

                $rootScope.$emit("ReloadblockedUsers", {
                });
            });

            angular.element('#unblockUserSuccess').modal('show');
        };

        $rootScope.$on("ReloadblockedUsers", function () {
            //$scope.createTilte = "";
            UsersService.getBlockedUsers(function (response) {
                $scope.users = response;
                UsersService.getRoleList(function (role) {

                    $scope.tags = [];
                    $scope.userfilter = [];
                    for (var i = 0; i < role.length; i++) {
                        role[i].roleCount = 0;
                        angular.forEach($scope.users, function (user, key) {
                            if (role[i]._id == user.role._id) {
                                role[i].roleCount++;
                            }
                        });
                    }

                    $scope.roles = role;
                });

            });

        });


        $scope.checkbox = [];
        $scope.groupblock = function ()
        {
            //console.log($scope.checkbox);

            var arr = [];
            $('input.userCheck:checkbox:checked').each(function () {
                arr.push($(this).val());
            });           
        }


        $scope.addUserInGroup = function (groupId) {

            var groupId = $scope.groupId;
            var users = [];
            $('input.userCheck:checkbox:checked').each(function () {
                users.push($(this).val());
            });

            var users = { groupId: groupId, users: users }
            UsersService.addUserInGroup(users, function () {

                $scope.displayactions = false;
                if ($('#checkAll').prop('checked')) {
                    $("#checkAll").trigger("click");
                }

                $rootScope.$emit("ReloadUsers", {
                });
                angular.element('#groupAssignSuccess').modal('show');
            })
        },

        $scope.assignsRoleId = function (roleId) {
            $scope.roleId = roleId;
        }

        $scope.assignGroupId = function (groupId) {
            $scope.groupId = groupId;
        }

        $scope.mobilefilter = function (keyword) {
            $rootScope.$emit("searchKeyword", keyword);
            // $scope.searchKeyword = keyword;
        }

        $scope.assignUsersRole = function () {
           var roleId= $scope.roleId;
            var users = [];
            $scope.tags = [];
            $scope.userfilter = [];
            $('input.userCheck:checkbox:checked').each(function () {
                users.push($(this).val());
            });
            var users = { roleId: roleId, users: users }
            UsersService.assignUsersRole(users, function () {
                $scope.displayactions = false;
                if ($('#checkAll').prop('checked'))
                {
                    $("#checkAll").trigger("click");
                }

                angular.element('#roleChangeUserSuccess').modal('show');
                $rootScope.$emit("ReloadUsers", {
                });
            });
        }

        $scope.displayActions = function () {
            var users = [];
            $('input.userCheck:checkbox:checked').each(function () {
                users.push($(this).val());
            });

            if ((users.length > 0 ))
            {
                $scope.displayactions = true;
            }
            else {
                $scope.displayactions = false;
            }
        }

        //$scope.$watch('userEmailId', function (newValue, oldValue) {
        //    if (newValue != undefined) {
        //        $scope.user.email = newValue;
		//      //  $rootScope.$emit("AssignUserEmailId", newValue);
		//       // $rootScope.AssignProblemTitle = newValue;
		//       // $scope.data.title = newValue;
		//	}
        //});

        $scope.setEmailId = function()
        {

            $scope.user = {
                name: "",
                account: "",
                username: "",
                contactInfo: "",
                email: "",
                role: "",
                _id: ""
            };
            $scope.user.email = $scope.userEmailId;
            
        }

        $rootScope.$on("AssignUserEmailId", function (event, data) {
            $scope.user = {
                name: "",
                account: "",
                username: "",
                contactInfo: "",
                role: "",
                _id: "",
                email:""
            };
            $scope.user.email = data;
        });


        $scope.deactivateUsers = function () {
            var users = [];
            $scope.tags = [];
            $('input.userCheck:checkbox:checked').each(function () {
                users.push($(this).val());
            });
            var users = {users: users }
            UsersService.blockUsers(users, function () {             
                angular.element('#deactivateUserSuccess').modal('show');
                $scope.displayactions = false;
                if ($('#checkAll').prop('checked')) {
                    $("#checkAll").trigger("click");
                }

                $scope.displayactions = false;
                UsersService.blockUserCount(function (response) {
                    $scope.blockedUserCount = response;
                });

                $rootScope.$emit("ReloadUsers", {
                });
            });

        }

        $scope.activateUsers = function () {
            var users = [];
            $scope.tags = [];
            $('input.userCheck:checkbox:checked').each(function () {
                users.push($(this).val());
            });
            var users = {users: users }
            UsersService.unblockUsers(users, function () {             
                angular.element('#activateUserSuccess').modal('show');
                $scope.displayactions = false;
                if ($('#checkAll').prop('checked')) {
                    $("#checkAll").trigger("click");
                }

                $scope.displayactions = false;
                UsersService.blockUserCount(function (response) {
                    $scope.blockedUserCount = response;
                });

                $rootScope.$emit("ReloadblockedUsers", {
                });
            });
            
        }


        $scope.exportExcel = function () {
            var users = [];
            $('input.userCheck:checkbox:checked').each(function () {
                users.push($(this).val());
            });
            UsersService.ExcelexportByUserId(users, function (response) {
            window.location = '/uploads/ID3 Users.xlsx';
            });
        }

        $scope.topContributors =[];
        //UsersService.getTopContributors(function (count) {
        //    $scope.topContributors = [];
        //    angular.forEach(count, function (userId, key) {
        //        UsersService.getUserById(userId._id, function (response) {
        //            $scope.topContributors[key] = response;
        //        })
        //    });

        //});
        
    }
})(this.angular);