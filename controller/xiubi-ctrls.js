angular
    .module( 'ohapp' )
    .controller( 'xiubiCtrl', function xiubiCtrl( $scope, $injector, $rootScope,xiubi) {
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
            $scope.xiubis = new xiubi();
            $scope.xiubis.bg_date=$("#beginTime").val();
            $scope.xiubis.end_date=$("#endTime").val();

            $scope.soso=function(){
                $scope.xiubis.bg_date=$("#beginTime").val();
                $scope.xiubis.end_date=$("#endTime").val();
                $scope.xiubis.items = [];
                $scope.xiubis.end = false;
                $scope.xiubis.busy = false;
                $scope.xiubis.page = 1;
                $scope.xiubis.nextPage();
            }















    });
