angular
    .module( 'ohapp' )
    .controller( 'paymentCtrl', function paymentCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');

        if(!$session.get('auth').token){
               $scope.dialog={open: true};
               $scope.err="请先登录";
        }else{
            $http
    				.post($config.api_uri + '/Apiuser/cart/cartedit',{token:$session.get('auth').token})
    				.success(function (data) {
                        if(data.success){
                            
                        }else{
                            $scope.dialog={open: true};
                            $scope.err=data.error_msg;
                        }
    					
    				})
    				.error(function (err) {
                        $scope.dialog={open: true};
    					$scope.err = err.error_msg;
    				})

                }



















    });
