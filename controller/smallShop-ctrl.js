angular
    .module( 'ohapp' )
    .controller( 'smallShopCrtl', function smallShopCrtl( $scope, $injector, $rootScope,$stateParams) {
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
				.post($config.api_uri + '/Apipublic/ApiPshop/hot_goods',{shop_id:$stateParams.shop_id})
				.success(function (data) {
					if(data.success){
						$scope.hot_goods_list = data.goods_list;
					}else{
						$mdToast.show(
						$mdToast.simple()
							.content(data.error_msg)
							.hideDelay(1000)
						);
					}
				})

			$http
				.post($config.api_uri + '/Apipublic/ApiPshop/goods_list',{shop_id:$stateParams.shop_id})
				.success(function (data) {
					if(data.success){
						$scope.goods_list = data.goods_list;
					}else{
						$mdToast.show(
						$mdToast.simple()
							.content(data.error_msg)
							.hideDelay(1000)
						);
					}
				})





















    });
