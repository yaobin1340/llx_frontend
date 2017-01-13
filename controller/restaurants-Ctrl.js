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
        $scope.step==0;
        $scope.choseStep = function(step){
            switch (step) {
                case 1 :
                    $scope.step==1?$scope.step=0:$scope.step=1;
                    break;
                case 2 :
                    $scope.step==2?$scope.step=0:$scope.step=2;
                    break;
            }
        }
        $scope.step2=11;
        $scope.chosech="智能排序";
        $scope.choseStep2 = function(steps){
            switch (steps) {
                case 11 :
                    $scope.step2=11;$scope.step=0;
                    $scope.chosech="智能排序";
                    break;
                case 12 :
                    $scope.step2=12;$scope.step=0;
                    $scope.chosech="离我最近";
                    break;
                case 13 :
                    $scope.step2=13;$scope.step=0;
                    $scope.chosech="好评优先";
                    break;
                case 14 :
                    $scope.step2=14;$scope.step=0;
                    $scope.chosech="附近";
                    break;
            }
        }














    });
