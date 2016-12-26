angular
    .module( 'ohapp' )
    .controller( 'paymentCtrl', function paymentCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');


        $http
				.get($config.api_uri + '/Apiuser/cart/cartedit',{cart_id:16})
				.success(function (data) {
					
					console.log(data);
				})
				.error(function (err) {
					
				})





















    });
