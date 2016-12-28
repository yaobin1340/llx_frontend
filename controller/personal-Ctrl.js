angular
    .module( 'ohapp' )
    .controller( 'personalCtrl', function personalCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');


        $http
				.post($config.api_uri + '/Apiuser/cart/cartedit',{token:"jYqEe46caKuB0H7Ls4WJmrCjyauGhIBrhnN1oQ=="})
				.success(function (data) {
                    if(data.success){
                        
                    }
					console.log(data);
				})
				.error(function (err) {
					
				})





















    });
