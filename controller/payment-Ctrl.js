angular
    .module( 'ohapp' )
    .controller( 'paymentCtrl', function paymentCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        console.log($stateParams.shopcartId)
            $http
    				.post($config.api_uri + '/Apiuser/cart/cartedit',{cart_id:$stateParams.shopcartId})
    				.success(function (data) {
                        if(data.success){
                            
                        }else{
                            $scope.dialog={open: true};
                            $scope.err=data.error_msg;
                        }
    					console.log(data);
    				})
    				.error(function (err) {
                        $scope.dialog={open: true};
    					$scope.err = err.error_msg;
    				})



















    });
