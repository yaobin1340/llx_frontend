angular
    .module( 'ohapp' )
    .controller( 'SubmitOrder', function SubmitOrder( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $config = $injector.get( '$config' );
        var $timeout = $injector.get( '$timeout' );
        var $session = $injector.get('$session');
        var $window = $injector.get('$window')
        var $location = $injector.get('$location');
        
        $http
				.post($config.api_uri + '/Apipublic/ApiPshop/goodsdetail')
				.success(function (data) {
					if(data.success){

                    }
				})
				.error(function (err) {
					
				})

        $scope.subOrder=function(){
            $rootScope.$page = 'payment'
        }





















    });
