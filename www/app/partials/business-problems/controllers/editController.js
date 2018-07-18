
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
        .controller('ProblemEditController', ProblemEditController);

    ProblemEditController.$inject = ['$scope', '$state', 'ProblemService', '$timeout', '$window', '$rootScope', '$mdDialog', '$stateParams', 'Upload'];
    function ProblemEditController($scope, $state, ProblemService, $timeout, $window, $rootScope, $mdDialog, $stateParams, Upload) {
        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $scope.roleSession = $window.sessionStorage.getItem('roleSession');
        $window.scrollTo(0, 0);
        $scope.reverseSort = false;
        $scope.level = "none";
        $scope.account = "";
        $scope.categories = "";
        $scope.domains = "";
        $scope.phases = "";
        $scope.status = "";
        $scope.users = "";
        $scope.approaches = "";
        $scope.labels = "";
        $scope.selectedlable = ""
        $scope.problemApproach = "";
        $scope.newlabel = "";
        $scope.data = {
            title: '',
            problemStatement: '',
            contributors: [""],
            customerStakholders: [
              {
                  name: '',
                  role: ''
              }
            ],
            phase: "",
            category: "",
            account: "",
            domain: "",
            businessImpact: "",
            estimate: "",
            ustShare: "",
            targetBusinessGeography: [
              {
                  businessUnit: '',
                  geography: ''
              }
            ],
            otherInfo: "",
            assumptions: "",
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
            createdBy: loggedInUser
        };
        $scope.displayFilteroption = true;
        $scope.displayRecent = true;
        $scope.displaytimeline = true;
        $scope.innovationChampionUsers = [];

        $scope.$watch('createTilte', function (newValue, oldValue) {
            if (newValue != undefined) {
                $rootScope.$emit("AssignProblemTitle", newValue);
                // $rootScope.AssignProblemTitle = newValue;
                // $scope.data.title = newValue;
            }
        });

        if ($window.sessionStorage.getItem('loggedInUserSession') == 'null' || $window.sessionStorage.getItem('loggedInUserSession') == null) {
            $state.go('app.home')
        }

        $scope.validation = {
            "title": false,
            "problemStatement": false,
            "businessImpact": false,
            "account": false,
            "customerStakeholdersName": false,
            "customerStakeholdersRole": false,
            "targetBusinessGeographyGeography": false,
            "targetBusinessGeographyBusinessUnit": false,
            "estimateOfCustomer": false,
            "ustShare": false,
            "solutionNeedDate": false,
            "customerGainsDescription": false,
            "customerGainsImpactedTask": false,
            "customerGainsQuantifiedValue": false,
            "customerGainsstackholdersName": false,
            "customerGainsstackholdersRole": false,
            "customerPainDescription": false,
            "customerPainImpactedTask": false,
            "customerPainQuantifiedValue": false,
            "customerPainStackholdersName": false,
            "customerPainStackholdersRole": false
        };

        $scope.solutionClosureMinDate = new Date();
        ProblemService.getProblemById($stateParams.id, function (response) {
            $scope.data = response;
            console.log(response);
            if (response.solutionNeedDate == null || response.solutionNeedDate == undefined) {
                $scope.data.solutionNeedDate = "";
            }
            else {
                $scope.data.solutionNeedDate = new Date(response.solutionNeedDate);
                $scope.solutionClosureMinDate = new Date(response.solutionNeedDate);
            }

            if (response.solutionPlannedClosureDate == null || response.solutionPlannedClosureDate == undefined) {
                $scope.data.solutionPlannedClosureDate = "";
            }
            else
                $scope.data.solutionPlannedClosureDate = new Date(response.solutionPlannedClosureDate)
            if (response.phase != null) {
                $scope.data.phase = response.phase._id;
            }

            //if (response.innovationChampion == undefined || response.innovationChampion== null)
            //{
            //    $scope.data.innovationChampion = null;
            //}
            //else {
            //    $scope.data.innovationChampion = response.innovationChampion._id;
            //}

            if ($scope.data.category != null) {
                if ($scope.data.category[0] != null) {
                    $scope.data.category = response.category[0]._id;
                }
                else {
                    $scope.data.category = "null"
                }
            }

            else {
                $scope.data.category = "null"
            }


            if ($scope.data.approach != null) {
                $scope.data.approach = $scope.data.approach._id;
                $scope.approach = $scope.data.approach;
            }

            if(response.innovationChampion == undefined)
            {

                $scope.data.innovationChampion = "null";
            }

            else if (response.innovationChampion != null) {
                $scope.data.innovationChampion = response.innovationChampion._id;
            }
            else {
                $scope.data.innovationChampion = "null";
            }
            //if (response.owner == undefined) {

            //    $scope.data.owner = "null";
            //}

            //else if (response.owner != null) {
            //    $scope.data.owner = response.owner._id;
            //}
            //else {
            //    $scope.data.owner = "null";
            //}

            ProblemService.getUserList(function (users) {
                $scope.users = users;
                $scope.changeContributors();
                $scope.changeSolutionContributors();
            });

            if (response.domain != null)
            {
                $scope.data.domain = response.domain._id;
            }

            if (response.vertical != null && response.vertical.length >0)
            {
                $scope.data.vertical = response.vertical[0]._id;
            }


            //if ($scope.data.solutionPlannedClosureDate == "Invalid Date" || $scope.data.solutionPlannedClosureDate==null) $scope.data.solutionPlannedClosureDate = "";
            //$scope.data.category = "";          
            //if (response.vertical == null) {
            //}
            //else if (response.vertical.length == 0) {

            //    $scope.data.vertical = "";
            //}
            //else if (response.vertical[0] != null) {
            //    $scope.data.vertical = response.vertical[0]._id;
            //}
            //else {
            //    $scope.data.vertical = "";
            //}

         
        });

        ProblemService.getAccountList(function (response) {
            $scope.accounts = response;
        });

        //ProblemService.getInnovationchampions(function (InnovationChampionUsers) {
        //    $scope.innovationChampionUsers = InnovationChampionUsers;
        //});

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

        $scope.showDomain = function (account) {
            if (account.domain != null)
            {
                $scope.data.domain = account.domain._id;
            }
            else
            {
                $scope.data.domain = null;
            }
            if (account.vertical != null)
            {
                $scope.data.vertical = account.vertical._id;
            }
            else
            {
                $scope.data.vertical = null;
            }
            
        }

        ProblemService.getCategoryList(function (category) {
            $scope.categories = category;
        });

        ProblemService.getVerticalList(function (vertical) {
            $scope.verticals = vertical;
        });

        ProblemService.getDiomainList(function (domain) {
            $scope.domains = domain;
        });

        ProblemService.getPhaseList(function (phase) {
            $scope.phases = phase;
            angular.forEach(phase, function (value, key) {
                if (phase._id == $scope.data.phase) {
                    $scope.changePhase(value);
                }
            })
        });

        ProblemService.getStatusList(function (status) {
            $scope.status = status;
        });


        ProblemService.getApproachList(function (approach) {
            $scope.approaches = approach;
        });

        ProblemService.getLabelList(function (labels) {
            $scope.labels = labels;
            //$scope.problemLabel = [];
            //if ($scope.data.labels != undefined || $scope.data.labels > 0)
            //{
            angular.forEach($scope.labels, function (value, key) {

                //var j = 0;
                //for (var i = 0; i < $scope.data.labels.length; i++)
                //{
                //    if($scope.labels[i]._id =value )
                //    {
                //        $scope.problemLabel[i] = value;
                //        j = 1;
                //        break;
                //    }

                //}
                //if(j=0)
                //{
                //    $scope.problemLabel[i] = undefined;
                //}
                $scope.labels[key].Selected = true;

            });
            //}

        });

        $scope.addcontributors = function () {
            var temp = "";
            $scope.data.contributors.push(temp);
        }

        $scope.removecontributors = function (index) {
            var temp = "";
            $scope.data.contributors.splice(index, 1);
            $scope.changeContributors();
        }

        $scope.addsolutionContributors = function () {
            var temp = "";
            $scope.data.solutionContributors.push(temp);
        }

        $scope.removeSolutionContributors = function (index) {
            var temp = "";
            $scope.data.solutionContributors.splice(index, 1);
            $scope.changeSolutionContributors();
        }

        $rootScope.$on("ReloadProblem", function () {
            $scope.createTilte = "";
        });


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

        $scope.goToCreatorId3 = function (uId) {
            $state.go('app.problems/:uId', {
                uId: uId
            });
        }

        /* start file upload function */
        $scope.submit = function () {
            $scope.upload($scope.fileupload);
        }
        $scope.upload = function (file) {

            if (file == "") {
                return;
            }

            else if (file != undefined) {
                $scope.progressVisible = true;
                Upload.upload({
                    url: '/api/create/upload',
                    data: { file: file }
                }).then(function (resp) {

                    if (resp.data.error_code === 0) {

                        var temp = {
                            attachment: resp.config.data.file.name,
                            orginalFilename: resp.data.file_name,
                            attchedUser: loggedInUser
                        }
                        $scope.data.attachments.push(temp);
                        $scope.progressVisible = false;
                        $scope.fileupload = "";
                        angular.element('#uploadText1').text('Upload Documents');
                        //$window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                    } else {
                        //$window.alert('an error occured');
                    }
                }, function (resp) { //catch error
                    //$window.alert('Error status: ' + resp.status);
                }, function (evt) {
                    //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                });
            }
        };

        /* end file upload function */

        $scope.updateProblem = function () {
            //$scope.validation = {
            //    "title": false,
            //    "problemStatement": false,
            //    "businessImpact": false,
            //    "account": false,
            //    "customerStakeholdersName": false,
            //    "customerStakeholdersRole": false,
            //    "targetBusinessGeographyGeography": false,
            //    "targetBusinessGeographyBusinessUnit": false,
            //    "estimateOfCustomer": false,
            //    "ustShare": false,
            //    "solutionNeedDate": false,
            //    "customerGainsDescription": false,
            //    "customerGainsImpactedTask": false,
            //    "customerGainsQuantifiedValue": false,
            //    "customerGainsstackholdersName": false,
            //    "customerGainsstackholdersRole": false,
            //    "customerPainDescription": false,
            //    "customerPainImpactedTask": false,
            //    "customerPainQuantifiedValue": false,
            //    "customerPainStackholdersName": false,
            //    "customerPainStackholdersRole": false
            //};

            //var msg = false;

            //if ($scope.data.title == null || $scope.data.title == "") {
            //    msg = true;
            //    $scope.validation.title = true;
            //}
            //if ($scope.data.problemStatement == null || $scope.data.problemStatement == "") {
            //    msg = true;
            //    $scope.validation.problemStatement = true;
            //}

            //if ($scope.data.businessImpact == null || $scope.data.businessImpact == "") {
            //    msg = true;
            //    $scope.validation.businessImpact = true;
            //}

            ////if ($scope.data.category == null || $scope.data.category == "") {
            ////    msg = true;
            ////    $scope.validation.category = true;
            ////}

            //if ($scope.data.account == null || $scope.data.account == "") {
            //    msg = true;
            //    $scope.validation.account = true;
            //}

            //if ($scope.data.estimateOfCustomer == null || $scope.data.estimateOfCustomer == "") {
            //    msg = true;
            //    $scope.validation.estimateOfCustomer = true;
            //}
            //else {
            //    var isValid = /^\$?(([1-9](\d*|\d{0,2}(,\d{3})*))|0)(\.\d{1,2})?$/.test($scope.data.estimateOfCustomer);
            //    if (!isValid) {
            //        msg = true;
            //        $scope.validation.estimateOfCustomer = true;
            //    }
            //}

            //if ($scope.data.ustShare == null || $scope.data.ustShare == "") {
            //    msg = true;
            //    $scope.validation.ustShare = true;
            //}

            //else {
            //    var isValid = /^\$?(([1-9](\d*|\d{0,2}(,\d{3})*))|0)(\.\d{1,2})?$/.test($scope.data.ustShare);
            //    if (!isValid) {
            //        msg = true;
            //        $scope.validation.ustShare = true;
            //    }
            //}

            //if ($scope.data.solutionNeedDate == null || $scope.data.solutionNeedDate == "") {
            //    msg = true;
            //    $scope.validation.solutionNeedDate = true;
            //}

            //if ($scope.data.targetBusinessGeography == null || $scope.data.targetBusinessGeography == "" || $scope.data.targetBusinessGeography.length < 1) {
            //    msg = true;
            //    $scope.validation.targetBusinessGeographyBusinessUnit = true;
            //    $scope.validation.targetBusinessGeographyGeography = true;
            //}

            //if ($scope.data.targetBusinessGeography.length >= 1) {
            //    angular.forEach($scope.data.targetBusinessGeography, function (value, key) {
            //        if (value.businessUnit == null || value.businessUnit == "") {
            //            msg = true;
            //            $scope.validation.targetBusinessGeographyBusinessUnit = true;
            //        }
            //        if (value.geography == null || value.geography == "") {
            //            msg = true;
            //            $scope.validation.targetBusinessGeographyGeography = true;
            //        }
            //    });
            //}

            //if ($scope.data.customerStakeholders == null || $scope.data.customerStakeholders == "" || $scope.data.customerStakeholders.length < 1) {
            //    msg = true;
            //    $scope.validation.customerStakeholdersName = true;
            //    $scope.validation.customerStakeholdersRole = true;
            //}

            //if ($scope.data.customerStakeholders.length >= 1) {
            //    angular.forEach($scope.data.customerStakeholders, function (value, key) {
            //        if (value.name == null || value.name == "") {
            //            msg = true;
            //            $scope.validation.customerStakeholdersName = true;
            //        }
            //        if (value.role == null || value.role == "") {
            //            msg = true;
            //            $scope.validation.customerStakeholdersRole = true;
            //        }
            //    });
            //}


            //if ($scope.data.customerPains == null || $scope.data.customerPains == "" || $scope.data.customerPains.length < 1) {
            //    msg = true;
            //    $scope.validation.customerPainDescription = true;
            //    $scope.validation.customerPainImpactedTask = true;
            //    $scope.validation.customerPainQuantifiedValue = true;
            //    $scope.validation.customerPainStackholdersName = true;
            //    $scope.validation.customerPainStackholdersRole = true;
            //}
            //if ($scope.data.customerPains.length >= 1) {
            //    //   angular.forEach($scope.data.customerPains, function (value, key) {
            //    if ($scope.data.customerPains[0].description == null || $scope.data.customerPains[0].description == "") {
            //        msg = true;
            //        $scope.validation.customerPainDescription = true;
            //    }
            //    if ($scope.data.customerPains[0].impactedTask == null || $scope.data.customerPains[0].impactedTask == "") {
            //        msg = true;
            //        $scope.validation.customerPainImpactedTask = true;
            //    }
            //    if ($scope.data.customerPains[0].quantifiedValue == null || $scope.data.customerPains[0].quantifiedValue == "") {
            //        msg = true;
            //        $scope.validation.customerPainQuantifiedValue = true;
            //    }

            //    if ($scope.data.customerPains[0].stackholders.length < 0) {
            //        $scope.validation.customerPainStackholdersName = true;
            //        $scope.validation.customerPainStackholdersRole = true;
            //    }
            //    else {
            //        // angular.forEach(value.stackholders, function (stackholdervalue, key) {
            //        if ($scope.data.customerPains[0].stackholders[0].name == null || $scope.data.customerPains[0].stackholders[0].name == "") {
            //            msg = true;
            //            $scope.validation.customerPainStackholdersName = true;
            //        }
            //        if ($scope.data.customerPains[0].stackholders[0].role == null || $scope.data.customerPains[0].stackholders[0].role == "") {
            //            msg = true;
            //            $scope.validation.customerPainStackholdersRole = true;
            //        }

            //        //});
            //    }
            //    // });
            //}

            //if ($scope.data.customerGains == null || $scope.data.customerGains == "" || $scope.data.customerGains.length < 1) {
            //    msg = true;
            //    $scope.validation.customerGainDescription = true;
            //    $scope.validation.customerGainImpactedTask = true;
            //    $scope.validation.customerGainQuantifiedValue = true;
            //    $scope.validation.customerGainStackholdersName = true;
            //    $scope.validation.customerGainStackholdersRole = true;
            //}
            //if ($scope.data.customerGains.length >= 1) {
            //    //  angular.forEach($scope.data.customerGains, function (value, key) {
            //    if ($scope.data.customerGains[0].description == null || $scope.data.customerGains[0].description == "") {
            //        msg = true;
            //        $scope.validation.customerGainDescription = true;
            //    }
            //    if ($scope.data.customerGains[0].impactedTask == null || $scope.data.customerGains[0].impactedTask == "") {
            //        msg = true;
            //        $scope.validation.customerGainImpactedTask = true;
            //    }
            //    if ($scope.data.customerGains[0].quantifiedValue == null || $scope.data.customerGains[0].quantifiedValue == "") {
            //        msg = true;
            //        $scope.validation.customerGainQuantifiedValue = true;
            //    }
            //    if ($scope.data.customerGains[0].stackholders.length < 0) {
            //        $scope.validation.customerGainStackholdersName = true;
            //        $scope.validation.customerGainStackholdersRole = true;
            //    }
            //    else {
            //        //angular.forEach(value.stackholders, function (stackholdervalue, key) {
            //        if ($scope.data.customerGains[0].stackholders[0].name == null || $scope.data.customerGains[0].stackholders[0].name == "") {
            //            msg = true;
            //            $scope.validation.customerGainStackholdersName = true;
            //        }
            //        if ($scope.data.customerGains[0].stackholders[0].role == null || $scope.data.customerGains[0].stackholders[0].role == "") {
            //            msg = true;
            //            $scope.validation.customerGainStackholdersRole = true;
            //        }
            //        // });
            //    }
            //    // });
            //}
            //if (msg) {
            //    return;
            //}
            if (angular.element("#businessProblemEdit").valid()) {

                var msg = false;

                if ($scope.data.estimateOfCustomer == null || $scope.data.estimateOfCustomer == "") {
                    msg = true;
                    $scope.validation.estimateOfCustomer = true;
                }
                else {
                    var isValid = /^\$?(([1-9](\d*|\d{0,2}(,\d{3})*))|0)(\.\d{1,2})?$/.test($scope.data.estimateOfCustomer);
                    if (!isValid) {
                        msg = true;
                        $scope.validation.estimateOfCustomer = true;
                    }
                }

                if ($scope.data.ustShare == null || $scope.data.ustShare == "") {
                    msg = true;
                    $scope.validation.ustShare = true;
                }

                else {
                    var isValid = /^\$?(([1-9](\d*|\d{0,2}(,\d{3})*))|0)(\.\d{1,2})?$/.test($scope.data.ustShare);
                    if (!isValid) {
                        msg = true;
                        $scope.validation.ustShare = true;
                    }
                }
                if (msg) {
                    return;
                }

                else {            
                var problem = $scope.data;
                var category = $scope.data.category;
                $scope.data.category = [];

                console.log(category);
                if (category != "null")
                {
                    $scope.data.category.push(category);
                }

                

                $scope.data.updatedBy = loggedInUser;
                if ($scope.data.labels == undefined || $scope.data.labels == null) {
                    $scope.data.labels = undefined;
                }
                else if ($scope.data.labels.length == 0) {
                    $scope.data.labels = undefined;
                }
                if ($scope.data.vertical == "") {
                    $scope.data.vertical = [];
                }
                else {
                    var vertical = $scope.data.vertical;
                    $scope.data.vertical = [];
                    $scope.data.vertical.push(vertical);
                }
                if ($scope.approach == "") {
                    $scope.data.approach = null;
                }
                else {
                    $scope.data.approach = $scope.approach;
                }

                if ($scope.data.innovationChampion == "null") {
                    $scope.data.innovationChampion = null;
                }
                if ($scope.data.status != null) {

                    console.log($scope.data);

                    ProblemService.update($scope.data, function (response) {
                        angular.element('#modalUpdateSuccess').modal('show');
                        
                    });
                }
                else if ($scope.data.status == null) {
                    $scope.updateFinalFormProblem();
                }
                }
            }
        }

        $scope.updateFinalFormProblem = function () {

            ProblemService.updateFinalFormProblem($scope.data, function (response) {
                angular.element('#modalUpdateSuccess').modal('show');
            });
            
        }

        $scope.cancelProblem = function () {
            angular.element('#modalUpdateSuccess').modal('show');
        }

        $scope.changeContributors = function () {
            var contributors = $scope.data.contributors;
            $scope.contributors = [];
            if (contributors != null) {
                if (contributors.length > 0) {
                    for (var i = 0; i < contributors.length; i++) {
                        angular.forEach($scope.users, function (value, key) {
                            if (value._id == contributors[i]) {
                                $scope.contributors.push(value);
                            }
                        })
                    }
                }
            }
        }

        $scope.removeDocument = function (index) {
            $scope.data.attachments.splice(index, 1);
        }

        $scope.editStateChange = function () {      
            angular.element('#modalUpdateSuccess').modal('hide');
            angular.element('.modal-backdrop').remove();
            $state.go('app.problems');            
        }



        $scope.changeSolutionContributors = function () {
            var solutionContributors = $scope.data.solutionContributors;
            $scope.solutionContributors = [];
            if (solutionContributors != null) {

                if (solutionContributors.length > 0) {
                    for (var i = 0; i < solutionContributors.length; i++) {
                        angular.forEach($scope.users, function (value, key) {
                            if (value._id == solutionContributors[i]) {
                                $scope.solutionContributors.push(value);
                            }

                        })
                    }
                }
            }
        }

        $scope.changeApprovalStatus = function (status) {

            var approvalStatus = {};
            approvalStatus.approvalStatus = status;
            approvalStatus.approvedUser = loggedInUser;
            approvalStatus.id = $scope.data._id;

            ProblemService.changeApprovalStatus(approvalStatus, function (response) {
                //$state.go('app.problems');
                $scope.data.approvalStatus.approvalStatus = status;
            })
        }

        $scope.changePhase = function (selectedPhase) {
            angular.forEach($scope.phases, function (phase) {
                phase.checked = false;
                angular.element('#phase' + phase._id).removeClass('SelectedDiv');
                angular.element('#phase' + phase._id).addClass('unSelectedDiv');
            });
            selectedPhase.checked = true;
            angular.element('#phase' + selectedPhase._id).addClass('SelectedDiv');
            angular.element('#phase' + selectedPhase._id).removeClass('unSelectedDiv');
            $scope.data.phase = selectedPhase._id;
        };
        $scope.problemLabel = [];
        $scope.labelChange = function () {
            $scope.selectedlable = [];
            angular.forEach($scope.problemLabel, function (value, key) {
                if (value != undefined) {
                    $scope.selectedlable.push(value._id);

                }
            });
            $scope.data.labels = $scope.selectedlable;
            angular.forEach($scope.labels, function (value, key) {
                angular.element('#label' + value._id).removeClass('ion-checkmark-circled');
                angular.element('#label' + value._id).addClass('id3-clipboard');
            })

            if ($scope.selectedlable.length > 0) {
                angular.forEach($scope.selectedlable, function (value, key) {
                    angular.element('#label' + value).removeClass('id3-clipboard');
                    angular.element('#label' + value).addClass('ion-checkmark-circled');
                })
            }
        }

        $scope.toggleSelection = function toggleSelection(labelid) {

            if ($scope.data.labels == null || $scope.data.labels == undefined) {
                $scope.data.labels = [];
                $scope.data.labels.push(labelid);
            }
            var idx = $scope.data.labels.indexOf(labelid);
            if (idx > -1) {
                $scope.data.labels.splice(idx, 1);
                angular.element('#label' + labelid).addClass('unSelectedDiv');
                angular.element('#label' + labelid).removeClass('SelectedDiv');
            }

            else {
                $scope.data.labels.push(labelid);
                angular.element('#label' + labelid).addClass('SelectedDiv');
                angular.element('#label' + labelid).removeClass('unSelectedDiv');
            }
        }

        $scope.deleteProblem = function () {
            angular.element('#myModal').modal('hide');
            angular.element('body').removeClass('modal-open');
            angular.element('.modal-backdrop').remove();
            ProblemService.deleteProblem($scope.data._id, function (response) {
                $state.go('app.draftProblem/:id', {
                    id: loggedInUser
                });
            })
        }

        $scope.redirecttoDraft = function () {
            $('#modalEditSaveSuccess').modal('hide');
            angular.element('.modal-backdrop').remove();
            $state.go('app.draftProblem/:id', {
                    id: loggedInUser
                });
        }

        $scope.saveProblemDetails = function () {
            var problem = $scope.data;
            var category = $scope.data.category;
            var vertical = $scope.data.vertical
            $scope.data.status = null;
            $scope.data.category = [];
            $scope.data.vertical = [];

            //if (vertical.length > 0) {
                if (vertical != "" && vertical != null) {
                    $scope.data.vertical.push(vertical);
                }
            //}
              if (category != "null") {
                if (category != "" && category != null) {
                    $scope.data.category.push(category);
                    }
                }
            $scope.data.updatedBy = loggedInUser;
            if ($scope.data.labels == undefined || $scope.data.labels == null) {
                $scope.data.labels = undefined;
            }

            else if ($scope.data.labels.length == 0) {
                $scope.data.labels = undefined;
            }

            if ($scope.approach == "") {
                $scope.data.approach = null;
            }
            else {
                $scope.data.approach = $scope.approach;
            }

            if ($scope.data.innovationChampion == "null") {
                $scope.data.innovationChampion = null;
            }


            ProblemService.update($scope.data, function (response) {
                angular.element('#modalEditSaveSuccess').modal('show');
            });
        }

        $scope.CheckeValidNumber = function (type) {
            if (type == 'estimateOfCustomer') {
                var data = $scope.data.estimateOfCustomer;
                data = data.replace(/,/g, "");
                data = data.replace('$', '');
                var letters = /^[0-9-+]+$/;
                if (!letters.test(data)) {
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
                if (!letters.test(data)) {
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

        $scope.addNewLabel = function (newlabel) {
            if (newlabel != "") {
                ProblemService.createLabel(newlabel, function (response) {
                    if (response == 'Label already exist') {
                        angular.element("#errorMessageForLabel").text("Label already exist!");
                    }
                    else {
                        angular.element("#errorMessageForLabel").text("");
                        angular.element('#newlabel').val("")
                        $scope.newlabel = "";
                        $scope.labels.push(response);
                    }
                });
            }
            else {
                angular.element("#errorMessageForLabel").text("Please Enter Label!");
            }
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

        /*****Calendar*******/

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

        $scope.mindate = new Date();
        $scope.changeSolutionClosureMinDate = function () {
            $scope.solutionClosureMinDate = new Date($scope.data.solutionNeedDate)
        }

        $scope.open4 = function () {
            $scope.popup4.opened = true;
        };

        $scope.open5 = function () {
            $scope.popup5.opened = true;
        };

        $scope.setDate = function (year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMM-yyyy', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup4 = {
            opened: false
        };

        $scope.popup5 = {
            opened: false
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            showWeeks: 'false'
        };

        $scope.back = function () {
            window.history.back();
        };

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

    }
})(this.angular);