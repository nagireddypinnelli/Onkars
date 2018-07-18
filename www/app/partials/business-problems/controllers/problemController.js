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
        .filter('phaseFilter', function () {
            return function (problems, phasefilter) {
                if (problems != undefined && problems != false && problems != true) {
                    return problems.filter(function (task) {
                        if (phasefilter.length == 0 || phasefilter == undefined) {
                            return true;
                        }
                        else if (phasefilter.indexOf(task.phase.name) != -1) {
                            return true;
                        }
                        return false;
                    });
                }
                return;
            };
        }).filter('statusFilter', function () {
            return function (problems, status) {
                if (problems != undefined && problems != false && problems != true) {
                    return problems.filter(function (problem) {
                        if (status == undefined || status.length == 0) {
                            return true
                        }
                        else if (status.indexOf(problem.status.name) != -1) {
                            return true;
                        }
                        return false;
                    });
                }
                return;
            };
        }).filter('accountFilter', function () {
            return function (problems, accounts) {
                if (problems != undefined && problems != false && problems != true) {
                    return problems.filter(function (problem) {
                        if (accounts.length == 0) {
                            return true;
                        }
                        else if (accounts.indexOf(problem.account.name) != -1) {
                            return true;
                        }
                        return false;
                    });
                }
                return;
            };
        }).filter('domainFilter', function () {
            return function (problems, domains) {
                if (problems != undefined && problems != false && problems != true) {
                    return problems.filter(function (problem) {
                        if (domains.length == 0) {
                            return true;
                        }
                        if (problem.domain != null) {
                            if (domains.indexOf(problem.domain.name) != -1) {
                                return true;
                            }
                        }
                        return false;
                    });
                }
                return;
            };
        }).filter('verticalFilter', function () {
            return function (problems, vertical) {
                if (problems != undefined && problems != false && problems != true) {
                    return problems.filter(function (problem) {
                        if (vertical.length == 0) {
                            return true;
                        }
                        else {
                            var isAvailable = 0;
                            if (problem.vertical != undefined) {

                                for (var i = 0; i < problem.vertical.length; i++) {
                                    if (vertical.indexOf(problem.vertical[i].name) != -1) {
                                        isAvailable = 1;
                                        break;
                                    }
                                }

                                if (isAvailable == 1) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            }
                        }

                        return false;
                    });
                }
                return;
            //return function (problems, vertical) {
            //    if (problems != undefined && problems != false && problems != true) {
            //        return problems.filter(function (problem) {
            //            if (vertical.length == 0) {
            //                return true;
            //            }
            //            if (problem.account.vertical != null) {
            //                if (vertical.indexOf(problem.account.vertical.name) != -1) {
            //                    return true;
            //                }
            //            }
            //            return false;
            //        });
            //    }
            //    return;
            };
        }).filter('datefilter', function () {
            return function (problems, fromDate, toDate) {
                if (problems != undefined && problems != false && problems != true) {
                    return problems.filter(function (problem) {
                        if ((fromDate != "") && (toDate != "")) {
                            problem.createdDateTime = problem.createdDateTime.split(' ')[0];
                            var problemDate = new Date(problem.createdDateTime);
                            problemDate = new Date(new Date(problemDate.setHours(0, 0, 0, 0)));
                            var s = new Date(fromDate);
                            var e = new Date(toDate);
                            if (problemDate >= fromDate && problemDate <= toDate) return true;
                            return false;
                        }
                        else {
                            return true;
                        }
                    });
                    return;
                }
            }
        }).filter('creatorfilter', function () {
            return function (problems, creators) {
                if (problems != undefined && problems != false && problems != true) {
                    return problems.filter(function (problem) {
                        if (creators.length == 0) {
                            return true;
                        }
                        else if (creators.indexOf(problem.createdBy.name) != -1) {
                            return true;
                        }
                        return false;
                    });
                }
                return;
            };
        })
        .filter('innovationChampionfilter', function () {
            return function (problems, innovationChampion) {
                if (problems != undefined && problems != false && problems != true) {
                    return problems.filter(function (problem) {
                        if (innovationChampion.length == 0) {
                            return true;
                        }
                        else if(problem.innovationChampion == null)
                        {
                            return false
                        }

                        else if (innovationChampion.indexOf(problem.innovationChampion.name) != -1) {
                            return true;
                        }
                        return false;
                    });
                }
                return;
            };
        })
        .filter('labelfilter', function () {
            return function (problems, labels) {
                if (problems != undefined && problems != false && problems != true) {
                    return problems.filter(function (problem) {
                        if (labels.length == 0) {
                            return true;
                        }
                        else if (problem.labels == null) {
                            return false
                        }
                        else if(problem.labels.length >= 1)
                        {
                            for(var i=0;i<problem.labels.length ; i++)
                            {
                                if(labels.indexOf(problem.labels[i].name) !=-1)
                                {
                                    return true;
                                }
                            }
                        }                       
                        return false;
                    });
                }
                return;
            };
        })

        .filter('keywordFilter', function () {
            return function (problems, keyword) {
                if (problems != undefined && problems != false && problems != true) {
                    return problems.filter(function (problem) {
                        if (keyword = "" || keyword == null) {
                            return true;
                        }
                        else if (keyword != "") {
                            if (problem.problemId.test(keyword) !== 1) {
                                return true;
                            }
                        }
                        return false;
                    });
                }
                return;
            };
        }).directive('toggle', function () {
            return function (scope, elem, attrs) {
                scope.$on('event:toggle', function () {
                    elem.slideToggle();
                });
            };
        })
        .controller('ProblemController', ProblemController);
    ProblemController.$inject = ['$scope', '$state', 'ProblemService', '$timeout', '$window', '$rootScope', '$mdDialog', '$stateParams'];
    function ProblemController($scope, $state, ProblemService, $timeout, $window, $rootScope, $mdDialog, $stateParams) {
        var loggedInUser = $window.sessionStorage.getItem('loggedInUserSession');

        //console.log("loggedInUser", loggedInUser);
        //$rootScope.filename = false;

        $rootScope.filename = $window.sessionStorage.getItem('filename');
        $("body").css('overflow-y', 'scroll');
        $window.scrollTo(0, 0);
        var username = $window.sessionStorage.getItem('userName');
        $scope.loggedInUserID = loggedInUser;
        $scope.loggedInUser = loggedInUser;
        $scope.reverseSort = false;
        $scope.level = "none";
        $scope.fromDate = "";
        $scope.toDate = "";
        $scope.accounts = "";
        $scope.verticals = "";
        $scope.searchKeyword = "";
        $scope.tags = [];
        $scope.statuesFilloggedInUserter = [];
        $scope.phasefilter = [];
        $scope.statusfilter = [];
        $scope.filterByaccount = [];
        $scope.filterByVertical = [];
        $scope.filterByDomain = [];
        $scope.filterByCreate = [];
        $scope.filterByInnovationChampion = [];
        $scope.filterByLabels = [];
        $scope.comment = [];
        $scope.sortBy = 'updatedDateTime';
        $scope.reverse = true;
        $scope.filterType = "";
        $scope.createTilte = "";
        $scope.roleSession = $window.sessionStorage.getItem('roleSession');
        $scope.problemList = [];
        $scope.limit = 2;
        $scope.numberToDisplay = 5;
        $scope.toggleValue = false;
        $scope.problems = [];
        $scope.showSortOption = 1;
        $scope.displayFilteroption = true;
        $scope.displayRecent = true;
        $scope.displaytimeline = true;
        $scope.displayactions = false;
        $scope.innovationChampionUsers = [];
        $scope.labels = [];

        if ($window.sessionStorage.getItem('loggedInUserSession') == 'null' || $window.sessionStorage.getItem('loggedInUserSession') == null) {
            $state.go('app.home')
        }
        $scope.Init = function () {          
            ProblemService.getBusinessProblemList(function (problemlist) {
                $.LoadingOverlay("hide");
                $scope.showSortOption = 1;
                $scope.problemList = problemlist;
                $scope.problems = problemlist;
                 $scope.toggle();                
                 $scope.loadMore();
                 $scope.getStatusPhaseProblemCount();
                 $scope.checkuserlikes();
            });
        }

        $scope.Init();

        $scope.mobilefilter = function (keyword) {
            debugger;
            console.log('keyword', keyword);
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

        $scope.toggle = function () {
            $scope.$broadcast('event:toggle');
            $scope.toggleValue = !$scope.toggleValue;
        }

        $scope.toggleChange = function () {
            if (!$scope.toggleValue) {
                $scope.toggle();
            }
        }

        $scope.noMoreItemsAvailable = false;
        $scope.getBusinessProblem = function () {
            $scope.showSortOption = 1;
            ProblemService.getBusinessProblemList(function (response) {
                $scope.problems = response;
                $scope.checkuserlikes();
                $scope.loadMore();
            });
        }

        $scope.checkuserlikes = function () {
            angular.forEach($scope.problems, function (value, key) {
                $scope.problems[key].userlikes = [];
                if (value.likes.length > 0) {
                    angular.forEach(value.likes, function (like, index) {
                        $scope.problems[key].userlikes.push(like.user._id)
                    });
                }
            });
        }

       
        ProblemService.getInnovationchampions(function (InnovationChampionUsers) {
            $scope.innovationChampionUsers = InnovationChampionUsers;
        });

        ProblemService.getLabelList(function (labels) {
            $scope.labels = labels;
        })

        $scope.displayActions = function () {
            var users = [];
            $('input.problemCheck:checkbox:checked').each(function () {
                users.push($(this).val());
            });

            if ((users.length > 0)) {
                $scope.displayactions = true;
            }
            else {
                $scope.displayactions = false;
            }
        }

        $scope.resetFilter = function () {
            $scope.filterByaccount = [];
            $scope.filterByVertical = [];
            $scope.filterByDomain = [];
            $scope.filterByCreate = [];
            $scope.filterByLabels = [];
            $scope.filterByInnovationChampion = [];
            $scope.fromDate = "";
            $scope.toDate = "";
            $scope.searchKeyword = "";
        }

        $scope.loadMore = function () {
            $scope.problems = $scope.problems;
            if ($scope.problems != null || $scope.problems != "" || $scope.problems != undefined) {
                if ($scope.problems != 'undefined') {
                    if ($scope.numberToDisplay + 5 < $scope.problems.length) {
                        $scope.numberToDisplay += 5;
                    } else {
                        $scope.numberToDisplay = $scope.problems.length;
                    }
                }
            }
        }
        ProblemService.getRecentProblems(loggedInUser, function (response) {
            $scope.recentProblems = response;
        });

        $scope.filterProblem = function () {
            ProblemService.getProblemDataFilter($scope.filterType, $scope.filterValue, function (response) {
                $scope.problems = response;
            });
        }

        $scope.filterByDate = function (filterDateType) {
            ProblemService.getProblemsByDate(filterDateType, function (response) {
                $scope.problems = response;
                $scope.checkuserlikes();
                if  ($window.scrollY > 400)
                    {
                    $window.scrollTo(0, 400);
                    }
                $scope.loadMore();
            });
        }

        $scope.sortproblem = function (sortBy) {
            $scope.reverse = ($scope.sortBy === sortBy) ? !$scope.reverse : false;
            $scope.sortBy = sortBy;
        }

        ProblemService.getAccountList(function (response) {
            $scope.accounts = response;
        });

        ProblemService.getVerticalList(function (response) {
            $scope.verticals = response;
        });

        ProblemService.getCategoryList(function (category) {
            $scope.categories = category;
        });

        ProblemService.getDiomainList(function (domain) {
            $scope.domains = domain;
        });

        ProblemService.getUserList(function (users) {
            $scope.activeUsers = users;
        });

        $scope.getStatusPhaseProblemCount = function () {
            ProblemService.getStatusPhaseProblemCount(function (response) {
                ProblemService.getPhaseList(function (phase) {                        
                        for (var i = 0; i < phase.length; i++) {
                            $scope.tags.push(phase[i].name);
                            phase[i].problemCount = 0;
                            for (var j = 0 ; j < response.phase.length; j++)
                            {
                                if (phase[i]._id == response.phase[j]._id) {
                                    phase[i].problemCount = response.phase[j].count;
                                    break;
                                }
                            }
                        }
                        $scope.phases = phase;                                                                                              
                });

                ProblemService.getStatusList(function (status) {                    
                        for (var i = 0; i < status.length; i++) {
                            status[i].problemCount = 0;
                            for (var j = 0; j < response.status.length; j++)
                            {
                                if (status[i]._id == response.status[j]._id) {
                                    status[i].problemCount = response.status[j].count;
                                }
                            }
                        }
                    $scope.states = status;
                });
            });
        }


        //ProblemService.getPhaseList(function (phase) {
        //    angular.forEach(phase, function (value, key) {
        //        $scope.tags.push(value.name);
        //    });
        //    ProblemService.getBusinessProblemList(function (problemlist) {
        //        for (var i = 0; i < phase.length; i++) {
        //            phase[i].problemCount = 0;
        //            angular.forEach(problemlist, function (problemValue, problemKey) {
        //                if (phase[i].name == problemValue.phase.name) {
        //                    phase[i].problemCount++;
        //                }
        //            });
        //        }
        //    });
        //    $scope.phases = phase;
        //});
        //ProblemService.getStatusList(function (status) {
        //    ProblemService.getBusinessProblemList(function (problemlist) {
        //        for (var i = 0; i < status.length; i++) {
        //            status[i].problemCount = 0;
        //            angular.forEach(problemlist, function (problemValue, problemKey) {
        //                if (status[i].name == problemValue.status.name) {
        //                    status[i].problemCount++;
        //                }
        //            });
        //        }
        //    });
        //    $scope.states = status;
        //});
        //$scope.getMyProblem = function () {
        //    ProblemService.getUserProblems(loggedInUser, function (problems) {
        //        $scope.problems = problems;
        //    });
        //}


        $scope.phasefilterchange = function () {
            if  ($window.scrollY > 400)
                {
                $window.scrollTo(0, 400);
                }
            
            $scope.tags = [];
            $scope.selectedPhase = [];
            angular.forEach($scope.phasefilter, function (value, key) {
                if (value != undefined) {
                    $scope.tags.push(value.name);
                    $scope.selectedPhase.push(value)
                }
            });

            angular.forEach($scope.phases, function (value, key) {
                angular.element('#phase' + value._id).removeClass('SelectedDiv');
                angular.element('#phase' + value._id).addClass('unSelectedDiv');
            })

            if ($scope.selectedPhase.length > 0) {
                angular.forEach($scope.selectedPhase, function (value, key) {

                    angular.element('#phase' + value._id).removeClass('unSelectedDiv');
                    angular.element('#phase' + value._id).addClass('SelectedDiv');
                })
            }
        }

        $scope.statusfilterchange = function () {
            if  ($window.scrollY > 400)
                {
                $window.scrollTo(0, 400);
                }
            $scope.statuesFilter = [];
            $scope.selectedStatus = [];
            angular.forEach($scope.statusfilter, function (value, key) {
                if (value != undefined) {
                    $scope.statuesFilter.push(value.name);
                    $scope.selectedStatus.push(value);
                }
            });

            angular.forEach($scope.states, function (value, key) {
                angular.element('#status' + value._id).removeClass('SelectedDiv');
                angular.element('#status' + value._id).addClass('unSelectedDiv');
            })

            if ($scope.selectedStatus.length > 0) {
                angular.forEach($scope.selectedStatus, function (value, key) {
                    angular.element('#status' + value._id).removeClass('unSelectedDiv')
                    angular.element('#status' + value._id).addClass('SelectedDiv');
                })
            }
        }

        $scope.phasevalue = function () {
            var data = $scope.phasefilter;
        }

        $scope.filterByPhase = function (item) {
            var i = 0;
            for (var i = 0; i <= $scope.phasefilter.length; i++) {
                if ($scope.phasefilter[i].name === item.phase.name) {
                    i = 1;
                    break;
                }
            }
            if (i == 1) {
                return item;
            }
            else {
                return null;
            }
        }

        $scope.addlike = function (likedProblem, id, index) {
            var problem = {};
            problem.id = id;
            problem.likedby = loggedInUser;
            ProblemService.likeProblem(problem, function (response) {
                likedProblem.likes.push(problem);
                angular.forEach($scope.problems, function (problems, key) {
                    if (problems._id == id) {
                        $scope.problems[key].userlikes.push(loggedInUser)
                    }
                });

                ProblemService.getRecentProblems(loggedInUser, function (responseRecent) {
                    $scope.recentProblems = responseRecent;
                });
            })
        }

        $scope.unlike = function (likedProblem, id, index) {
            var problem = {};
            problem.id = id;
            problem.likedby = loggedInUser;
            ProblemService.unlikeProblem(problem, function (response) {
                likedProblem.likes.pop(problem);

                angular.forEach($scope.problems, function (problems, key) {
                    if (problems._id == id) {
                        $scope.problems[key].userlikes.pop(loggedInUser)
                    }
                });

                ProblemService.getRecentProblems(loggedInUser, function (responseRecent) {
                    $scope.recentProblems = responseRecent;
                });
            })
        }

        $scope.addComment = function (comments, id, keyEvent, index) {
            if (keyEvent.which === 13) {
                var comment = {};
                comment.createdBy = loggedInUser;
                comment.comment = comments;
                comment.id = id;
                ProblemService.addComment(comment, function (response) {
                    $scope.comment = [];
                    var problem = $scope.problems;
                    if (problem[index]._id == id) {
                        comment.commnetedDate = new Date();
                        comment.commentedBy = {};
                        comment.commentedBy.name = $window.sessionStorage.getItem('userName');
                        problem[index].comments.push(comment);
                        $scope.problems = problem;
                    }
                    ProblemService.getRecentProblems(loggedInUser, function (responseRecent) {
                        $scope.recentProblems = responseRecent;
                        var commentsboxheight = angular.element('#row_' + index).height();
                        if (commentsboxheight == 0) {
                            angular.element('#row' + index).triggerHandler('click');
                        }
                    });
                });
            }
        }

        $scope.problemKeywordFilter = function (filter) {
            return function (problem) {
                if (filter == "") {
                    return true;
                }
                else if (filter != "") {
                    filter = filter.toLowerCase()
                    var problemId = String(problem.problemId);
                    var problemStatement = String(problem.problemStatement);
                    var businessImpact = String(problem.businessImpact);
                    var category = "";
                    if (problem.category != undefined) {
                        if (problem.category.length > 0) {
                            category = String(problem.category[0].name);
                        }
                    }
                    var title = String(problem.title);
                    if (problemId.toLowerCase().indexOf(filter.replace('#', '')) >= 0) {
                        return true;
                    }
                    else if (problemStatement.toLowerCase().indexOf(filter) >= 0) {
                        return true;
                    }
                    else if (businessImpact.toLowerCase().indexOf(filter) >= 0) {
                        return true;
                    }
                    else if (title.toLowerCase().indexOf(filter) >= 0) {
                        return true;
                    }
                    else if (category.toLowerCase().indexOf(filter) >= 0) {
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

        $scope.checkHeightPhase = function(event){alert(event);
            if  (angular.element('#'+event).hasClass('expanded')){
                
                angular.element('#'+event).removeClass('expanded');

                return false;
                }
            angular.element('.expanded').trigger("click");

            angular.element('#'+event).addClass('expanded');                 
        }

        $scope.checkHeightStatus = function(event){alert(event);

            if  (angular.element('#'+event).hasClass('expanded')){
                
                angular.element('#'+event).removeClass('expanded');

                return false;
                }
            angular.element('.expanded').trigger("click");

            angular.element('#'+event).addClass('expanded');                 
        }

        $scope.checkHeightIdp = function(event){
            if  ($(event.target).hasClass("expanded"))
                {
                $(event.target).removeClass('expanded');
                return false;
                }

            angular.element('.expanded').trigger("click");

            $(event.target).addClass('expanded');                            
        }

        $scope.showScroll = function () {
            $("body").css('overflow-y', 'scroll');
        }


        $scope.filterProblem = function (filterType) {
            $scope.filterType = filterType;
            if (filterType == 'account') {
                $scope.filterByVertical = [];
                $scope.filterByDomain = [];
                $scope.fromDate = "";
                $scope.toDate = "";
            }
            else if (filterType == 'domain') {
                $scope.filterByaccount = [];
                $scope.filterByVertical = [];
                $scope.fromDate = "";
                $scope.toDate = "";
            }
            else if (filterType == 'vertical') {
                $scope.filterByaccount = [];
                $scope.filterByDomain = [];
                $scope.fromDate = "";
                $scope.toDate = "";
            }
            else if (filterType == 'date') {
            }
        }

        $scope.getProblem = function () {
            angular.element('#businessProblem').removeClass('SelectedDiv');
            angular.element('#businessProblem').addClass('unSelectedDiv');
            if ($scope.myId3) {
                ProblemService.getUserProblems(loggedInUser, function (problems) {
                    $scope.problems = problems;
                });
                angular.element('#businessProblem').addClass('SelectedDiv');
                angular.element('#businessProblem').removeClass('unSelectedDiv');
            }
            else {
                $scope.getBusinessProblem();
            }
        }

        /*****Calendar*******/
        $scope.maxdate = new Date();
        $scope.fromdateMax = new Date();

        $scope.changefromMaxDate = function () {
            $scope.fromdateMax = $scope.toDate;
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

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };

        $scope.open3 = function () {
            $scope.popup3.opened = true;
        };

        $scope.setDate = function (year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMM-yyyy', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        $scope.popup3 = {
            opened: false
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            showWeeks: 'false'
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
     
        $scope.exportExcel = function () {
            var problems = [];
            $('input.problemCheck:checkbox:checked').each(function () {
                problems.push($(this).val());
            });
            ProblemService.excelExportByProblemId(problems, function (response) {
                window.location = '/uploads/Business Problem.xlsx';
            });
        }
    }
})(this.angular);