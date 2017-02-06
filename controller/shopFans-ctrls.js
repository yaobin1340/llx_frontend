angular
    .module( 'ohapp' )
    .controller( 'shopFansCtrl', function shopFansCtrl( $scope, $injector, $rootScope,shopFans) {
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
        $scope.offerpay = new shopFans();
        //soso界面
        window.filterByEnter = function(e){
            if(e.keyCode==13){
                $scope.$apply(function(){
                    $scope.offerpay.mobile = $scope.mobile;
                    $scope.offerpay.items = [];
                    $scope.offerpay.end = false;
                    $scope.offerpay.busy = false;
                    $scope.offerpay.page = 1;
                    $scope.offerpay.nextPage();
                })
            }
        };
        $scope.soso = function(){
            $scope.offerpay.mobile = $scope.mobile;
            $scope.offerpay.items = [];
            $scope.offerpay.end = false;
            $scope.offerpay.busy = false;
            $scope.offerpay.page = 1;
            $scope.offerpay.nextPage();
        }



    });