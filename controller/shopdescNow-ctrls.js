angular
    .module( 'ohapp' )
    .controller( 'shopdescNowCtrl', function shopdescNowCtrl( $scope, $injector, $rootScope,Evaluate,$stateParams) {
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
        $scope.evaluate = new Evaluate();
        $scope.evaluate.shop_id=$stateParams.shop_id;
        $scope.evaluate.orderby=2;









    });
