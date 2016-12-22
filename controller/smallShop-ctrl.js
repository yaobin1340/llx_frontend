angular
    .module( 'ohapp' )
    .controller( 'smallShopCrtl', function smallShopCrtl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');

        	 $http
				.post($config.api_uri + '/Apipublic/ApiPshop/hot_goods',$scope.shop_id)
				.success(function (data) {
					$scope.hot_goods_list = data.hot_goods_list;
				})
				.error(function (err) {
					$scope.apiError = err.error_msg;
				})

			$http
				.post($config.api_uri + '/Apipublic/ApiPshop/goods_list',$scope.shop_id)
				.success(function (data) {
					$scope.goods_list = data.goods_list;
				})
				.error(function (err) {
					$scope.apiError = err.error_msg;
				})





















    });
