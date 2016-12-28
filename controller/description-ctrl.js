angular
    .module( 'ohapp' )
    .controller( 'descriptionCrtl', function descriptionCrtl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        	//获取商家详情页
        	 $http
				.post($config.api_uri + '/Apipublic/ApiPshop/shopdetail',{shop_id:$scope.shop_id||12})
				.success(function (data) {
					if(data.success){
						$scope.detail = data.detail;
					}
					
					
				})
				.error(function (err) {
					$scope.apiError = err.error_msg;
				})

			//获取用户评论信息
			$http
				.post($config.api_uri + '/Apipublic/ApiPshop/shopDianPing',{shop_id:$scope.shop_id||12})
				.success(function (data) {
					if(data.success){
						$scope.list = data.list;
					}
					
				})
				.error(function (err) {
					$scope.apiError = err.error_msg;
				})





















    });
