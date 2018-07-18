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
        .module('id3.modules')

        .controller('ModulesController', ModulesController);
    ModulesController.$inject = ['$scope', '$state', 'ModulesService', '$timeout', '$window', '$rootScope', '$mdDialog', '$stateParams'];
    function ModulesController($scope, $state, ModulesService, $timeout, $window, $rootScope, $mdDialog, $stateParams) {
        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $("body").css('overflow-y', 'scroll');
        $window.scrollTo(0, 0);

        var username = $window.sessionStorage.getItem('userName');
        $scope.errorMessage = "";
        $scope.errorMessageForWeightage = "";
        $scope.loggedInUserID = loggedInUser;
        $scope.loggedInUser = loggedInUser;
        $scope.reverseSort = false;
        $scope.level = "none";
        $scope.reverse = false;
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
        $scope.actionName = 'Account';
        $scope.actioncreated = '';
        $scope.actiondeleted = '';
        $scope.actionupdated = '';
        $scope.name = "";
        $scope.data = {
            name: '',
            description: '',
            domain: null,
            vertical: null,
            accountType: null,
            customerEngagement: null,
            customerInnovationAdaption: null,
            weightedPipeline: '',
            _id: ''
        }
        $scope.modules = [{ 'name': 'Account' }, { 'name': 'Domain' }, { 'name': 'Role' }, { 'name': 'Label' }, { 'name': 'Approaches' }, { 'name': 'Vertical' }, { 'name': 'Category' }, { 'name': 'Status' }];
        if ($window.sessionStorage.getItem('loggedInUserSession') == 'null' || $window.sessionStorage.getItem('loggedInUserSession') == null) {
            $state.go('app.home')
        }
        $scope.ranges = [{ 'value': '1' }, { 'value': '2' }, { 'value': '3' }, { 'value': '4' }, { 'value': '5' }];

        ModulesService.getAccountList(function (response) {
            $scope.datas = response;
        });

        ModulesService.getDomainList(function (response) {
            $scope.domains = response;
        });

        ModulesService.getVerticalList(function (response) {
            $scope.verticals = response;
        });

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


        $scope.noMoreItemsAvailable = false;

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


        $scope.reverseSort = false;
        $scope.errorMessage = '';


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

        $scope.blockingUserId = "";
        $scope.unblockingUserId = "";
        $scope.getunblockingUserId = function (userId) {

            $scope.unblockingUserId = userId;
        }

        $scope.getblockingUserId = function (userId) {

            $scope.blockingUserId = userId;
        }



        $scope.checkbox = [];
        $scope.groupblock = function () {
            //console.log($scope.checkbox);

            var arr = [];
            $('input.userCheck:checkbox:checked').each(function () {
                arr.push($(this).val());
            });
        }




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


        $scope.displayActions = function () {
            var users = [];

            $('input.userCheck:checkbox:checked').each(function () {
                users.push($(this).val());
            });

            if ((users.length > 0)) {
                $scope.displayactions = true;
            }
            else {
                $scope.displayactions = false;
            }
        }

        $scope.$watch('userEmailId', function (newValue, oldValue) {
            if (newValue != undefined) {
                $rootScope.$emit("AssignUserEmailId", newValue);
                // $rootScope.AssignProblemTitle = newValue;
                // $scope.data.title = newValue;
            }
        });


        $scope.actionfilterchange = function (model) {
            $scope.actionName = model;
            $scope.name = "";
            $scope.description = "";
            $scope.domain = null;
            $scope.accountType = null;
            $scope.customerEngagement = null;
            $scope.customerInnovationAdaption = null;
            $scope.vertical = null;
            $scope.weightedPipeline = "";

            $scope.data.name = "";
            $scope.data.description = "";
            $scope.data.domain = null;
            $scope.data.accountType = null;
            $scope.data.customerEngagement = null;
            $scope.data.customerInnovationAdaption = null;
            $scope.data.vertical = null;
            $scope.data.weightedPipeline = "";
            $scope.errorMessage = "";
            $scope.errorMessageForUpdate = "";
            $scope.actionId = null;
            if (model == 'Account') {

                ModulesService.getAccountList(function (response) {
                    $scope.datas = response;
                });
            }
            else if (model == 'Domain') {

                ModulesService.getDomainList(function (response) {
                    $scope.datas = response;
                });
            }
            else if (model == 'Label') {

                ModulesService.getLabelList(function (response) {
                    $scope.datas = response;
                });
            }

            else if (model == 'Role') {

                ModulesService.getRoleList(function (response) {
                    $scope.datas = response;
                });
            }
            else if (model == 'Approaches') {

                ModulesService.getApproachList(function (response) {
                    $scope.datas = response;
                });
            }

            else if (model == 'Vertical') {

                ModulesService.getVerticalList(function (response) {
                    $scope.datas = response;
                });
            }

            else if (model == 'Category') {

                ModulesService.getCategoryList(function (response) {
                    $scope.datas = response;
                });
            }

            else if (model == 'Status') {
                ModulesService.getStatusList(function (response) {
                    $scope.datas = response;
                });
            }
        }


        $scope.validateWeightedPipeline = function () {
            var x = $scope.weightedPipeline;
            var re = /^((0|[1-9]\d?)(\.\d{1,2})?|100(\.00?)?)$/;
            if (!re.test(x)) {
                $scope.errorMessage = "Invalid Weightage "
            }
            else {
                $scope.errorMessage = "";
            }
        }

        $scope.validateWeightedPipeline2 = function () {
            var x = $scope.data.weightedPipeline;
            var re = /^((0|[1-9]\d?)(\.\d{1,2})?|100(\.00?)?)$/;
            if (!re.test(x)) {
                $scope.errorMessageForWeightage = "Invalid Weightage "
            }
            else {
                $scope.errorMessageForWeightage = "";
            }
        }

        $scope.createModule = function () {
            var model = $scope.actionName;
            $scope.data.name = "";
            $scope.data.description = "";
            $scope.data.domain = null;
            $scope.data.accountType = null;
            $scope.data.customerEngagement = null;
            $scope.data.customerInnovationAdaption = null;
            $scope.data.weightedPipeline = null;
            $scope.data.vertical = null;
            if ($scope.name != "") {
                $scope.errorMessage = "";
                $scope.actionId = null;
                if (model == 'Account') {
                    var x = $scope.weightedPipeline;
                    var re = /^((0|[1-9]\d?)(\.\d{1,2})?|100(\.00?)?)$/;
                    if (!re.test(x)) {
                        $scope.errorMessage = "Invalid Weightage "
                    }
                    else {
                        $scope.errorMessage = "";

                        var account = { name: $scope.name, description: $scope.description, domain: $scope.domain, accountType: $scope.accountType, customerEngagement: $scope.customerEngagement, customerInnovationAdaption: $scope.customerInnovationAdaption, vertical: $scope.vertical, weightedPipeline: $scope.weightedPipeline }


                        ModulesService.checkExistsAccount(account, function (response) {
                            if (response == false) {
                                ModulesService.createAccount(account, function (response) {
                                    if (response == 'success') {
                                        $scope.name = "";
                                        $scope.description = "";
                                        $scope.domain = null;
                                        $scope.accountType = null;
                                        $scope.customerEngagement = null;
                                        $scope.customerInnovationAdaption = null;
                                        $scope.vertical = null;
                                        $scope.weightedPipeline = "";
                                        $scope.actioncreated = model;
                                        angular.element('#createSuccess').modal('show');
                                        ModulesService.getAccountList(function (response) {
                                            $scope.datas = response;
                                        });
                                    }
                                });
                            }

                            else {
                                $scope.errorMessage = "Already exists";
                            }
                        });




                    }
                }
                else if (model == 'Domain') {
                    var domain = { name: $scope.name, description: $scope.description }

                    ModulesService.checkExistsDomain(domain, function (response) {
                        if (response == false) {
                            ModulesService.createDomain(domain, function (response) {
                                if (response == 'success') {
                                    $scope.name = "";
                                    $scope.description = "";
                                    $scope.actioncreated = model;
                                    angular.element('#createSuccess').modal('show');
                                    ModulesService.getDomainList(function (response) {
                                        $scope.datas = response;
                                        $scope.domains = response;
                                    });
                                }
                            });
                        }

                        else {
                            $scope.errorMessage = "Already exists";
                        }
                    });




                }

                else if (model == 'Label') {
                    var label = { name: $scope.name, description: $scope.description }

                    ModulesService.checkExistsLabel(label, function (response) {
                        if (response == false) {
                            ModulesService.createLabel(label, function (response) {
                                if (response == 'success') {
                                    $scope.name = "";
                                    $scope.description = "";
                                    $scope.actioncreated = model;
                                    angular.element('#createSuccess').modal('show');
                                    ModulesService.getLabelList(function (response) {
                                        $scope.datas = response;
                                    });
                                }
                            });
                        }

                        else {
                            $scope.errorMessage = "Already exists";
                        }
                    });
                }

                else if (model == 'Role') {
                    var role = { name: $scope.name, description: $scope.description }

                    ModulesService.checkExistsRole(role, function (response) {
                        if (response == false) {
                            ModulesService.createRole(role, function (response) {
                                if (response == 'success') {
                                    $scope.name = "";
                                    $scope.description = "";
                                    $scope.actioncreated = model;
                                    angular.element('#createSuccess').modal('show');
                                    ModulesService.getRoleList(function (response) {
                                        $scope.datas = response;
                                    });
                                }
                            });
                        }

                        else {
                            $scope.errorMessage = "Already exists";
                        }
                    });
                }

                else if (model == 'Approaches') {
                    var approaches = { name: $scope.name, description: $scope.description }
                    ModulesService.checkExistsApproach(approaches, function (response) {
                        if (response == false) {
                            ModulesService.createApproach(approaches, function (response) {
                                if (response == 'success') {
                                    $scope.name = "";
                                    $scope.description = "";
                                    $scope.actioncreated = model;
                                    angular.element('#createSuccess').modal('show');
                                    ModulesService.getApproachList(function (response) {
                                        $scope.datas = response;
                                    });
                                }
                            });

                        }
                        else {
                            $scope.errorMessage = "Already exists";
                        }
                    });



                }

                else if (model == 'Vertical') {
                    var vertical = { name: $scope.name, description: $scope.description }

                    ModulesService.checkExistsVertical(vertical, function (response) {
                        if (response == false) {

                            ModulesService.createVertical(vertical, function (response) {
                                if (response == 'success') {
                                    $scope.name = "";
                                    $scope.description = "";
                                    $scope.actioncreated = model;
                                    angular.element('#createSuccess').modal('show');
                                    ModulesService.getVerticalList(function (response) {
                                        $scope.datas = response;
                                    });
                                }
                            });

                        }

                        else {
                            $scope.errorMessage = "Already exists";
                        }
                    });
                }

                else if (model == 'Category') {
                    var category = { name: $scope.name, description: $scope.description }

                    ModulesService.checkExistsCategory(category, function (response) {
                        if (response == false) {
                            ModulesService.createCategory(category, function (response) {
                                if (response == 'success') {
                                    $scope.name = "";
                                    $scope.description = "";
                                    $scope.actioncreated = model;
                                    angular.element('#createSuccess').modal('show');
                                    ModulesService.getCategoryList(function (response) {
                                        $scope.datas = response;
                                    });
                                }
                            });

                        }
                        else {
                            $scope.errorMessage = "Already exists";
                        }
                    });




                }

                else if (model == 'Status') {
                    var status = { name: $scope.name, description: $scope.description }

                    ModulesService.checkExistsStatus(status, function (response) {
                        if (response == false) {
                            ModulesService.createStatus(status, function (response) {
                                if (response == 'success') {
                                    $scope.name = "";
                                    $scope.description = "";
                                    $scope.actioncreated = model;
                                    angular.element('#createSuccess').modal('show');
                                    ModulesService.getStatusList(function (response) {
                                        $scope.datas = response;
                                    });
                                }
                            });
                        }
                        else {
                            $scope.errorMessage = "Already exists";
                        }
                    });
                }
            }

            else {
                $scope.errorMessage = "Name is required";
            }
        }


        $scope.removeErrorMsg = function () {
            $scope.errorMessage = "";
        }

        $scope.getDetails = function (data) {
            var model = $scope.actionName;
            $scope.errorMessageForUpdate = "";
            if (model == 'Account') {
                $scope.data._id = data._id;
                $scope.data.name = data.name;
                $scope.data.description = data.description;
                $scope.data.weightedPipeline = data.weightedPipeline;
                if (data.domain != null) {

                    $scope.data.domain = data.domain._id;
                }
                else {
                    $scope.data.domain = null;
                }
                if (data.vertical != null) {
                    $scope.data.vertical = data.vertical._id
                }
                else {
                    $scope.data.vertical = null
                }

                if (data.accountType != null) {
                    $scope.data.accountType = data.accountType
                }
                else {
                    $scope.data.accountType = null
                }

                if (data.customerEngagement != null) {
                    $scope.data.customerEngagement = data.customerEngagement
                }
                else {
                    $scope.data.customerEngagement = null
                }

                if (data.customerInnovationAdaption != null) {
                    $scope.data.customerInnovationAdaption = data.customerInnovationAdaption
                }
                else {
                    $scope.data.customerInnovationAdaption = null
                }

            }
            else {
                $scope.data._id = data._id;
                $scope.data.name = data.name;
                $scope.data.description = data.description;
                $scope.data.domain = null;

                $scope.data.domain = null;
                $scope.data.accountType = null;
                $scope.data.customerEngagement = null;
                $scope.data.customerInnovationAdaption = null;
                $scope.data.vertical = null;
                $scope.data.weightedPipeline = "";
            }
        }

        $scope.updateModule = function () {
            $scope.errorMessageForUpdate = "";
            // $scope.actionId = null;
            var model = $scope.actionName;
            if (model == 'Account') {

                var x = $scope.data.weightedPipeline;
                var re = /^((0|[1-9]\d?)(\.\d{1,2})?|100(\.00?)?)$/;
                if (!re.test(x)) {
                    $scope.errorMessageForWeightage = "Invalid Weightage "
                }
                else {
                    $scope.errorMessageForWeightage = "";

                    var account = { name: $scope.data.name, description: $scope.data.description, domain: $scope.data.domain, _id: $scope.data._id, accountType: $scope.data.accountType, customerEngagement: $scope.data.customerEngagement, customerInnovationAdaption: $scope.data.customerInnovationAdaption, vertical: $scope.data.vertical, weightedPipeline: $scope.data.weightedPipeline }

                    ModulesService.checkExistsAccount(account, function (response) {
                        if (response == false) {
                            ModulesService.updateAccount(account, function (response) {
                                if (response == 'success') {
                                    $scope.data.name = "";
                                    $scope.data.description = "";
                                    $scope.data.domain = null;
                                    $scope.data.accountType = null;
                                    $scope.data.customerEngagement = null;
                                    $scope.data.customerInnovationAdaption = null;
                                    $scope.data.weightedPipeline = null;
                                    $scope.data.vertical = null;
                                    $scope.actionupdated = model;
                                    $scope.actionId = null;
                                    angular.element('#updateSuccess').modal('show');
                                    ModulesService.getAccountList(function (response) {
                                        $scope.datas = response;
                                    });
                                }
                            });
                        }


                        else {
                            $scope.errorMessageForUpdate = " Already exists";
                        }

                    });


                }
            }
            else if (model == 'Domain') {
                var domain = { name: $scope.data.name, description: $scope.data.description, _id: $scope.data._id }

                ModulesService.checkExistsDomain(domain, function (response) {
                    if (response == false) {
                        ModulesService.updateDomain(domain, function (response) {
                            if (response == 'success') {
                                $scope.data.name = "";
                                $scope.data.description = "";
                                $scope.actionupdated = model;
                                $scope.actionId = null;
                                angular.element('#updateSuccess').modal('show');
                                ModulesService.getDomainList(function (response) {
                                    $scope.datas = response;
                                    $scope.domains = response;
                                });
                            }
                        });
                    }

                    else
                    {
                        $scope.errorMessageForUpdate = "Already exists";
                    }
                });


 
            }

            else if (model == 'Label') {
                var label = { name: $scope.data.name, _id: $scope.data._id, description: $scope.data.description };
               
                ModulesService.checkExistsLabel(label, function (response) {
                    if (response == false) {
                        ModulesService.updateLabel(label, function (response) {
                            if (response == 'success') {
                                $scope.data.name = "";
                                $scope.data.description = "";
                                $scope.actionupdated = model;
                                $scope.actionId = null;
                                angular.element('#updateSuccess').modal('show');
                                ModulesService.getLabelList(function (response) {
                                    $scope.datas = response;
                                });
                            }
                        });
                    }

                    else
                    {
                        $scope.errorMessageForUpdate = "Already exists";
                    }
                });
                
            }

            else if (model == 'Role') {
                var role = { name: $scope.data.name, description: $scope.data.description, _id: $scope.data._id }

                ModulesService.checkExistsRole(role, function (response) {
                    if (response == false) {
                        ModulesService.updateRole(role, function (response) {
                            if (response == 'success') {
                                $scope.data.name = "";
                                $scope.data.description = "";
                                $scope.actionupdated = model;
                                $scope.actionId = null;
                                angular.element('#updateSuccess').modal('show');
                                ModulesService.getRoleList(function (response) {
                                    $scope.datas = response;
                                });
                            }
                        });
                    }
                    else {
                        $scope.errorMessageForUpdate = "Already exists";
                    }
                });

           


            }

            else if (model == 'Approaches') {
                var approaches = { name: $scope.data.name, description: $scope.data.description, _id: $scope.data._id }

                ModulesService.checkExistsApproach(approaches, function (response) {
                    if (response == false) {
                        ModulesService.updateApproach(approaches, function (response) {
                            if (response == 'success') {
                                $scope.data.name = "";
                                $scope.data.description = "";
                                $scope.actionupdated = model;
                                $scope.actionId = null;
                                angular.element('#updateSuccess').modal('show');
                                ModulesService.getApproachList(function (response) {
                                    $scope.datas = response;
                                });
                            }
                        });
                    }
                    else {
                        $scope.errorMessageForUpdate = "Already exists";
                    }
                });

          
            }

            else if (model == 'Vertical') {
                var vertical = { name: $scope.data.name, description: $scope.data.description, _id: $scope.data._id }
                
                ModulesService.checkExistsVertical(vertical, function (response) {
                    if (response == false) {
                        ModulesService.updateVertical(vertical, function (response) {
                            if (response == 'success') {
                                $scope.data.name = "";
                                $scope.data.description = "";
                                $scope.actionupdated = model;
                                $scope.actionId = null;
                                angular.element('#updateSuccess').modal('show');
                                ModulesService.getVerticalList(function (response) {
                                    $scope.datas = response;
                                });
                            }
                        });
                    }
                    else
                    {
                        $scope.errorMessageForUpdate = "Already exists";
                    }
                });





            }

            else if (model == 'Category') {
                var category = { name: $scope.data.name, description: $scope.data.description, _id: $scope.data._id }
                ModulesService.checkExistsCategory(category, function (response) {
                    if (response == false) {
                        ModulesService.updateCategory(category, function (response) {
                            if (response == 'success') {
                                $scope.data.name = "";
                                $scope.data.description = "";
                                $scope.actionupdated = model;
                                $scope.actionId = null;
                                angular.element('#updateSuccess').modal('show');
                                ModulesService.getCategoryList(function (response) {
                                    $scope.datas = response;
                                });
                            }
                        });
                    }

                    else
                    {
                        $scope.errorMessageForUpdate = "Already exists";
                    }
                });




            }

            else if (model == 'Status') {
                var status = { name: $scope.data.name, description: $scope.data.description, _id: $scope.data._id }

                ModulesService.checkExistsStatus(status, function (response) {
                    if (response == false) {
                        ModulesService.updateStatus(status, function (response) {
                            if (response == 'success') {
                                $scope.data.name = "";
                                $scope.data.description = "";
                                $scope.actionId = null;
                                $scope.actionupdated = model;
                                angular.element('#updateSuccess').modal('show');
                                ModulesService.getStatusList(function (response) {
                                    $scope.datas = response;
                                });
                            }
                        });
                    }

                    else {
                        $scope.errorMessageForUpdate = "Already exists";
                    }
                });

            }
        }


        $scope.deleteModule = function () {
            $scope.actionId = null;
            var model = $scope.actionName;
            if (model == 'Account') {
                ModulesService.deleteAccount($scope.data._id, function (response) {
                    if (response == 'success') {
                        $scope.data.name = "";
                        $scope.data.description = "";
                        $scope.data.domain = null;
                        $scope.data.accountType = null;
                        $scope.data.customerEngagement = null;
                        $scope.data.customerInnovationAdaption = null;
                        $scope.data.weightedPipeline = null;
                        $scope.data.vertical = null;
                        $scope.actiondeleted = model;
                        angular.element('#deleteSuccess').modal('show');
                        ModulesService.getAccountList(function (response) {
                            $scope.datas = response;
                        });



                    }
                });
            }
            else if (model == 'Domain') {
                ModulesService.deleteDomain($scope.data._id, function (response) {
                    if (response == 'success') {
                        $scope.data.name = "";
                        $scope.data.description = "";
                        $scope.actiondeleted = model;
                        angular.element('#deleteSuccess').modal('show');
                        ModulesService.getDomainList(function (response) {
                            $scope.datas = response;
                            $scope.domains = response;
                        });
                    }
                });
            }

            else if (model == 'Label') {
                ModulesService.deleteLabel($scope.data._id, function (response) {
                    if (response == 'success') {
                        $scope.data.name = "";
                        $scope.data.description = "";
                        $scope.actiondeleted = model;
                        angular.element('#deleteSuccess').modal('show');
                        ModulesService.getLabelList(function (response) {
                            $scope.datas = response;
                        });
                    }
                });
            }

            else if (model == 'Role') {
                ModulesService.deleteRole($scope.data._id, function (response) {
                    if (response == 'success') {
                        $scope.data.name = "";
                        $scope.data.description = "";
                        $scope.actiondeleted = model;
                        angular.element('#deleteSuccess').modal('show');
                        ModulesService.getRoleList(function (response) {
                            $scope.datas = response;
                        });
                    }
                });
            }

            else if (model == 'Approaches') {
                ModulesService.deleteApproach($scope.data._id, function (response) {
                    if (response == 'success') {
                        $scope.data.name = "";
                        $scope.data.description = "";
                        $scope.actiondeleted = model;
                        angular.element('#deleteSuccess').modal('show');
                        ModulesService.getApproachList(function (response) {
                            $scope.datas = response;
                        });
                    }
                });
            }

            else if (model == 'Vertical') {
                ModulesService.deleteVertical($scope.data._id, function (response) {
                    if (response == 'success') {
                        $scope.data.name = "";
                        $scope.data.description = "";
                        $scope.actiondeleted = model;
                        angular.element('#deleteSuccess').modal('show');
                        ModulesService.getVerticalList(function (response) {
                            $scope.datas = response;
                        });
                    }
                });
            }

            else if (model == 'Category') {
                ModulesService.deleteCategory($scope.data._id, function (response) {
                    if (response == 'success') {
                        $scope.data.name = "";
                        $scope.data.description = "";
                        $scope.actiondeleted = model;
                        angular.element('#deleteSuccess').modal('show');
                        ModulesService.getCategoryList(function (response) {
                            $scope.datas = response;
                        });
                    }
                });
            }


            else if (model == 'Status') {
                ModulesService.deleteStatus($scope.data._id, function (response) {
                    if (response == 'success') {
                        $scope.data.name = "";
                        $scope.data.description = "";
                        $scope.actiondeleted = model;
                        angular.element('#deleteSuccess').modal('show');
                        ModulesService.getStatusList(function (response) {
                            $scope.datas = response;
                        });
                    }
                });


            }
        }
    }
})(this.angular);