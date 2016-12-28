angular
    .module( 'ohapp')
    .controller( 'MainCtrl', function MainCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');

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

			 
			 var postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (d) {
                    return $.param(d);
                }
       		 };	



        $http
				.post($config.api_uri + '/Apipublic/ApiPmall/getshops',{area_id :15,city_id : 12,order:1,page:2},postCfg)
				.success(function (data) {
					if(data.success){
						$scope.cate_list = data.cate_list;
					}
					console.log(data);
				})
				.error(function (err) {
					
				})



		//瀑布流下拉加载
		// $scope.page = 1; 
		// $scope.nextPage = function(){
		// 	$scope.page++;
		// 	$http
		// 		.post($config.api_uri + '/Apipublic/ApiPmall/getshops',{area_id :15,city_id : 12,order:1,page:$scope.page})
		// 		.success(function (data) {
		// 			if(data.success){
		// 				$scope.cate_list = data.cate_list;
		// 			}
		// 			console.log(data);
		// 		})
		// 		.error(function (err) {
					
		// 		})
		// }
















    });
