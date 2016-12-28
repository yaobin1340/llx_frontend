angular
    .module( 'ohapp' )
    .controller( 'RestaurantCtrl', function RestaurantCtrl( $scope, $injector, $rootScope, Shops) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');

       $scope.api_uri = $config.api_uri;
		$scope.currentPage = 0;
		$scope.scroll_switch = 1;
		$scope.shops = new Shops();
//获取下拉列表的城市信息
        	 $http
				.post($config.api_uri + '/Apipublic/ApiPmall/getcity')
				.success(function (data) {
					if(data.success){
						$scope.city_list = data.city_list;
					}
					
				})
				.error(function (err) {
					$scope.apiError = err.error_msg;
				})

				$scope.selectedCity=function(e){
					if(e!=undefined){return};
					$http
						.post($config.api_uri + '/Apipublic/ApiPmall/getarea',{city_id:$scope.selected})
						.success(function (data) {
							if(data.success){
								$scope.city_list = data.area_list;
							}
							console.log($scope.city_list);
						})
						.error(function (err) {
							$scope.apiError = err.error_msg;
						})
				}

			 
	



    //     $http
				// .post($config.api_uri + '/Apipublic/ApiPmall/getshops',{lng:121.547502,lat:31.227906})
				// .success(function (data) {
				// 	if(data.success){
				// 		$scope.shop_list = data.shop_list;
				// 	}
				// })
				// .error(function (err) {
					
				// })



		// 瀑布流下拉加载
		// $scope.page = 1; 
		// $scope.nextPage = function(){
		// 	$scope.page++;
		// 	$http
		// 		.post($config.api_uri + '/Apipublic/ApiPmall/getshops',{lng:121.547502,lat:31.227906,page:$scope.page})
		// 		.success(function (data) {
		// 			if(data.success){
		// 				$scope.shop_list = data.shop_list;
		// 			}
		// 			console.log(data);
		// 		})
		// 		.error(function (err) {
					
		// 		})
		// }
       















    });
