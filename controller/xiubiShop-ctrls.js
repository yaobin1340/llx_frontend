angular
    .module( 'ohapp' )
    .controller( 'xiubiShopCtrl', function xiubiShopCtrl( $scope, $injector, $rootScope,xiubiShop,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

            $scope.cate_name=$stateParams.cate_name;
            //初始化加载页面
            $scope.scroll_switch = 1;
            $scope.xiubi = new xiubiShop();
            // $scope.xiubi.items = [];
            // $scope.xiubi.end = false;
            // $scope.xiubi.busy = false;
            // $scope.xiubi.page = 1;
            // $scope.xiubi.nextPage();
        







    });
