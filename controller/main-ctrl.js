angular
    .module( 'ohapp' )
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
					$scope.city_list = data.city_list;
				})
				.error(function (err) {
					$scope.apiError = err.error_msg;
				})

				$scope.selectedCity=function(e){
					if(e!=undefined){return};
					$http
						.post($config.api_uri + '/Apipublic/ApiPmall/getarea',{city_id:$scope.selected})
						.success(function (data) {
							$scope.city_list = data.area_list;
							console.log($scope.city_list);
						})
						.error(function (err) {
							$scope.apiError = err.error_msg;
						})
				}

			 
				



        $http
				.get($config.api_uri + '/Apipublic/ApiPmall/getshops',{area_id : $scope.area_id,city_id : $scope.shop_id,order:1})
				.success(function (data) {
					$scope.cate_list = data.cate_list;
					console.log(data);
				})
				.error(function (err) {
					
				})





















    });
