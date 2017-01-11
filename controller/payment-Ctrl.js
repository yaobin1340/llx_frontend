angular
    .module( 'ohapp' )
    .controller( 'paymentCtrl', function paymentCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
        
            $http
    				.post($config.api_uri + '/Apiuser/cart/cartedit',{cart_id:$stateParams.shopcartId})
    				.success(function (data) {
                        if(data.success){
                            
                        }else{
                            $mdToast.show(
                            $mdToast.simple()
                                .content(data.error_msg)
                                .hideDelay(1000)
                            );
                        }
    				})




















    });
