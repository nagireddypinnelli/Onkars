(function () {
	'use strict';

	angular.module('EdgeTreeView', []);

	/**
	 * @name EdgeTreeview - Directive
	 * @description
	 *
	 * # EdgeTreeview Directive Module creation and
	 * declaration
	 * ============================================
	 */

	angular
		.module('EdgeTreeView')
		.controller('TreeviewCtrl', TreeviewCtrl)
		.directive('edgeTreeview', edgeTreeview)
		.directive('nodeExpand', nodeToggle)
		.directive('node', nodeTogg)

	// creating nodeToggle directive
	function nodeToggle() {
		return {
			restrict: 'A',
			scope: true,
			template: '<i class="ion-android-arrow-dropdown indicator-expanded"></i>',
			link: function (scope, element, attrs) {
				element.on('click', function () {
					scope.isExpanded = true;
					element.parent().toggleClass('collapsed');
				});
			}
		}
	}

	function nodeTogg() {
		return {
			restrict: 'A',
			scope: true,
			link: function (scope, element, attrs) {
				element.on('click', function () {
					element.parent().toggleClass('collapsed');
				});
			}
		}
	}

	// Creating directive
	function edgeTreeview() {

		var edgeTreeview = {
			restrict: 'E',
			templateUrl: 'app/components/treeview/treeview.html',
			scope: {
				tree: "=",
				nodeid: "@",
				display: "@",
				child: "@",
				contextmenu: "@",
				contextmenuclick: "@"
			},
			link: tree
		}

		function tree(scope, element, attr) {
			// console.log(attr);
			//console.log("------"+scope.tree+"------");
		}

		return edgeTreeview;
	}


	// Treeview Controller:
	TreeviewCtrl.$inject = ['$scope', '$mdDialog', '$mdMedia', 'UsersService', '$window', '$rootScope','$interval','spinner'];
	function TreeviewCtrl($scope, $mdDialog, $mdMedia, UsersService, $window, $rootScope, $interval, spinner) {

	    var getuserList = function () {
	        var item = " "
	        var selectedNode = "noNode";
	        UsersService.getOrgStructureAccountUserList(" ", selectedNode,
                function (response) {
                    $rootScope.accountUserList = response;
                });
	        UsersService.getOrgStructureProjectUserList(item, selectedNode,
                function (response) {
                    $rootScope.projectUserList = response;
                });
	        UsersService.getOrgStructureOrgUserList(item, selectedNode,
					function (response) {
					    $rootScope.organizationUserList = response;
					});
	    };


	    $scope.status = '  ';
	    $rootScope.account = { "name": '' };
	    $scope.accountName = '';

	    $rootScope.project = { "name": '' };
	    $scope.projectName = '';


		$scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
		getuserList();
		

		var userLevel = $window.sessionStorage.getItem('levelSession');
		var userRole = $window.sessionStorage.getItem('roleSession');
		
		$scope.org = {
			name: '',
			transition: false
		}
		$rootScope.newOrg = {
			name: '',
			transition: false
		};
		$rootScope.owners = { "ust": "", "customer": "" };

  		if (userLevel == "organization") {
			$scope.menuOptionsorganization = [
				['Add Portfolio', function (arg, arg2, arg3, arg4) {
					$scope.addAccount(arg3);
				}],
				['Change Owner', function (arg, arg2, arg3, arg4) {
					$scope.addOrganizationOwner(arg3);
				}],
				['Add User', function (arg, arg2, arg3, arg4) {
					$scope.addOrganizationUser(arg3);
				}]
			];
		}

		if (userLevel == "organization" && userRole == 'admin') {
			$scope.menuOptionsorganization[$scope.menuOptionsorganization.length] =
				['Remove', function (arg, arg2, arg3, arg4) {
					$scope.removeOrganization(arg3);
				}];
		}

		if (userLevel == "organization" || userLevel == "account") {
			$scope.menuOptionsaccount = [
				['Add Project', function (arg, arg2, arg3, arg4) {
					$scope.addProject(arg3);
				}],
				['Change Owner', function (arg, arg2, arg3, arg4) {
					$scope.addAccountOwner(arg3);
				}],
				['Add User', function (arg, arg2, arg3, arg4) {
					$scope.addAccountUser(arg3);
				}]
			];
		}

		if (userLevel == "organization") {
			$scope.menuOptionsaccount[$scope.menuOptionsaccount.length] =
				['Remove', function (arg, arg2, arg3, arg4) {
					$scope.removeAccount(arg3);
				}];
		}

		$scope.menuOptionsproject = [
			['Change Owner', function (arg, arg2, arg3, arg4) {
				$scope.addProjectOwner(arg3);
			}],
			['Add User', function (arg, arg2, arg3, arg4) {
				$scope.addProjectUser(arg3);
			}]
		];

		if (userLevel == "organization" || userLevel == "account") {
			$scope.menuOptionsproject[$scope.menuOptionsproject.length] =
				['Remove', function (arg, arg2, arg3, arg4) {
					$scope.removeProject(arg3);
				}];
		}

		if (userLevel == "organization" || userLevel == "account") {
			$scope.menuOptionsuser = [
				['Remove', function (arg, arg2, arg3, arg4) {
					$scope.removeUser(arg3);
				}]
			];
		}

		$scope.menuOptionsustOwner = [
			['Remove', function (arg, arg2, arg3, arg4) {
				$scope.removeUser(arg3);
			}]
		];
		$scope.menuOptionscustomerOwner = angular.copy($scope.menuOptionsustOwner);

		var alert;

		$scope.showAlert = showAlert;
		$scope.showPrompt = showPrompt;
		$scope.isAdmin = (userRole.indexOf('admin') > -1) ? true : false;
		$scope.addAccount = addAccount;
		$scope.addProject = addProject;
		$scope.addOrganization = addOrganization;
		$scope.addOrganizationOwner = addOrganizationOwner;
		$scope.addAccountOwner = addAccountOwner;
		$scope.addProjectOwner = addProjectOwner;

		$scope.addOrganizationUser = addOrganizationUser;
		$scope.addAccountUser = addAccountUser;
		$scope.addProjectUser = addProjectUser;

		$scope.removeOrganization = removeOrganization;
		$scope.removeAccount = removeAccount;
		$scope.removeProject = removeProject;
		$scope.removeUser = removeUser;

		$scope.toggle = toggle;

		// toggle method
		function toggle(node) {
			$scope.expanded()
		}

		// Internal method

		function addOrganization(selectedNode) {
			showPrompt("organization", selectedNode);
		}

		function addAccount(selectedNode) {
			showPrompt("account", selectedNode);
		}

		function addProject(selectedNode) {
			showPrompt("project", selectedNode);
		}

		function addOrganizationOwner(selectedNode) {
			showPrompt("organizationOwner", selectedNode);
		}

		function addAccountOwner(selectedNode) {
			showPrompt("accountOwner", selectedNode);
		}

		function addProjectOwner(selectedNode) {
			showPrompt("projectOwner", selectedNode);
		}

		function addOrganizationUser(selectedNode) {
			showPrompt("organizationUser", selectedNode);
		}

		function addAccountUser(selectedNode) {
			showPrompt("accountUser", selectedNode);
		}

		function addProjectUser(selectedNode) {
			showPrompt("projectUser", selectedNode);
		}

		function removeOrganization(selectedNode) {
			showAlert("removeOrganization", selectedNode);
		}

		function removeAccount(selectedNode) {
			showAlert("removeAccount", selectedNode);
		}

		function removeProject(selectedNode) {
			showAlert("removeProject", selectedNode);
		}

		function removeUser(selectedNode) {
			showAlert("removeUser", selectedNode);
		}


    // Internal method
    function showPrompt(type, selectedNode, $event) {

			//var type = "project";
			var titleText;
			var labelText;
			var userList;
			var tmplUrl;
			if (type == "organization") {
				// titleText = "Please Enter a name for Organization";
				// labelText = "Organization name";
        // 		console.log('calling a prompt....')
				// var confirm = $mdDialog.prompt()
        //         .title(titleText)
        //         //.textContent('Bowser is a common name.')
        //         .placeholder(labelText)
        //         .ariaLabel(labelText)
        //         .targetEvent($event)
        //         .ok('Ok')
        //         .cancel('Cancel');

				// showDialog(confirm);

			    $rootScope.isProjectListLoaded = false;
			    $rootScope.isAccountListLoaded = false;
			    $rootScope.isOrganizationListLoaded = true;
			    $rootScope.owners = { "ust": "", "customer": "" };

				tmplUrl = 'app/components/treeview/templates/addOrg.tmpl.html';
				$rootScope.isTransition = false;
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
				var confirm = {
					controller: TreeviewCtrl,
					templateUrl: tmplUrl,
					parent: angular.element(document.body),
					clickOutsideToClose: true,
					fullscreen: useFullScreen,
				};
				showDialog(confirm);

			}
			else if (type == "account") {
				//titleText = "Please Enter a name for Account";
				//labelText = "Account name";

				//var confirm = $mdDialog.prompt()
				//	.title(titleText)
				//	.placeholder(labelText)
				//	.ariaLabel(labelText)
				//	.targetEvent($event)
				//	.ok('Ok')
				//	.cancel('Cancel');

			    //showDialog(confirm);
             
			    tmplUrl = 'app/components/treeview/templates/addAccount.tmpl.html';
			    $rootScope.isTransition = false;
			    $rootScope.isProjectListLoaded = false;
			    $rootScope.isAccountListLoaded = true;
			    $rootScope.isOrganizationListLoaded = false;
			    $rootScope.owners = {"ust": "","customer": ""};


			    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
			    var confirm = {
			        controller: TreeviewCtrl,
			        templateUrl: tmplUrl,
			        parent: angular.element(document.body),
			        clickOutsideToClose: true,
			        fullscreen: useFullScreen,
			    };
			    showDialog(confirm);
			}
			else if (type == "project") {
				//titleText = "Please Enter a name for Project";
				//labelText = "Project name";

				//var confirm = $mdDialog.prompt()
				//	.title(titleText)
				//	.placeholder(labelText)
				//	.ariaLabel(labelText)
				//	.targetEvent($event)
				//	.ok('Ok')
				//	.cancel('Cancel');
			    //showDialog(confirm);
			    $rootScope.isProjectListLoaded = true;
			    $rootScope.isAccountListLoaded = false;
			    $rootScope.isOrganizationListLoaded = false;

			    $rootScope.owners = { "ust": "", "customer": "" };

			    tmplUrl = 'app/components/treeview/templates/addProject.tmpl.html';
			    $rootScope.isTransition = false;
			   
			    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
			    var confirm = {
			        controller: TreeviewCtrl,
			        templateUrl: tmplUrl,
			        parent: angular.element(document.body),
			        clickOutsideToClose: true,
			        fullscreen: useFullScreen,
			    };
			    showDialog(confirm);
			}

			else if (type == "organizationUser" || type == "organizationOwner") {
				var item = " ";
				if (type == "organizationOwner")
					tmplUrl = 'app/components/treeview/templates/addOwner.tmpl.html';
				else
				    tmplUrl = 'app/components/treeview/templates/addUser.tmpl.html';

				$rootScope.isProjectListLoaded = false;
				$rootScope.isAccountListLoaded = false;
				$rootScope.isOrganizationListLoaded = true;

				UsersService.getOrgStructureOrgUserList(item, selectedNode,
					function (response) {
						userList = response;
						$rootScope.usersSearchList = userList;
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
						var confirm = {
							controller: TreeviewCtrl,
							templateUrl: tmplUrl,
							parent: angular.element(document.body),
							clickOutsideToClose: true,
							fullscreen: useFullScreen,
						};
						showDialog(confirm);
					}
				);
			}

			else if (type == "accountUser" || type == "accountOwner") {
				var item = " ";
				if (type == "accountOwner")
					tmplUrl = 'app/components/treeview/templates/addOwner.tmpl.html';
				else
					tmplUrl = 'app/components/treeview/templates/addUser.tmpl.html';
				$rootScope.isProjectListLoaded = false;
				$rootScope.isAccountListLoaded = true;
				$rootScope.isOrganizationListLoaded = false;

				UsersService.getOrgStructureAccountUserList(item, selectedNode,
					function (response) {
						userList = response;
						$rootScope.usersSearchList = userList;
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
						var confirm = {
							controller: TreeviewCtrl,
							templateUrl: tmplUrl,
							parent: angular.element(document.body),
							clickOutsideToClose: true,
							fullscreen: useFullScreen,
						};
						showDialog(confirm);
					}
				);
			}
			else if (type == "projectUser" || type == "projectOwner") {
				var item = " ";
				if (type == "projectOwner")
					tmplUrl = 'app/components/treeview/templates/addOwner.tmpl.html';
				else
					tmplUrl = 'app/components/treeview/templates/addUser.tmpl.html';
				$rootScope.isProjectListLoaded = true;
				$rootScope.isAccountListLoaded = false;
				$rootScope.isOrganizationListLoaded = false;
				UsersService.getOrgStructureProjectUserList(item, selectedNode,
					function (response) {
						userList = response;
						$rootScope.usersSearchList = userList;
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
						var confirm = {
							controller: TreeviewCtrl,
							templateUrl: tmplUrl,
							parent: angular.element(document.body),
							clickOutsideToClose: true,
							fullscreen: useFullScreen,
						};
						showDialog(confirm);
					}
				);

				var confirm = $mdDialog.prompt()
					.title(titleText)
					.placeholder(labelText)
					.ariaLabel(labelText)
					.targetEvent($event)
					.ok('Ok')
					.cancel('Cancel');
			}
			else {
				titleText = "Please select user";
				labelText = "User name";

				var confirm = $mdDialog.prompt()
					.title(titleText)
					.placeholder(labelText)
					.ariaLabel(labelText)
					.targetEvent($event)
					.ok('Ok')
					.cancel('Cancel');
			}

			function isOwnerExist(userId, typeId, level) {
			    UsersService.isOwnerExist(userId, level, typeId, function (response) {
			        if (response.length == 0) {
			            UsersService.addUserOrganizationStructure(userId, typeId, level, function (responses) {
			            })

			        }
			        refreshList();
			    });
			}

      function showDialog(confirm) {


          $mdDialog.show(confirm).then(function (result) {
					$scope.status = '';

					var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');

					// add account
					var createdBy = loggedInUser;

					if (type == "account") {
					    var accountName = $rootScope.account.name;
					    var orgId = selectedNode.id;
					    var ustOwner= $rootScope.owners.ust;
					    var custOwner = $rootScope.owners.customer;

					    var account = {
					        "name": accountName,
					        "createdBy": createdBy,
					        "ustOwner": ustOwner,
					        "customerOwner": custOwner
					    };
					    spinner.show();
					    UsersService.addAccountWithOwner(orgId, account,
							function (response) {
							    if (response && response.result._id) {
							        var accountID = response.result._id;
							        UsersService.addUserOrganizationStructure(ustOwner, accountID, "account", function (response) {});
							        UsersService.addUserOrganizationStructure(custOwner, accountID, "account", function (response) { });
							        UsersService.addUserAdminOrganizationStructure(orgId, accountID, "account",
										function (response) {
										    refreshList();
										}
									);
								}
							}
						);
					}

					// add organization
					if (type === "organization") {
						var organizationName = $rootScope.newOrg.name;
						var transitionEnabled = $rootScope.newOrg.transition;
						var ustOwner = $rootScope.owners.ust;
						var custOwner = $rootScope.owners.customer;
						var transionEnabled = $rootScope.newOrg.transition;
						var organization = {
						    "name": $rootScope.newOrg.name,
						    "createdBy": createdBy,
						    "ustOwner": ustOwner,
						    "customerOwner": custOwner,
						    "transitionEnabled": transionEnabled
						};
						spinner.show();
						UsersService.addOrganizationWithOwner(organization,
							function (response) {
							    //$rootScope.spinnerStatus = false;
											refreshList();
							}
						);
					}

					// add project
					if (type === "project") {
					    var projectName = $rootScope.project.name;
					    var accountId = selectedNode.id;
					    var ustOwner= $rootScope.owners.ust;
					    var custOwner = $rootScope.owners.customer;

					    var project = {
					        "name": projectName,
					        "createdBy": createdBy,
					        "ustOwner": ustOwner,
					        "customerOwner": custOwner
					    };
					    spinner.show();
					    UsersService.addProjectWithOwner(accountId, project,
							function (response) {
							    if (response && response.result._id) {
							        var projectID = response.result._id;
							        UsersService.addUserOrganizationStructure(ustOwner, projectID, "project", function (response) {});
							        UsersService.addUserOrganizationStructure(custOwner, projectID, "project", function (response) {});
							        UsersService.addUserAdminOrganizationStructure(accountId, projectID, "project",
										function (response) {
										    refreshList();
										}
									);
							    }
							}
						);
					}


					// add organizationUser
					if (type === "organizationUser") {
						var userId = $rootScope.newUserId;
						var typeId = selectedNode.id;
						spinner.show();
						UsersService.addUserOrganizationStructure(userId, typeId, "organization",
							function (response) {
								//console.log('success');
								refreshList();
							}
						);
					}

					// add accountUser
					if (type === "accountUser") {
						// var userId = "5773886bb2be47cc1bc8aba5";
						var userId = $rootScope.newUserId;
						//console.log("userId:", userId);
						var typeId = selectedNode.id;
						spinner.show();
						UsersService.addUserOrganizationStructure(userId, typeId, "account",
							function (response) {
								//console.log('success');
								refreshList();
							}
						);
					}

					// add projectUser
					if (type === "projectUser") {
						// var userId = "57738892b2be47cc1bc8aba6";
						var userId = $rootScope.newUserId;
						//console.log("userId:", userId);
						var typeId = selectedNode.id;
						spinner.show();
						UsersService.addUserOrganizationStructure(userId, typeId, "project",
							function (response) {
								//console.log('success');
								refreshList();
							}
						);
					}

					// add organizationOwner
					if (type === "organizationOwner") {
						// var userId = "5768e6f899aac10858c43189";
						var userId = $rootScope.newUserId;
						var oranizationId = selectedNode.id;
						var ownerType = $rootScope.ownerType;
						spinner.show();
						UsersService.addOrganizationOwner(userId, oranizationId, ownerType,
							function (response) {
							    isOwnerExist(userId,oranizationId,'organization');
							}
						);
					}

					// add accountOwner
					if (type === "accountOwner") {
						// var userId = "5768e7b999aac10858c4318e";
						var userId = $rootScope.newUserId;
						//console.log("userId:", userId);
						var accountId = selectedNode.id;
						var ownerType = $rootScope.ownerType;
						spinner.show();
						UsersService.addAccountOwner(userId, accountId, ownerType,
							function (response) {
							    isOwnerExist(userId,  accountId, 'accounts');

							}
						);
					}

					// add projectOwner
					if (type === "projectOwner") {
						// var userId = "5769241e9ace00fc65ddf57b";
						var userId = $rootScope.newUserId;
						//console.log("userId:", userId);
						var projectId = selectedNode.id;
						var ownerType = $rootScope.ownerType;
						spinner.show();
						UsersService.addProjectOwner(userId, projectId, ownerType,
							function (response) {
							    isOwnerExist(userId, projectId, 'projects');

							}
						);
					}

				}, function () {
					//console.log('cancel.....');
					$scope.status = '';
					//console.log('failed');
				});
			}
		};

    function showAlert(type, selectedNode) {

			var textContent;

			if (type == "removeOrganization") textContent = "Do you want to remove this Organization";
			if (type == "removeAccount") textContent = "Do you want to remove this Account";
			if (type == "removeProject") textContent = "Do you want to remove this Project";
			if (type == "removeUser") textContent = "Do you want to remove this User";



			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title(textContent)
				.textContent('The status will changed to incative')
				.ariaLabel('user status')
				.ok('Yes')
				.cancel('No');
			$mdDialog.show(confirm).then(function () {
			    spinner.show();
				var level = selectedNode.parentType;
				var parentNode = selectedNode.parentId;

				if (type == "removeUser") {
					UsersService.removeUserOrgStructure(type, selectedNode.id, level, parentNode,
						function (response) {
							$scope.status = 'User Removed';
							refreshList();
						}
					);
				}
				else {
					UsersService.removeOrgAccountProjectUser(type, selectedNode.id,
						function (response) {
						    $scope.status = 'User Removed';
							refreshList();
						}
					);
				}

			}, function () {
			    spinner.hide();
				$scope.status = 'Cancelled';
			});
		}

		function refreshList() {
		    //console.log("refresh");
			//var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');
			//UsersService.getOrganizationStructure(loggedInUser,function(response){	
			//	$scope.tree = response;
			//	console.log($scope.tree);
		    //});	
		    spinner.hide();
		    $rootScope.$broadcast('updateOrg');
		}

		$scope.hide = function () {
			$mdDialog.hide();
		};

		$scope.cancel = function () {
			$mdDialog.cancel();
		};

		$scope.save = function () {
			$mdDialog.hide();
		};
		
		
		$scope.updateAccountName = function () {
		    $rootScope.account.name = $scope.accountName;
		};

		$scope.createAccount = function () {
		    //console.log($rootScope.custOwnerId);
		    if ($rootScope.account.name == "")
		        return $scope.AccountCreateError = "*Please enter Portfolio name";
		    else if ($rootScope.owners.ust == '')
		        return $scope.AccountCreateError = "*Please select a UST owner";
		    else if ($rootScope.owners.customer == '')
		        return $scope.AccountCreateError = "*Please select a customer owner";
		    else if ($rootScope.owners.customer == $rootScope.owners.ust)
		        return $scope.AccountCreateError = "*User already added as UST owner";
		    else {
		        //$rootScope.spinnerStatus = true;
		        $mdDialog.hide();
		    }
		};

		$scope.updateProjectName = function () {
		    $rootScope.project.name = $scope.projectName;
		};

		$scope.createProject = function () {
		    if ($rootScope.project.name == "")
		        return $scope.projectCreateError = "*Please enter Project name";
		    else if ($rootScope.owners.ust == '')
		        return $scope.projectCreateError = "*Please select a UST owner";
		    else if ($rootScope.owners.customer == '')
		        return $scope.projectCreateError = "*Please select a customer owner";
		    else if ($rootScope.owners.customer == $rootScope.owners.ust)
		        return $scope.projectCreateError = "*User already added as UST owner";
		    else {
		        //$rootScope.spinnerStatus = true;
		        $mdDialog.hide();
		    }
		};

		$scope.updateOrganizationName = function () {
		    $rootScope.newOrg.name = $scope.org.name;
		    $rootScope.newOrg.transition = $scope.org.transition;
		};

		$scope.changeValue = function () {
		    $rootScope.newOrg.transition = $scope.org.transition;
		}

		$scope.createOrganization = function () {
            if ($rootScope.newOrg.name == "")
		        return $scope.organizationCreateError = "*Please enter Engagement name";
		    else if ($rootScope.owners.ust == '')
		        return $scope.organizationCreateError = "*Please select a UST owner";
		    else if ($rootScope.owners.customer == '')
		        return $scope.organizationCreateError = "*Please select a customer owner";
		    else if ($rootScope.owners.customer == $rootScope.owners.ust)
		        return $scope.organizationCreateError = "*User already added as UST owner";
		    else {
		        //$rootScope.spinnerStatus = true;
		        //$mdDialog.hide();
		        UsersService.checkOrgNameUnique($rootScope.newOrg.name,
                    function (response) {
                        console.log(response);
                        if (response == 0) {
                            $mdDialog.hide();
                        } else {
                            return $scope.organizationCreateError = "*Engagement name is already exist";
                        }                        
                    }
                );
		    }
		};


	}

})();
