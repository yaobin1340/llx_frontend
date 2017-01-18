angular
    .module( 'ohapp' )
    .controller( 'descriptionCrtl', function descriptionCrtl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
		var $mdDialog = $injector.get('$mdDialog');
		var $mdMedia = $injector.get('$mdMedia');
		var $mdToast = $injector.get('$mdToast');

        $scope.num=1;$scope.shops_id=$stateParams.shop_id;
        $scope.change = function(data){
        	 $scope.num=data;
        }
        	//获取商家详情页
        	 $http
				.post($config.api_uri + '/Apipublic/ApiPshop/shopdetail',{shop_id:$stateParams.shop_id})
				.success(function (data) {
					if(data.success){
						$scope.detail = data.detail;
					}else{
						$mdToast.show(
						$mdToast.simple()
							.content(data.error_msg)
							.hideDelay(1000)
						);
					}
				})

			//获取用户评论信息
			$http
				.post($config.api_uri + '/Apipublic/ApiPshop/shopDianPing',{shop_id:$stateParams.shop_id})
				.success(function (data) {
					if(data.success){
						$scope.list = data.list;
					}else{
						$mdToast.show(
						$mdToast.simple()
							.content(data.error_msg)
							.hideDelay(1000)
						);
					}
				})

		$scope.ewk = function(){
				$mdDialog.show({
                    scope: $scope,
                    preserveScope: true,
                    templateUrl: 'views/shop_code.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    fullscreen: true
                });
            var timer = setInterval(function(){
              	if($("#qrcode").html()!=undefined){
              		new QRCode(document.getElementById('qrcode'), window.location.href);
              		 clearInterval(timer);
              		console.log(1);
              	}
              },1000)
		}
		$scope.love = function(){
			$http
				.post($config.api_uri + '/Apiuser/Favourite/shop_favourites',{shop_id:$stateParams.shop_id})
				.success(function (data) {
					console.log(data)
					if(data.success){
						$mdToast.show(
						$mdToast.simple()
							.content(data.error_msg)
							.hideDelay(1000)
						);
					}else{
						$mdToast.show(
						$mdToast.simple()
							.content(data.error_msg)
							.hideDelay(1000)
						);
					}
				})
		}























    });
