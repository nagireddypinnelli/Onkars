
(function (angular) {
    'use strict';

    /*
     * @ngdoc overview
     * @name AccountCreateController
     * @description
     * 
     * Controller for the account module.
     * ====================================
     */

    angular
        .module('id3.repository')
        .controller('InnerRepositoryController', InnerRepositoryController);

    InnerRepositoryController.$inject = ['$scope', '$state', '$timeout', '$window', '$rootScope', '$mdDialog', 'DomainService', 'RepositoryService', '$stateParams', 'Upload'];
    function InnerRepositoryController($scope, $state, $timeout, $window, $rootScope, $mdDialog, DomainService, RepositoryService, $stateParams, Upload) {

        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
        $rootScope.filename = $window.sessionStorage.getItem('filename');
            $scope.showfolder = false; 
            
            RepositoryService.getRepositoryById($stateParams.id, function (response) {
                $scope.repository = response;
                $scope.showfolder = true;
           
            });

        $scope.folderDetails = [],
        $scope.files = [],
        $scope.data = { attachments: [""], }

        $scope.create = function () {
             $scope.innerFolder = {
                foldername: $scope.folderName,
                tag: "search",
                ismainFolder: false,
                _id: $stateParams.id
            };

             RepositoryService.createInnerFolder($scope.innerFolder, function (response) {
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
                     $scope.showError = false;
                     $scope.folderDetails.push(response.foldername);
                 }
                   
                  
            });
        }

        $scope.openTag = function (id) {
            $rootScope.popUpId = id;
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/partials/repository/templates/addtagmodal.html',
                parent: angular.element(document.body),
                //targetEvent: ev,
                clickOutsideToClose: false
            });

        }

        $scope.sendmail = function () {
            alert("sending mail...");
            $scope.mailDetails = {
                tagname: $scope.tags,
            };
            RepositoryService.sendmail($scope.mailDetails, function (response) {
                console.log("inside the sucess", response);
                if (response == 'success') {
                    $scope.tags = "";
                    $scope.messsage = 'Successfully Removed ';
                } else {
                    $scope.error = response;
                }

            });
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
                    url: '/api/repository/upload',
                    data: { file: file }
                }).then(function (resp) {
                    $scope.file_name = resp.data.file_name;
                    if (resp.data.error_code === 0) {
                        var temp = {
                            attachment: resp.config.data.file.name,
                            orginalFilename: resp.data.file_name,
                            attchedUser: loggedInUser,
                            fileSave : true,
                        }
                        $scope.data.attachments.push(temp);
                        $scope.progressVisible = false;
                       
                        angular.element('#uploadText').text('Upload Documents');

                     var data =  {
                            filename: resp.config.data.file.name,
                            isFolder :false,
                            parentfolderid :null,
                            filelocation:"",
                            _id: $stateParams.id
                        } 
                     
                     RepositoryService.addFile(data, function (response) {
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
                             $scope.repository = response;
                             $scope.showError = false;
                             $scope.filerepository = response.innerFiles;
                             $scope.file = $scope.filerepository[$scope.filerepository.length - 1];
                             $scope.files.push($scope.file);
                             $scope.folderDetails = [];
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


        function DialogController($scope, $mdDialog) {

            $scope.error = $rootScope.errmessage;

            RepositoryService.getRepositoryById($stateParams.id, function (response) {
                $scope.repository = response.innerFiles;
                angular.forEach($scope.repository, function (tagsDetails) {
                    if ($rootScope.popUpId == tagsDetails._id) {
                        $scope.tags = tagsDetails.tagName;
                    }
                });
                $scope.showfolder = true;

            });

            $scope.removeTag = function ($tag) {
                $scope.removeTagDetails = {
                        tagname: $tag,
                       _id: $stateParams.id,
                       popUpId: $rootScope.popUpId

                };
                RepositoryService.removetag($scope.removeTagDetails, function (response) {
                    if (response == 'success') {
                        $scope.tags = "";
                        $scope.messsage = 'Successfully Removed ';
                    } else {
                         $scope.error = response;
                         }

                    });
            }

            $scope.hide = function () {
                $mdDialog.hide();
                $scope.tags = " ";
            };
            $scope.addHashKey = function (tags) {
                $scope.tagDetails = {
                    tagname: $scope.tags,
                         _id: $stateParams.id,
                         popUpId:$rootScope.popUpId
                };
                RepositoryService.addtag($scope.tagDetails, function (response) {
                    if (response == 'success') {
                        $scope.messsage = 'Updated Successfully';
                         //$mdDialog.hide();
                    }else{
                         $scope.error = response;
                       }
                    
                });

           };
       }

    }

})(this.angular);