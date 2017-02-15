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
        //加载动画
        $scope.delay = 0;
		$scope.minDuration = 0;
		$scope.message = '正在加载...';
		$scope.backdrop = true;
		$scope.promise = null;
        	//获取商家详情页
        if($stateParams.type==1){
        	$scope.promise=$http
				.post($stateParams.img_url,{shop_id:$stateParams.shop_id,openid:$stateParams.openid})
				.success(function (data) {
					if(data.success){
                        $scope.detail=data.detail;
                    }else{
                        $mdToast.show(
							$mdToast.simple()
							.content(data.error_msg)
							.hideDelay(2000)
						);
						if(data.img_url!=null){
							$mdDialog.show({
								scope: $scope,
								preserveScope: true,
								templateUrl: 'views/mixaoxi_code.html',
								parent: angular.element(document.body),
								clickOutsideToClose: true,
								fullscreen: true
							});
							var timer = setInterval(function(){
								if($("#qrcode").html()!=undefined){
									alert(data.img_url);
									('img').attr("src",data.img_url); 
									clearInterval(timer);
								}
							},1000)
						}
                    }
				})
        }else{
        	$scope.promise=$http
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
        }
    

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
              		new QRCode(document.getElementById('qrcode'),'http://llx.51loveshow.com/description?shop_id='+$stateParams.shop_id);
              		 clearInterval(timer);
              	}
              },1000)
		}
		$scope.love = function(){

			$scope.promise=$http
				.post($config.api_uri + '/Apiuser/Favourite/shop_favourites',{shop_id:$stateParams.shop_id})
				.success(function (data) {
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

		//导航
	$scope.daohang = function(){
		wxConfig();
	}
    function wxConfig(){
        $.getJSON($config.api_uri +'/Apipublic/Apilogin/get_wxconfig',function(data){
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.wxappId, // 必填，公众号的唯一标识
                timestamp: data.wxtimestamp, // 必填，生成签名的时间戳
                nonceStr: data.wxnonceStr, // 必填，生成签名的随机串
                signature: data.wxsignature,// 必填，签名，见附录1
                jsApiList: ['openLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function() {
		        wx.openLocation({
		              latitude: $scope.detail.lat,
		              longitude: $scope.detail.lng,
		              name: $scope.detail.shop_name,
		              address: $scope.detail.addr,
		              scale: 14,
		              infoUrl: 'http://llx.51loveshow.com/home',
		                success: function(res) { 
		                },  
		                fail: function(res) {
		                	$mdToast.show(
								$mdToast.simple()
									.content('导航失败，请确认打开定位功能')
									.hideDelay(1000)
								);
		                } 
		            });
		    });
        });
    };

    
    























    });
