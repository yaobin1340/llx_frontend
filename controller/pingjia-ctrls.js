angular
    .module( 'ohapp' )
    .controller( 'pingjiaCtrl', function pingjiaCtrl( $scope, $injector, $rootScope,evaluatePr,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');   

        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
    
        $scope.scroll_switch = 1;
        $scope.evaluate = new evaluatePr();
        $scope.evaluate.goods_id=$stateParams.goods_id;














    });
