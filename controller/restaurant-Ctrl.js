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
		$scope.scroll_switch = 1;
		$scope.shops = new Shops();
//获取下拉列表的城市信息
        	 $http
				.post($config.api_uri + '/Apipublic/ApiPmall/getcity')
				.success(function (data) {
					if(data.success){
						$scope.city_list = data.city_list;
					}else{
						$scope.dialog={open: true};
                        $scope.err=data.error_msg;
					}
					
				})
				.error(function (err) {
					$scope.dialog={open: true};
					$scope.err = err.error_msg;
				})

				$scope.selectedCity=function(e){
					if(e!=undefined){return};
					$http
						.post($config.api_uri + '/Apipublic/ApiPmall/getarea',{city_id:$scope.selected})
						.success(function (data) {
							if(data.success){
								$scope.city_list = data.area_list;
							}else{
								$scope.dialog={open: true};
                        		$scope.err=data.error_msg;
							}
						})
						.error(function (err) {
							$scope.dialog={open: true};
							$scope.err = err.error_msg;
						})
				}

			 















    });
