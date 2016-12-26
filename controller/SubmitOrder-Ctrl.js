angular
    .module( 'ohapp' )
    .controller( 'SubmitOrder', function SubmitOrder( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');



        $http
				.post($config.api_uri + '/Apipublic/ApiPshop/goodsdetail')
				.success(function (data) {
					
				})
				.error(function (err) {
					
				})

       





















    });
