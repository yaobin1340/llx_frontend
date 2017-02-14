angular
    .module( 'ohapp' )
    .controller( 'moneyCtrl', function moneyCtrl( $scope, $injector, $rootScope,$stateParams,money) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
    

            $scope.scroll_switch = 1;
            $scope.moneys = new money();
            $scope.moneys.bg_date=$("#beginTime").val();
            $scope.moneys.end_date=$("#endTime").val();

            $scope.soso=function(){
                $scope.moneys.bg_date=$("#beginTime").val();
                $scope.moneys.end_date=$("#endTime").val();
                $scope.moneys.items = [];
                $scope.moneys.end = false;
                $scope.moneys.busy = false;
                $scope.moneys.page = 1;
                $scope.moneys.nextPage();
            }
















    });
