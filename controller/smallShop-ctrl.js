angular
    .module( 'ohapp' )
    .controller( 'smallShopCrtl', function smallShopCrtl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        	 $http
				.post($config.api_uri + '/Apipublic/ApiPshop/hot_goods',{shop_id:$stateParams.shop_id})
				.success(function (data) {
					if(data.success){
						$scope.hot_goods_list = data.goods_list;
					}else{
						$scope.dialog={open: true};
                        $scope.err=data.error_msg;
					}
				})
				.error(function (err) {
					$scope.dialog={open: true};
					$scope.err = err.error_msg;
				})

			$http
				.post($config.api_uri + '/Apipublic/ApiPshop/goods_list',{shop_id:$stateParams.shop_id})
				.success(function (data) {
					if(data.success){
						$scope.goods_list = data.goods_list;
					}else{
						$scope.dialog={open: true};
                        $scope.err=data.error_msg;
					}
				})
				.error(function (err) {
					$scope.dialog={open: true};
					$scope.err = err.error_msg;
				})





















    });
