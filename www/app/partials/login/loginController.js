(function () {


    /*
     * @name LoginController
     * @description
     * 
     * Controller for Login module
     * ===========================
     */

    angular
        .module('id3.user')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$window', '$rootScope', '$state', '$location', '$http'];

    function LoginController($scope, $window, $rootScope, $state, $location ,$http) {
        //console.log('login');
        $window.scrollTo(0, 0);
        $scope.role = $window.sessionStorage.getItem('roleSession');
        $rootScope.filename = $window.sessionStorage.getItem('filename');
        $scope.loginError = '';
        $scope.displayNavOption = 1;
        $scope.user = { username: '', password: '' };
        //$scope.profilePhoto = false;

        //$rootScope.profilePhoto = false;

        $scope.profileView = function () {
             $location.path('/profile/myprofile');
        }

        if ($(window).width() < 992) {
            //  console.log($(window).width())
            $scope.displayNavOption = 0;
        }

        $(window).resize(function () {
            // console.log($(window).width());
            if ($(window).width() < 992) {
                $scope.displayNavOption = 0;
                //   console.log($scope.displayNavOption)
            }
            else {
                $scope.displayNavOption = 1;
            }
        });


        $(window).resize(function () {
            //   console.log($(window).width());
            if ($(window).width() < 992) {
                $scope.displayHomeNavOption = 0;
                //console.log($scope.displayHomeNavOption)
            }
            else {
                $scope.displayHomeNavOption = 1;
                //console.log($scope.displayHomeNavOption)
            }
        });


        if ($location.path() != "/login") {
            $rootScope.loginPage = 0;
        }
        else {

            $rootScope.loginPage = 1;
            $rootScope.$state = $state;

        }
        $scope.hideNavoptions = function () {
            $scope.displayNavOption = (!$scope.displayNavOption)
        }

        $scope.currentPath = $location.path();

        $scope.login = function () {
            if (!$scope.user || !$scope.user.username || $scope.user.username.length < 1) {
                $scope.loginError = 'Please enter a valid username / password';
                $scope.user.password = '';
                return;
            }

            else
            {
                $http.post('/api/users/login',{
                    username: $scope.user.username,
                    password: $scope.user.password,
                    device: "web"
                })
                .success(function (response) {
                        $rootScope.filename = response.user.filename;
                        $window.sessionStorage.setItem('filename', response.user.filename);
                if (response == 0) {
                    $scope.loginError = 'Please enter a valid username / password';
                    $scope.user.password = '';
                }
                else {
                     loginCallback(response);
                }
            })
            .error(function () {
                $scope.loginError = 'Please enter a valid username / password';
            })
            }

            //UsersService.login(($scope.user.username).toLowerCase(), $scope.user.password, function (response) {
            //    if (response == 0) {
            //        $scope.loginError = 'Please enter a valid username / password';
            //        $scope.user.password = '';
            //    }
            //    else {
            //        $scope.loginError = '';
            //       // loginCallback(response);

            //    }

            //});

        }

        $scope.logout = function () {
            $rootScope.loggedInUserSession = null;
            $rootScope.levelSession = null;
            $rootScope.roleSession = null;
            //$rootScope.filename = "";
            $rootScope.userName = "";
            //$scope.loggedInUser = true;
            // console.log('Refresh calling');
            $rootScope.$broadcast('refresh-highlight-menu');
            $window.sessionStorage["roleSession"] = null;
            $window.sessionStorage.setItem('roleSession', null);
            $window.sessionStorage.setItem('access-token', null);
            $window.sessionStorage.setItem('loggedInUserSession', null);
            $window.sessionStorage.getItem('userName', null);
            $window.sessionStorage.setItem('homepage', 'false');
            $window.sessionStorage.setItem('filename', null);
            $state.go('app.home');
           
        }

        loginCallback = function (response) {
            if (response && response.user && response.user["_id"]) {
                var user = response.user;

                $http.get('/api/users/getUserRole/' + user["_id"])
               .success(function (responseRole) {
                   $window.sessionStorage.setItem('roleSession', responseRole.role.name);
                   $window.sessionStorage.setItem('access-token', response.userSession.token);
                   $window.sessionStorage.setItem('loggedInUserSession', user["_id"]);
                   $window.sessionStorage.setItem('levelSession', user["level"]);

                   $window.sessionStorage.setItem('userName', user["name"]);
                   $rootScope.userName = $window.sessionStorage.getItem('userName');
                   $rootScope.levelSession = $window.sessionStorage.getItem('levelSession');

                   $rootScope.loginPage = 0;
                   $rootScope.loggedInUserSession = $window.sessionStorage.getItem('loggedInUserSession');
                   $state.go('app.problems');
                   $('.login-page').hide();
               });
            }
        }

        $scope.enableScroll = function () {
            $("body").css('overflow-y', 'scroll');
        }


    };


    

})();