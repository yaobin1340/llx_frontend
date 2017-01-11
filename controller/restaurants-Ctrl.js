angular
    .module( 'ohapp' )
    .controller( 'restaurantsCtrl', function restaurantsCtrl( $scope, $injector, $rootScope,Shops) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config2' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');


        $scope.scroll_switch = 1;
        $scope.shops = new Shops();

        $scope.choseStep = function(step){
            switch (step) {
                case 1 :
                    $scope.step=1;
                    break;
                case 2 :
                    $scope.step=2;
                    break;
            }
        }














    });
