angular
    .module( 'ohapp' )
    .controller( 'IndentedCtrl', function IndentedCtrl( $scope, $injector, $rootScope,CartIndent,$stateParams) {
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
        $scope.cartIndent = new CartIndent();
        $scope.cartIndent.aready=4;
        // $scope.evaluate.goods_id=$stateParams.goods_id;
        // $scope.evaluate.orderby=1;

        



    });
