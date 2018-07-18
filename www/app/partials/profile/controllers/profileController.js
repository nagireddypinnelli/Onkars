
(function (angular) {
    'use strict';

    /*
     * @ngdoc overview
     * @name EditController
     * @description
     * 
     * Controller for the user module.
     * ====================================
     */

    angular
        .module('id3.user')
        .controller('profileController', profileController);

    profileController.$inject = ['$scope', '$state', 'ProfileService', '$timeout', '$window', '$rootScope', '$mdDialog', '$stateParams', '$location', 'Upload'];

    function profileController($scope, $state, ProfileService, $timeout, $window, $rootScope, $mdDialog, $stateParams, $location, Upload) {
        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $scope.filehide = false;
        $scope.addbutton = false;
        $scope.editbutton = true;
        $scope.cancelbutton = false;
        $scope.isDisabled = true;
        
        ProfileService.getAccountList(function (response) {
            $scope.accounts = response;
           // console.log("acc details",$scope.accounts);
        });

        ProfileService.getProfileDetails(loggedInUser, function (response) {
                $scope.user = response;
                $rootScope.filename = response.filename
                console.log("test file here", $rootScope.filename);
        });
        
        var form = $("#createUserForm");
        $scope.editProfile = function () {
            $scope.isDisabled = false;
            $scope.editbutton = false;
            $scope.cancelbutton = true;
             event.preventDefault();
            form.find(':disabled').each(function () {
                $('.inputDisabled').removeAttr('disabled');
                $scope.addbutton = true
            });
        }


        $scope.cancelEdit = function () {
            $scope.isDisabled = true;
            $scope.addbutton = false;
            $scope.editbutton = true;
            $scope.cancelbutton = false;
        }

        //alert("ghali", $scope.user.account);

        $scope.addUserProfile = function () {
            $scope.cancelbutton = false;
            //$scope.editbutton = false;
            var user = $scope.user;
                $scope.newUser = {
                    _id: $scope.user._id,
                    //name: $scope.user.name,
                    account: $scope.user.account,
                    //username: $scope.user.username,
                    contactInfo: $scope.user.contactInfo,
                    //email: $scope.user.email,
                    skills: $scope.user.skills,
                    designations: $scope.user.designations,
                    gender: $scope.user.gender,
                    role: $scope.user.role,
                };
                ProfileService.addProfile($scope.newUser, function (response) {
                    $scope.errorMessage = "";
                    if (response == 'success') {
                        angular.element('#userProfileSave').modal('show');
                        $scope.isDisabled = true;
                    }
                    else {
                        $scope.errorMessage = response;
                    }
                });
            //} else {
                    //angular.element('#requiredFields').modal('show');
            //}
        }
  
        $scope.submitFile = function () {
            $scope.upload($scope.file);
        }

        $scope.upload = function (file) {
            
            if (file == "") {
                return;
            }

            else if (file != undefined) {
                $scope.progressVisible = true;
                Upload.upload({
                    url: '/api/profile/upload',
                    data: { file: file }
                }).then(function (resp) {
                    $scope.filename = resp.config.data.file.name;
                    if (resp.data.error_code === 0) {
                        var temp = {
                            attachment: resp.config.data.file.name,
                            orginalFilename: resp.data.file_name,
                            _id: loggedInUser
                            //fileSave: true,
                        }
                        //$scope.data.attachments.push(temp);
                        $scope.progressVisible = false;

                        angular.element('#uploadText').text('Upload Documents');

                        var data = {
                            filename: resp.config.data.file.name,
                            filelocation: "",
                            _id: loggedInUser,
                        }

                        ProfileService.addFile(data, function (response) {
                            if (response.error) {
                                $scope.showError = true;
                                $rootScope.errmessage = response.error;
                                $mdDialog.show({
                                    controller: DialogController,
                                    templateUrl: 'app/partials/repository/templates/modal.html',
                                   
                                    parent: angular.element(document.body),
                                    //targetEvent: ev,
                                    clickOutsideToClose: true
                                });
                            } else {
                                $rootScope.profilepic = true;
                                $rootScope.filename = response.filename;
                                $window.sessionStorage.setItem('filename', response.filename);
                                $rootScope.profilePhoto= true;
                                //$scope.filerepository = response.innerFiles;
                                //$scope.file = $scope.filerepository[$scope.filerepository.length - 1];
                                //$scope.files.push($scope.file);
                            }
                        });
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
    

       
    }

})(this.angular);