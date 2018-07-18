(function() {
    'use strict';
    
    angular.module('EdgeNavbar', []);
    
    /**
     * @name EdgeNavbar- Directive
     * @description
     * 
     * # Directive Module creation and declaration
     * ===========================================
     */
    
    angular
        .module('EdgeNavbar')
        .directive('edgeNavbar',edgeNavbar)
        .controller('NavbarCtrl',NavbarCtrl);
     
    // Creating directive    
    function edgeNavbar(){
        
        var edgeNavbar = {
            restrict: 'E',
            templateUrl: 'navbar.html',
            link: link
        };

        function link() {
            //console.log('called');
        }

        return edgeNavbar;
    }
    
    // Navbar Controller:    
    NavbarCtrl.$inject = ['$scope', '$mdSidenav'];
    
    
    function NavbarCtrl($scope, $mdSidenav) {
        $scope.active = [];
        setMenuActiveFalse();
        function setMenuActiveFalse() {
            for (var i = 0; i <12; i++) {
                $scope.active[i] = false;
            }
        }
        $scope.$on('refresh-highlight-menu', function (event, args) {
            setMenuActiveFalse();
            $scope.active[0] = true;

            console.log('Refresh called');
        });
        $scope.active[0] = true;

        $scope.setActive = function (pos) {
            setMenuActiveFalse();
            $scope.active[pos] = true;
        }

        $scope.toggleLeftMenu = function() {
            $mdSidenav('left').toggle();
        };
    }
    
})();