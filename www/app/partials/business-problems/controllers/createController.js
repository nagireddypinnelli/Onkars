
(function (angular) {
    'use strict';

    /*
     * @ngdoc overview
     * @name ProblemController
     * @description
     * 
     * Controller for the problem module.
     * ====================================
     */

    angular
        .module('id3.problem')
        .controller('ProblemCreateController', ProblemCreateController);

    ProblemCreateController.$inject = ['$scope', '$state', 'ProblemService', '$timeout', '$window', '$rootScope', '$mdDialog', 'Upload'];
    function ProblemCreateController($scope, $state, ProblemService, $timeout, $window, $rootScope, $mdDialog, Upload) {
        $window.scrollTo(0, 0);
        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');    
        //if ($window.sessionStorage.getItem('loggedInUserSession') == 'null' || $window.sessionStorage.getItem('loggedInUserSession') == null) {
        //    $state.go('app.home')
        //}

       
        var username = $window.sessionStorage.getItem('userName');
        $scope.reverseSort = false;
        $scope.level = "none";
        $scope.account = "";
        $scope.vertical = "";
        $scope.showAddcontributorsSelectBox = 0;
        $scope.categories = "";
        $scope.domains = "";
        $scope.users = "";
        $scope.test = 0;
        $scope.showestimateOfCustomerErrorMsg = 0;
        $scope.ustShareErrorMsg = 0;

        $scope.data = {
            problemStatement: '',
            attachments: [],
            customerStakeholders: [
              {
                  name: '',
                  role: ''
              }
            ],
            targetBusinessGeography: [
              {
                  businessUnit: '',
                  geography: ''
              }
            ],
            customerPains: [
              {
                  description: '',
                  quantifiedValue: '',
                  stackholders: [{
                      name: '',
                      role: ''
                  }],
                  impactedTask: ''
              }
            ],
            customerGains: [
              {
                  description: '',
                  quantifiedValue: '',
                  stackholders: [{
                      name: '',
                      role: ''
                  }],
                  impactedTask: ''
              }
            ],
            phase: "",
            status: "",
            category: null,
            account: "",
            domain: null,
            vertical: null,
            // vertical :[] 
            businessImpact: "",
            estimateOfCustomer: "",
            ustShare: "",
            priority: "Low",
            otherInfo: "",
            assumptions: "",
            createdBy: username,
            //  owner: null,
        };
        $scope.problem = {
            vertical: ""
        }
        $scope.validation = {
            "problemStatementError": false

        };


        $rootScope.$on("AssignProblemTitle", function (event, data) {
            $scope.data.title = data;
        });



        if ($rootScope.AssignProblemTitle != undefined) {
            $scope.data.title = $rootScope.AssignProblemTitle;
        }

        ProblemService.getAccountList(function (response) {
            //console.log(response);
            $scope.accounts = response;
        });




        ProblemService.getCategoryList(function (category) {
            $scope.categories = category;
        });

        ProblemService.getLoggedInUserDetails(loggedInUser, function (response) {
            
            $scope.userDetails = response;
            $scope.data.account = response.account._id;
            $scope.domainname = response.account.domain.name;
            $scope.verticalname = response.account.vertical.name;

            if (response.account.domain == null) {
                $scope.domainname = "";
                $scope.data.domain = null;
            }
            else {
                $scope.domainname = response.account.domain.name;
                $scope.data.domain = response.account.domain._id;

                console.log(response.account.domain._id);
            }
            if (response.account.vertical == null) {
                $scope.verticalname = "";
                $scope.data.vertical = null;
            }
            else {
                $scope.verticalname = response.account.vertical.name;
                $scope.data.vertical = response.account.vertical._id;
            }
        });

        ProblemService.getVerticalList(function (vertical) {
            $scope.verticals = vertical;
        });

        ProblemService.getDiomainList(function (domain) {
            $scope.domains = domain;
        });

        ProblemService.getUserList(function (users) {
            $scope.users = users;
            //console.log(users);
        });

        $scope.addcontributors = function () {
            // creating a temporary JS object with fields
            //  var temp = "";
            //   $scope.data.contributors.push(temp);
            $scope.showAddcontributorsSelectBox = 1;
        }

        $scope.removecontributors = function (index) {
            var temp = "";
            $scope.data.contributors.splice(index, 1);
            $scope.changeContributors();
        }


        $scope.removeDocument = function (index) {
            $scope.data.attachments.splice(index, 1);
        }

        $scope.addCustomerstakholder = function () {
            var temp = {
                name: '',
                role: ''
            }
            $scope.data.customerStakeholders.push(temp);
        };

        $scope.removeCustomerStakholder = function (index) {
            $scope.data.customerStakeholders.splice(index, 1);
        }

        $scope.hideErrorMesssage = function (field) {
            if (field == 'category') {
                angular.element('#categorySelectBox').children('.error').remove();
            }
            if (field == 'account') {
                angular.element('#accountSelectBox').children('.error').remove();
            }
        }

        $scope.addCustomerPains = function () {
            var temp = {
                description: '',
                quantifiedValue: '',
                stackholders: [{
                    name: '',
                    role: ''
                }],
                impactedTask: ''
            }
            $scope.data.customerPains.push(temp);
        };
        $scope.removeCustomerPains = function (index) {
            $scope.data.customerPains.splice(index, 1);
        }

        $scope.solutionNeedDateChange = function () {
            $timeout(function () {
                angular.element('#samplebutton').triggerHandler('click');

            }, 100);

            //$scope.popup3 = {
            //    opened: false
            //};
            // document.getElementById('solutionNeedDate').focus();
            // angular.element('#solutionNeedDate').trigger('click');
        }

        $scope.addCustomerPainsStackholder = function (index) {
            var temp = {
                name: '',
                role: ''
            }
            $scope.data.customerPains[index].stackholders.push(temp);
        };
        $scope.removeCustomerPainsStackholder = function (parentIndex, index) {
            $scope.data.customerPains[parentIndex].stackholders.splice(index, 1);
        }

        $scope.addCustomerGains = function () {
            var temp = {
                description: '',
                quantifiedValue: '',
                stackholders: [{
                    name: '',
                    role: ''
                }],
                impactedTask: ''
            }
            $scope.data.customerGains.push(temp);
        };

        $scope.removeCustomerGains = function (index) {
            $scope.data.customerGains.splice(index, 1);
        }

        $scope.addCustomerGainsStackholder = function (index) {
            var temp = {
                name: '',
                role: ''
            }
            $scope.data.customerGains[index].stackholders.push(temp);
        };
        $scope.removeCustomerGainsStackholder = function (parentIndex, index) {
            $scope.data.customerGains[parentIndex].stackholders.splice(index, 1);
        }

        $scope.addTargetBusinessGeography = function () {
            var temp = {
                businessUnit: '',
                geography: ''
            }
            $scope.data.targetBusinessGeography.push(temp);
        };

        $scope.removeTargetBusinessGeography = function (index) {
            $scope.data.targetBusinessGeography.splice(index, 1);
        }

        $scope.showDomain = function (account) {
            angular.element('.accountSelectBox').children('.error').remove();
            if (account == "") {
                $scope.domain = "";
            }
            else {
                angular.forEach($scope.accounts, function (value, key) {
                    if (value._id == account) {
                        if (value.domain == null) {
                            $scope.domainname = "";
                            $scope.data.domain = null;
                        }
                        else {
                            $scope.domainname = value.domain.name;
                            $scope.data.domain = value.domain._id;
                        }

                        if (value.vertical == null) {
                            $scope.verticalname = "";
                            $scope.data.vertical = null;
                        }
                        else {

                            $scope.verticalname = value.vertical.name;
                            $scope.data.vertical = value.vertical._id;
                        }
                    }
                });
                //var domain = JSON.parse(account);
                //$scope.domainname = domain.domain.name;
                //$scope.domain = domain.domain._id;
                angular.element('#accountSelectBox').children('.error').remove()
            }
        }

        $scope.updateProblem = function () {
            //$scope.data.owner = loggedInUser;
            if ($scope.data.domain == "") {
                $scope.data.domain = null;
            }

            if ($scope.data.domain == "") {
                $scope.data.domain = null;
            }
            if ($scope.data.account == "") {
                $scope.data.account = null
            }
            if ($scope.data.category == "") {
                $scope.data.category = null
            }
            if ($scope.problem.vertical != "") {
                $scope.data.vertical = $scope.problem.vertical;
            }

            ProblemService.update($scope.data, function (response) {
                // $scope.data.owner = username;
                $rootScope.$emit("getDraftProblem", {});
            });
        },

        $scope.saveProblem = function () {
            var problem = $scope.data;

            if ($scope.data._id == "" || $scope.data._id == undefined) {
                if (problem.title != undefined && problem.title != "") {
                    $scope.data.createdBy = loggedInUser;
                    // $scope.data.owner = loggedInUser;
                    if (problem.domain == "") {
                        problem.domain = null;
                    }
                    if (problem.account == "") {
                        problem.account = null
                    }
                    if (problem.category == "") {
                        problem.category = null
                    }
                    problem.approvalStatus = {
                        "approvalStatus": "new", "approvedUser": loggedInUser
                    };
                    if ($scope.problem.vertical != "") {
                        problem.vertical = $scope.problem.vertical;
                    }
                    ProblemService.saveInDraft(problem, function (response) {
                        $scope.showestimateOfCustomerErrorMsg = 0;
                        $scope.ustShareErrorMsg = 0;
                        $scope.contributors = [];
                        $scope.contributorsDetail = [];
                        $scope.data._id = response._id;
                        $scope.data.status = response.status;
                        $scope.data.createdBy = username;
                        // $scope.data.owner = username;
                        $scope.data.phase = response.phase;
                        angular.element('#modalSaveSuccess').modal('show');
                        $rootScope.$emit("getDraftProblem", {});


                    });
                }
            }
            else {
                $scope.updateProblem();
                angular.element('#modalSaveSuccess').modal('show');
            }
        }

        $scope.saveAndClose = function () {
            //var problem = $scope.data;                
            //if (problem.title != undefined && problem.title !="")
            //{
            //    $scope.data.createdBy = loggedInUser;
            //    $scope.data.owner = loggedInUser;
            //if (problem.domain == "") {
            //    problem.domain = null;
            //}
            //if (problem.account == "") {
            //    problem.account = null
            //}
            //if (problem.category == "") {
            //    problem.category = null
            //}
            ////var account = JSON.parse($scope.data.account);
            ////problem.account = account._id;
            ////if (account.domain != undefined || account.domain !=null)
            ////{
            ////    problem.domain = account.domain._id;
            ////}
            ////else
            ////{
            ////    problem.domain = null;
            ////}
            //problem.approvalStatus = {
            //    "approvalStatus": "new", "approvedUser": loggedInUser
            //};
            //if ($scope.problem.vertical != "") {
            //    problem.vertical = $scope.problem.vertical;
            //}
            //ProblemService.saveInDraft(problem, function (response) {
            //    $scope.showestimateOfCustomerErrorMsg = 0;
            //    $scope.ustShareErrorMsg = 0;
            //    $scope.contributors = [];
            //    $scope.contributorsDetail = [];
            //    //$scope.data._id = response._id;
            //    //$scope.data.status = response.status;
            //    //$scope.data.createdBy = username;
            //    //$scope.data.phase = response.phase;
            $scope.data = {
                problemStatement: '',
                attachments: [],
                customerStakeholders: [
                  {
                      name: '',
                      role: ''
                  }
                ],
                targetBusinessGeography: [
                  {
                      businessUnit: '',
                      geography: ''
                  }
                ],
                customerPains: [
                  {
                      description: '',
                      quantifiedValue: '',
                      stackholders: [{
                          name: '',
                          role: ''
                      }],
                      impactedTask: ''
                  }
                ],
                customerGains: [
                  {
                      description: '',
                      quantifiedValue: '',
                      stackholders: [{
                          name: '',
                          role: ''
                      }],
                      impactedTask: ''
                  }
                ],
                phase: "",
                status: "",
                category: null,
                account: "",
                domain: null,
                // vertical :[] ,
                vertical: null,
                businessImpact: "",
                estimateOfCustomer: "",
                ustShare: "",
                priority: "Low",
                otherInfo: "",
                assumptions: "",
                createdBy: username,
                //  owner: null,
            };
            //    $rootScope.$emit("ReloadProblem", {
            //    });
            //    $state.go('app.problems');
            //});
            //}
            angular.element('html, body').animate({
                scrollTop: $("#myNav").offset().top
            }, 2000);

            angular.element("#myNav").css('height', '0%');

            angular.element("body").css('overflow-y', 'scroll');

            angular.element("body").css('position', 'static');

            angular.element('.wizard .content').hide();

            angular.element('.wizard>.content').css({ 'width': (($('body').width())) + 'px' });

            angular.element('.container-content.create').css({ 'z-index': '0', 'display': 'none' });

            angular.element("nav.nav-main").css('opacity', '1');     //save and close

            ProblemService.getLoggedInUserDetails(loggedInUser, function (response) {
                $scope.userDetails = response;
                $scope.data.account = response.account._id;
                $scope.domainname = response.account.domain.name;
                $scope.verticalname = response.account.vertical.name;


                if (response.account.domain == null) {
                    $scope.domainname = "";
                    $scope.data.domain = null;
                }
                else {
                    $scope.domainname = response.account.domain.name;
                    $scope.data.domain = response.account.domain._id;
                }

                if (response.account.vertical == null) {
                    $scope.verticalname = "";
                    $scope.data.vertical = null;
                }
                else {

                    $scope.verticalname = response.account.vertical.name;
                    $scope.data.vertical = response.account.vertical._id;
                }


                });
                angular.element('.error').text("");
                $scope.showestimateOfCustomerErrorMsg = 0;
                $scope.ustShareErrorMsg = 0;
                $scope.contributorsDetails = [];
                $rootScope.$emit("ReloadProblem", {
                });
             }

        $scope.updateFinalFormProblem = function () {
            if ($scope.data.domain == "") {
                $scope.data.domain = null;
            }
            ProblemService.updateFinalFormProblem($scope.data, function (response) {
                $scope.showestimateOfCustomerErrorMsg = 0;
                $scope.ustShareErrorMsg = 0;
                $scope.contributors = [];
                $scope.contributorsDetail = [];
                $scope.contributorsDetails = [];
                $scope.data = {
                    title: '',
                    problemStatement: '',
                    attachments: [],
                    customerStakeholders: [
                      {
                          name: '',
                          role: ''
                      }
                    ],
                    targetBusinessGeography: [
                      {
                          businessUnit: '',
                          geography: ''
                      }
                    ],
                    customerPains: [
                      {
                          description: '',
                          quantifiedValue: '',
                          stackholders: [{
                              name: '',
                              role: ''
                          }],
                          impactedTask: ''
                      }
                    ],
                    customerGains: [
                      {
                          description: '',
                          quantifiedValue: '',
                          stackholders: [{
                              name: '',
                              role: ''
                          }],
                          impactedTask: ''
                      }
                    ],
                    phase: "",
                    status: "",
                    category: null,
                    account: "",
                    domain: null,
                    //  vertical :[] ,
                    vertical: null,
                    businessImpact: "",
                    estimateOfCustomer: "",
                    ustShare: "",
                    priority: "Low",
                    otherInfo: "",
                    assumptions: "",
                    createdBy: username,
                };


                //angular.element("#myNav").css('height', '0%');

                //angular.element("body").css('overflow-y', 'scroll');

                //angular.element('.wizard .content').hide();

                //angular.element('.container-content.create').css({ 'z-index': '0', 'display': 'none' })

                //angular.element("body").css('position', 'static');


                //angular.element("nav.nav-main").css('opacity', '1');

                angular.element("body").css('position', 'static');

                angular.element('#modalCreateSuccess').modal('show');

                $rootScope.$emit("ReloadProblem", {
                });


                ProblemService.getLoggedInUserDetails(loggedInUser, function (response) {
                    $scope.userDetails = response;
                    $scope.data.account = response.account._id;
                    $scope.domainname = response.account.domain.name;
                    $scope.verticalname = response.account.vertical.name;


                    if (response.account.domain == null) {
                        $scope.domainname = "";
                        $scope.data.domain = null;
                    }
                    else {
                        $scope.domainname = response.account.domain.name;
                        $scope.data.domain = response.account.domain._id;
                    }

                    if (response.account.vertical == null) {
                        $scope.verticalname = "";
                        $scope.data.vertical = null;
                    }
                    else {

                        $scope.verticalname = response.account.vertical.name;
                        $scope.data.vertical = response.account.vertical._id;
                    }


                });

                $state.go('app.problems');

            });
        }


        $scope.createProblem = function () {

            if (angular.element("#businessProblemForm").valid()) {
                if ($scope.data._id == "" || $scope.data._id == undefined)
                {
            $scope.data.createdBy = loggedInUser;
         //   $scope.data.owner = loggedInUser;
            var problem = $scope.data;
            if (problem.domain == "") {
                problem.domain = null;
            }
            //var account = JSON.parse($scope.data.account);
            //problem.account = account._id;
            //if (account.domain != undefined || account.domain !=null)
            //{
            //    problem.domain = account.domain._id;
            //}
            //else
            //{
            //    problem.domain = null;
            //}
            problem.approvalStatus = {
                "approvalStatus": "new", "approvedUser": loggedInUser
            };
            if ($scope.problem.vertical != "") {
                problem.vertical = $scope.problem.vertical;
            }          
            ProblemService.create(problem, function (response) {
                $scope.showestimateOfCustomerErrorMsg = 0;
                $scope.ustShareErrorMsg = 0;
                $scope.contributors = [];
                $scope.contributorsDetail = [];
                //$scope.data._id = response._id;
                //$scope.data.status = response.status;
                //$scope.data.createdBy = username;
                //$scope.data.phase = response.phase;
                $scope.data = {
                    title: '',
                    problemStatement: '',
                    attachments: [],
                    customerStakeholders: [
                      {
                          name: '',
                          role: ''
                      }
                    ],
                    targetBusinessGeography: [
                      {
                          businessUnit: '',
                          geography: ''
                      }
                    ],
                    customerPains: [
                      {
                          description: '',
                          quantifiedValue: '',
                          stackholders: [{
                              name: '',
                              role: ''
                          }],
                          impactedTask: ''
                      }
                    ],
                    customerGains: [
                      {
                          description: '',
                          quantifiedValue: '',
                          stackholders: [{
                              name: '',
                              role: ''
                          }],
                          impactedTask: ''
                      }
                    ],
                    phase: "",
                    status: "",
                    category: null,
                    account: "",
                    domain: null,
                   // vertical: null,
                    businessImpact: "",
                    estimateOfCustomer: "",
                    ustShare: "",
                    priority: "Low",
                    otherInfo: "",
                    assumptions: "",
                    createdBy: username,
                   // vertical :[]                  
                };

                $scope.contributorsDetails =[];
                //angular.element("nav.nav-main").css('opacity', '1');
                $rootScope.$emit("ReloadProblem", {
                });

                        ProblemService.getLoggedInUserDetails(loggedInUser, function (response) {
                            $scope.userDetails = response;
                            $scope.data.account = response.account._id;
                            $scope.domainname = response.account.domain.name;
                            $scope.verticalname = response.account.vertical.name;


                            if (response.account.domain == null) {
                                $scope.domainname = "";
                                $scope.data.domain = null;
                            }
                            else {
                                $scope.domainname = response.account.domain.name;
                                $scope.data.domain = response.account.domain._id;
                            }

                            if (response.account.vertical == null) {
                                $scope.verticalname = "";
                                $scope.data.vertical = null;
                            }
                            else {

                                $scope.verticalname = response.account.vertical.name;
                                $scope.data.vertical = response.account.vertical._id;
                            }


                        });
                        $state.go('app.problems');
                    });

                    angular.element("body").css('position', 'static');

                    angular.element('#modalCreateSuccess').modal('show');

                    //angular.element("#myNav").css('height', '0%');

                    //angular.element("body").css('overflow-y', 'visible');

                    //angular.element('.wizard .content').hide();

                    //angular.element('.container-content.create').css({ 'z-index': '0', 'display': 'none' })

                }
                else {
                    $scope.updateFinalFormProblem();
                }
            }

        }

        $scope.changeContributors = function () {
            var contributors = $scope.data.contributors;
            $scope.contributorsDetails = [];
            if (contributors.length > 0) {
                for (var i = 0; i < contributors.length; i++) {
                    angular.forEach($scope.users, function (value, key) {
                        if (value._id == contributors[i]) {
                            $scope.contributorsDetails.push(value);
                        }
                    });
                }
            }
        }

        $scope.CheckeValidNumber = function (type) {
            if (type == 'estimateOfCustomer') {
                var data = $scope.data.estimateOfCustomer;
                data = data.replace(/,/g, "");
                data = data.replace('$', '');
                var letters = /^[0-9-+]+$/;
                if (data == "") {
                    $scope.showestimateOfCustomerErrorMsg = 0;
                }

                else if (!letters.test(data)) {
                    $scope.showestimateOfCustomerErrorMsg = 1;
                    angular.element('#input_20-error').hide();
                }
                else {
                    $scope.showestimateOfCustomerErrorMsg = 0;
                    data = (data + "").toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                    $scope.data.estimateOfCustomer = '$' + data;
                    // var value = angular.element('#estimateOfCustomer').formatCurrency();
                    // console.log(value);
                }
            }

            else {
                var data = $scope.data.ustShare;
                data = data.replace(/,/g, "");
                data = data.replace('$', '');
                var letters = /^[0-9-+]+$/;
                if (data == "") {
                    $scope.ustShareErrorMsg = 0;
                }
                else if (!letters.test(data)) {
                    $scope.ustShareErrorMsg = 1;
                    angular.element('#input_20-error').hide();
                }
                else {
                    $scope.ustShareErrorMsg = 0;
                    data = (data + "").toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                    $scope.data.ustShare = '$' + data;
                }
            }
        }

        /* start file upload function */
        $scope.mindate = new Date();

        $scope.submitFile = function () {
            $scope.upload($scope.file);
        }

        $scope.upload = function (file) {

        console.log(file);


            if  (file == "")
                {   
                return;
                }

           else if (file != undefined)
            {
            $scope.progressVisible = true;
            Upload.upload({
                url: '/api/create/upload',
                data: { file: file }
            }).then(function (resp) {

                if (resp.data.error_code === 0) {

                console.log("create",resp.config.data.file.name);

                    var temp = {
                        attachment: resp.config.data.file.name,
                        orginalFilename: resp.data.file_name,
                        attchedUser: loggedInUser
                    }
                    $scope.data.attachments.push(temp);
                    $scope.progressVisible = false;
                    $scope.file = "";
                    angular.element('#uploadText').text('Upload Documents');
                    //$window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                } else {
                    //$window.alert('an error occured');
                }
            }, function (resp) { //catch error
                //$window.alert('Error status: ' + resp.status);
            }, function (evt) {
                //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                //if (progressPercentage == 100)
                //    {
                //    $scope.progressVisible = false;
                //    }
            });

            }
        };


        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
              mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function () {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open3 = function () {
            $scope.popup3.opened = true;
        };

        $scope.setDate = function (year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMM-yyyy', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];



        $scope.popup3 = {
            opened: false
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            showWeeks: 'false'
        };


        $rootScope.$on("updateDraftProblem", function (event, problemId) {
            
            ProblemService.getProblemById(problemId, function (response) {
                $scope.data = response;
                console.log(response);
                if (response.solutionNeedDate == null || response.solutionNeedDate == undefined) {
                    $scope.data.solutionNeedDate = "";
                }
                else {
                    $scope.data.solutionNeedDate = new Date(response.solutionNeedDate);
                    $scope.solutionClosureMinDate = new Date(response.solutionNeedDate);
                }

 
                if ($scope.data.category != null) {
                    if ($scope.data.category[0] != null) {
                        $scope.data.category = response.category[0]._id;
                    }
                    else {
                        $scope.data.category = ""
                    }
                }

                else {
                    $scope.data.category = ""
                }
  
                if (response.domain != null) {
                    $scope.data.domain = response.domain._id;
                }

                if (response.vertical != null && response.vertical.length > 0) {
                    $scope.data.vertical = response.vertical[0]._id;
                }

                if(response.account !=null)
                {
                    $scope.data.account = response.account._id;
                }

                if(response.contributors.length >0)
                {
                    $scope.showAddcontributorsSelectBox = 1
                    $scope.changeContributors();
                }
                else {
                    $scope.showAddcontributorsSelectBox = 0
                }
            });

        });


        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
    {
        date: afterTomorrow,
        status: 'partially'
    }
        ];

        function getDayClass(data) {
            var date = data.date,
              mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }


        /* end file upload function */
    }
})(this.angular);