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

 			var shareData,wxdata;
            $scope.show=false;
            //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
        if($stateParams.fd_id==-1){
            $scope.promise = $http
                .post($config.api_uri + '/Apipublic/ApiPshop/shopdetail',{shop_id:$stateParams.shop_id})
                .success(function (data) {
                    if(data.success){
                        $scope.area_name=data.area_name;
                        $scope.detail=data.detail;
                        $scope.msg=data;
                        //注册微信分享信息
                        shareData = {};  
                        shareData.imgUrl ='http://139.224.61.180:8080/attachs/'+$scope.detail.logo;  
                        shareData.link = window.location.href;  
                        shareData.content = '我通过拉拉秀给你分享了一个店铺，快去看看吧';  
                        shareData.title = $scope.detail.shop_name;  
                        Share(shareData);
                    }else{

                    }
                })
        }else{
            $scope.promise = $http
                .post($config.api_uri + '/Apipublic/ApiPshop/shopdetail',{shop_id:$stateParams.shop_id,fd_id:$stateParams.fd_id})
                .success(function (data) {
                    if(data.success){
                        $scope.area_name=data.area_name;
                        $scope.detail=data.detail;
                        $scope.msg=data;
                        //注册微信分享信息
                        shareData = {};  
                        shareData.imgUrl ='http://139.224.61.180:8080/attachs/'+$scope.detail.logo;  
                        shareData.link = window.location.href;  
                        shareData.content = '我通过拉拉秀给你分享了一个店铺，快去看看吧';  
                        shareData.title = $scope.detail.shop_name;  
                        Share(shareData);
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        }


        	 $scope.promise = $http
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

			$scope.promise = $http
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


			$scope.love = function(){
			$http
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
		
	function Share(shareData) {  
        wxdata = {};   
        $.getJSON($config.api_uri +'/Apipublic/Apilogin/get_wxconfig',function(data){
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.wxappId, // 必填，公众号的唯一标识
                timestamp: data.wxtimestamp, // 必填，生成签名的时间戳
                nonceStr: data.wxnonceStr, // 必填，生成签名的随机串
                signature: data.wxsignature,// 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']   // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        });

  
  
        wxdata.imgUrl = shareData.imgUrl;  
        wxdata.link = shareData.link;  
        var content = shareData.content;  
        if (content.length > 100) {  
            wxdata.desc = content.substring(0, 100);  
        } else {  
            wxdata.desc = content;  
        }  
        wxdata.title = shareData.title;  
  
  
        var friendcallback = function(res) {  
             $mdToast.show(
                $mdToast.simple()
                    .content("分享成功")
                    .hideDelay(1000)
                );
        };  
  
  
        wx.ready(function() {  
            wx.onMenuShareTimeline({  
                title: wxdata.title,  
                desc: wxdata.desc,  
                link: wxdata.link,  
                imgUrl: wxdata.imgUrl,  
                img_width: 200,  
                img_height: 200,  
                success: function(res) {  
                    friendcallback(res); 
                },  
                fail: function(res) {  
                    alert(JSON.stringify(res));  
                }  
            });  
        });  
  
  
        wx.ready(function() {  
            wx.onMenuShareAppMessage({  
                title: wxdata.title,  
                desc: wxdata.desc,  
                link: wxdata.link,  
                imgUrl: wxdata.imgUrl,  
                img_width: 200,  
                img_height: 200,  
                success: function(res) {  
                    friendcallback(res); 
                },    
                fail: function(res) {  
                    alert(JSON.stringify(res));  
                }    
            });  
        });  
  
        wx.ready(function() {  
            wx.onMenuShareQQ({  
                title: wxdata.title,  
                desc: wxdata.desc,  
                link: wxdata.link,  
                imgUrl: wxdata.imgUrl,  
                img_width: 200,  
                img_height: 200,   
                success: function(res) {  
                    friendcallback(res); 
                },  
                fail: function(res) {  
                    alert(JSON.stringify(res));  
                }   
            });  
        });  
  
  
        wx.ready(function() {  
            wx.onMenuShareWeibo({  
                title: wxdata.title,  
                desc: wxdata.desc,  
                link: wxdata.link,  
                imgUrl: wxdata.imgUrl,  
                img_width: 200,  
                img_height: 200,  
                success: function(res) {  
                    friendcallback(res); 
                },   
                fail: function(res) {  
                    alert(JSON.stringify(res));  
                }  
            });  
        });  
  
  
        wx.ready(function() {  
            wx.onMenuShareQZone({  
                title: wxdata.title,  
                desc: wxdata.desc,  
                link: wxdata.link,  
                imgUrl: wxdata.imgUrl,  
                img_width: 200,  
                img_height: 200,  
                success: function(res) {  
                    friendcallback(res); 
                },    
                fail: function(res) {  
                    alert(JSON.stringify(res));  
                }  
  
  
            });  
  
  
        });  
    }  














    });
