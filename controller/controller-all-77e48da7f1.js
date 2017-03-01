angular
    .module( 'ohapp')
    .controller( 'MainCtrl', function MainCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
 

		$scope.num=1;$scope.add=0;
	    $scope.changeImg = function(data){
	        $scope.num=data;
	    }
        $scope.$on('changeImg', function(event, data) {  
          $scope.num = data; 
        });


        $scope.chose = function(){
            $http
                    .post($config.api_uri + '/Apiuser/Userinfo/mainpage')
                    .success(function (data) {
                        if(data.success){
                            $scope.shopflag = data.shopflag;
                            if($scope.shopflag==1){
                                $state.go('main.OfferPay');
                            }else if($scope.shopflag==2){
                                $state.go('payShop');
                            }
                        }
                    })
        }
            














    });

angular
    .module( 'ohapp' )
    .controller( 'HomeCtrl', function HomeCtrl( $scope, $injector ) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');


        var userId = $session.get('auth')._id

        $scope.showDishModal = function(ev,dish,index) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            $http.get($config.api_uri + '/dishes/' + dish._id).then(function(response){
                if(jQuery.inArray($session.get('auth')._id, response.data.like) > -1){
                    response.data.isLike = true
                }else{
                    response.data.isLike = false
                }
                response.data.index = index
                $scope.dish = response.data
                $mdDialog.show({
                    scope: $scope,
                    preserveScope: true,
                    templateUrl: 'views/modals/dish.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true

                });
            });
        };

        $scope.showUserLikeListModal = function(ev,type) {
            $mdDialog.hide();
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

            if(type === 'following'){$scope.title = 'PEOPLE YOU FOLLOW'; }
            if(type === 'follower'){$scope.title = 'PEOPLE FOLLOWING YOU'; }
            if(type === 'userLike'){$scope.title = 'PEOPLE WHO LIKE THIS'; }
            if(type === 'addedToList'){$scope.title = 'PEOPLE WHO ADDED TO LIST'; }

            $mdDialog.show({
                locals:{
                    title: $scope.title,
                },
                scope: $scope,
                preserveScope: true,
                templateUrl: 'views/userList.tpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true
            });
        };

        $scope.showAddToLikeToast = function(ev, dishId, index){
            if($session.data.auth){
                $http.post($config.api_uri + '/user/' + userId + '/dish/' + dishId + '/like')
                    .success(function(response){
                        $scope.dishes[index]['isLike'] = true
                        if($scope.dish && $scope.dish._id === dishId){
                            $scope.dish.isLike = true
                        }

                        $mdToast.show(
                            $mdToast.simple()
                                .content('Dish added to like')
                                .action('UNDO')
                                .position('top right')
                                .hideDelay(2000)
                        ).then(function(response) {

                                if ( response == 'ok' ) {
                                    $scope.showUndoLike(ev, dishId, index)
                                }
                            });
                    })
                    .error(function(response){
                        $mdToast.show(
                            $mdToast.simple()
                                .content(response.error)
                                .position('top right')
                                .hideDelay(2000)
                        )
                    });
            }else{
                $mdToast.show(
                    $mdToast.simple()
                        .content('You need to signin first!')
                        .position('top right')
                        .hideDelay(2000)
                )
            }

        };

        $scope.showUndoLike = function(ev, dishId, index){
            if($session.data.auth){
                $http.post($config.api_uri + '/user/' + userId + '/dish/' + dishId + '/unlike')
                    .success(function(response){
                        $scope.dishes[index]['isLike'] = false
                        if($scope.dish && $scope.dish._id === dishId){
                            $scope.dish.isLike = false
                        }
                        $mdToast.show(
                            $mdToast.simple()
                                .content('Dish removed to like')
                                .position('top right')
                                .hideDelay(2000)
                        )
                    })
                    .error(function(response){
                        $mdToast.show(
                            $mdToast.simple()
                                .content(response.error)
                                .position('top right')
                                .hideDelay(2000)
                        )
                    });
            }else{
                $mdToast.show(
                    $mdToast.simple()
                        .content('You need to signin first!')
                        .position('top right')
                        .hideDelay(2000)
                )
            }
        };

        if($scope.dishes.length < 1){
            $scope.getDishes(40.77,-73.97);
        }

    });
angular
	.module( 'ohapp' )
	.controller( 'SigninSignupCtrl', function SigninSignupCtrl( $scope, $injector, $rootScope) {
		var $http = $injector.get( '$http' );
		var $config = $injector.get( '$config' );
		var $timeout = $injector.get( '$timeout' );
		var $state = $injector.get( '$state' );
		var $session = $injector.get('$session');
		var $window = $injector.get('$window')
		var $location = $injector.get('$location');
		var $mdDialog = $injector.get('$mdDialog');
		var $mdMedia = $injector.get('$mdMedia');
		var $mdToast = $injector.get('$mdToast');

		$scope.page = $rootScope.$page

		$scope.passwordSignin = function (e) {
			if (undefined !== e && 13 !== e.which) return;
			if(!$scope.signinForm['emailAddress'].$valid){
				$scope.signinForm.emailAddress.$touched = true
				return;
			}

			if(!$scope.signinForm['password'].$valid){
				$scope.signinForm.password.$touched = true
				return;
			}

			$scope.signin();
		};

		$scope.signin = function () {
			$http
				.post($config.api_uri + '/Apipublic/Apilogin/login_name_pw',{mobile:$scope.user.mobile,password:$scope.user.password})
				.success(function (data) {
					if(data.success){
						$rootScope.$isLogin = true;
						$session.set('auth', data)
						$session.set('phone', $scope.user.mobile)
						$session.save()
						$rootScope.firstName = data.firstName
						$rootScope.lastName = data.lastName
						$state.go('loginCode');
					}else{
						$mdToast.show(
						$mdToast.simple()
							.content(data.error_msg)
							.hideDelay(1000)
					);
					}
				})
		}

		$scope.getCard=function(){
			if(!(/^1[34578]\d{9}$/.test($(".phone").val()))){
				$mdToast.show(
					$mdToast.simple()
							.content("您的手机号输入有误")
							.hideDelay(1000)
					);
				return;
			}
			$http
				.post($config.api_uri + '/Apipublic/Apilogin/get_yzm',{mobile:$scope.user.mobile})
				.success(function (data) {
					if(data.success){
						$rootScope.$isLogin = true;
						$session.set('auth', data)
						$session.set('phone', $scope.user.mobile)
						$session.save()
						$rootScope.firstName = data.firstName
						$rootScope.lastName = data.lastName
						$mdDialog.hide();
						$scope.yzm=data.yzm;
					}else{
						$mdToast.show(
						$mdToast.simple()
							.content(data.error_msg)
							.hideDelay(1000)
						);
					}
				})
		}
		$scope.signup = function () {
			if($scope.yzm!=$scope.cards){
				$mdToast.show(
					$mdToast.simple()
							.content('验证码输入错误')
							.hideDelay(1000)
					);
				return;
			}
			// if(!$scope.signupForm['firstName'].$valid){
			// 	$scope.signupForm.firstName.$touched = true
			// 	return;
			// }
			// if(!$scope.signupForm['lastName'].$valid){
			// 	$scope.signupForm.lastName.$touched = true
			// 	return;
			// }
			// if(!$scope.signupForm['emailAddress'].$valid){
			// 	$scope.signupForm.emailAddress.$touched = true
			// 	return;
			// }
			// if(!$scope.signupForm['password'].$valid){
			// 	$scope.signupForm.password.$touched = true
			// 	return;
			// }

			$http
				.post($config.api_uri + '/Apipublic/Apilogin/save_user',{mobile:$scope.user.mobile,password:$scope.pwd1})
				.success(function (data) {
					if(data.success){
						$rootScope.$isLogin = true;
						$session.set('auth', data)
						$session.set('phone', $scope.user.mobile)
						$session.save()
						$rootScope.firstName = data.firstName
						$rootScope.lastName = data.lastName
						$mdDialog.hide();
						$state.go('signin');
					}else{
						$mdToast.show(
						$mdToast.simple()
							.content(data.error_msg)
							.hideDelay(1000)
						);
					}
					
				})
		}

		$scope.showSignin = function(ev) {
			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
			$mdDialog.show({
				controller: 'SigninSignupCtrl',
				templateUrl: 'views/modals/signin-signup.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
				fullscreen: useFullScreen
			});
			$rootScope.$page = 'signIn'
		}

		$scope.showSignup = function(ev) {
			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
			$mdDialog.show({
				controller: 'SigninSignupCtrl',
				templateUrl: 'views/modals/signin-signup.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
				fullscreen: useFullScreen
			});
			$rootScope.$page = 'signUp'
		}

		$scope.forgotPassword = function(ev) {
			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
			$mdDialog.show({
				controller: 'SigninSignupCtrl',
				templateUrl: 'views/modals/signin-signup.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
				fullscreen: useFullScreen
			});
			$rootScope.$page = 'forgotPassword'
		}

	});
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

        $scope.shops_id=$stateParams.shop_id;
        //加载动画
        $scope.delay = 0;
		$scope.minDuration = 0;
		$scope.message = '正在加载...';
		$scope.backdrop = true;
		$scope.promise = null;
        	//获取商家详情页
        if($stateParams.type==1){
        	$scope.promise=$http
				.post($stateParams.image_url,{shop_id:$stateParams.shop_id,openid:$stateParams.openid})
				.success(function (data) {
					if(data.success){
                        $scope.detail=data.detail;
						$scope.tx_lat = data.tx_lat;
						$scope.tx_lng = data.tx_lng;
						wxConfig()
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
								clickOutsideToClose: false,
								fullscreen: true
							});
							var timer = setInterval(function(){
								if($("#qrcode").html()!=undefined){
									$('#img').attr("src",data.img_url); 
									clearInterval(timer);
								}
							},1000)
						}
                    }
				})
        }else{
        	$scope.promise=$http
				.post($config.api_uri + '/Apipublic/ApiPshop/shopdetail',{shop_id:$stateParams.shop_id,fd_id:$stateParams.fd_id})
				.success(function (data) {
					if(data.success){
						$scope.detail = data.detail;
						$scope.tx_lat = data.tx_lat;
						$scope.tx_lng = data.tx_lng;
						wxConfig()
					}else{
						$mdToast.show(
						$mdToast.simple()
							.content(data.error_msg)
							.hideDelay(1000)
						);
					}
				})
        }
    	//关闭返回按钮
    	$scope.close = function(){
    		console.log($stateParams.type);
    		window.history.go(-1);
    		if($stateParams.type==1){
    			wx.closeWindow();
    		}else{
    			window.history.go(-1);
    		}
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
              		new QRCode(document.getElementById('qrcode'),'http://llx.51loveshow.com/description?shop_id='+$stateParams.shop_id+"&fd_id="+$stateParams.fd_id);
              		 clearInterval(timer);
              	}
              },1000)
		}
		$scope.love = function(){
			$scope.promise=$http
				.post($config.api_uri + '/Apiuser/Sc/add_sc_fd',{fd_id:$stateParams.fd_id})
				.success(function (data) {
					if(data.success){
						$mdToast.show(
						$mdToast.simple()
							.content("分店收藏成功")
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
	// $scope.daohang = function(){
	// 	wxConfig();
	// }
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
            	$("#daohang").click(function(){
		            wx.openLocation({
			            latitude: $scope.tx_lat,
			            longitude: $scope.tx_lng,
			            name: $scope.detail.shop_name,
			            address: $scope.detail.addr,
			            scale: 14,
			            infoUrl: 'http://llx.51loveshow.com/home',
			            success: function(res) {
			            },
			            fail: function(res) {
				            $mdToast.show(
					            $mdToast.simple()
					            .content('导航失败，请刷新页面重试。')
						            // .content(res)
						            .hideDelay(1000)
				            );
			            }
		            });
	            });

		    });
        });
    };

    //获取评价数量

    		$http
				.post($config.api_uri + '/Apipublic/ApiPshop/shopDianPing',{shop_id:$stateParams.shop_id})
				.success(function (data) {
					if(data.success){
						$scope.pingNum = data.totalnum_haspic;
					}else{
					}
				})























    });

angular
    .module( 'ohapp' )
    .controller( 'forgotCtrl', function forgotCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;

        $scope.getCards=function(){
        	$scope.promise = $http
        		.post($config.api_uri + '/Apipublic/Apilogin/resetpw_yzm',{mobile:$scope.phone})
        		.success(function(data){
                    if(data.success){
                        $scope.yzm=data.yzm;
                        $mdToast.show(
                        $mdToast.simple()
                            .content("验证码发送成功")
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

        $scope.changePWD=function(){
        	if($scope.yzm!=$scope.yzms){
        		$mdToast.show(
                        $mdToast.simple()
                            .content('您输入的验证码不正确')
                            .hideDelay(1000)
                        );
        		return;
        	}
        	$scope.promise = $http
        		.post($config.api_uri + '/Apipublic/Apilogin/resetpw',{mobile:$scope.phone,Npassword:$scope.password})
        		.success(function(data){
                    if(data.success){
                        $mdToast.show(
                        $mdToast.simple()
                            .content("请使用新密码登陆")
                            .hideDelay(1000)
                        );
                        $state.go('signin');
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

angular
    .module( 'ohapp' )
    .controller( 'productCtrl', function productCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

            var currIndex = 0;
            $scope.myInterval = 4000;
            var slides = $scope.slides = [];
        $scope.good_id=$stateParams.goods_id;
        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
        
        $scope.promise = $http
				.post($config.api_uri + '/Apipublic/ApiPshop/goodsdetail',{goods_id:$stateParams.goods_id})
				.success(function (data) {
                    if(data.success){
                        $scope.is_vs=data.is_vs;
                        $scope.productMsg_list = data.detail;
                        $scope.slide=data.pics;
                        angular.forEach(
                            $scope.slide, function (item, index) {
                            slides.push({image:item.photo,id:currIndex++})}
                        )
                        $scope.productMsg=data;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
				})

        $scope.addCart = function(){
            $http
                .post($config.api_uri + '/Apiuser/cart/cartadd',{goods_id:$stateParams.goods_id})
                .success(function (data) {
                    if(data.success){
                       $mdToast.show(
                        $mdToast.simple()
                            .content("加入购物车成功")
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

        $scope.love = function(){
            $http
                .post($config.api_uri + '/Apiuser/Sc/add_sc_good',{goods_id:$stateParams.goods_id})
                .success(function (data) {
                    if(data.success){
                       $mdToast.show(
                        $mdToast.simple()
                            .content("商品收藏成功")
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

        $scope.gopay = function(id){
            $http
                .post($config.api_uri + '/Apiuser/cart/cartadd',{goods_id:id})
                .success(function (data) {
                    if(data.success){
                       $state.go('shopcart')
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        }

    //获取评论
        $http
                .post($config.api_uri + '/Apipublic/ApiPshop/goodsdianPing',{goods_id:$scope.good_id,orderby:2})
                .success(function (data) {
                    if(data.success){
                       $scope.items = data.list;
                       $scope.totalnum=data.totalnum;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })

        //点击图片放大
        $scope.checkImg = function(index,pic){
            var pics=[];
            for(var i=0;i<pic.length;i++){
                pics[i]='http://139.224.61.180:8080/attachs/'+pic[i];
            }
            wx.previewImage({
              current:pics[index],
              urls:pics,
            });
        }












    });

angular
    .module( 'ohapp' )
    .controller( 'shopcartCtrl', function shopcartCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        $scope.items=[];
        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
        
        $scope.promise = $http
				.post($config.api_uri + '/Apiuser/cart/cart_list')
				.success(function (data) {
                    if(data.success){
                        $scope.cart_list=data.cart_list;
                        
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
				})

            $scope.delect=function(id){
                $http
                .post($config.api_uri + '/Apiuser/cart/cartdel',{cart_id:id.cart_id})
                .success(function (data) {
                    if(data.success){
                        angular.forEach($scope.cart_list,function(item, index){
                            if(item.cart_id==id.cart_id){
                                $scope.cart_list.splice(index, 1);
                                return;
                            }
                        })
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
            };
            $scope.goPay=function(){
                $scope.items=[];
                angular.forEach($scope.cart_list, function (item) {
                    $scope.items.push(item.cart_id);
                });
                $http
                        .post($config.api_uri + '/Apiuser/Orderinfo/order_cart',{cart_ids:$scope.items})
                        .success(function (data) {
                             if(data.success){
                                if(data.order_id==-1){
                                    $state.go('main.Mycart', {type:'noIndent'});
                                }else{
                                    $state.go('SubmitOrder', {order_id: data.order_id});
                                }
                                $mdToast.show(
                                $mdToast.simple()
                                    .content("下单成功")
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
            };
            

            $scope.remo=function(id){
                if(id.cart_num>1){
                    $http
                        .post($config.api_uri + '/Apiuser/cart/cartedit',{cart_id:id.cart_id,num:parseInt(id.cart_num)-1})
                        .success(function (data) {
                             if(data.success){
                                id.cart_num=parseInt(id.cart_num)-1;
                             }else{
                                $mdToast.show(
                                $mdToast.simple()
                                    .content(data.error_msg)
                                    .hideDelay(1000)
                                );
                             }
                        })
                }else{
                    return id.cart_num=1;
                }
            }
            $scope.add=function(id){
                $http
                .post($config.api_uri + '/Apiuser/cart/cartedit',{cart_id:id.cart_id,num:parseInt(id.cart_num)+1})
                .success(function (data) {
                     if(data.success){
                        id.cart_num=parseInt(id.cart_num)+1;
                     }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                     }
                })
            }
           $scope.getTotalAmount = function () {
                var totalAmount = 0;
                angular.forEach($scope.cart_list, function (item, index, array) {
                    totalAmount += parseInt(item.cart_num);  });
                    return (totalAmount>99?"99+":totalAmount);
             };
             $scope.getTotalPrice = function () {
                var totalPrice = 0;
                angular.forEach($scope.cart_list, function (item, index, array) {
                    totalPrice += item.mall_price/100 * item.cart_num;  });
                    return totalPrice;
             };














    });

angular
    .module( 'ohapp' )
    .controller( 'SubmitOrder', function SubmitOrder( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $config = $injector.get( '$config' );
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $session = $injector.get('$session');
        var $window = $injector.get('$window')
        var $location = $injector.get('$location');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast'); 

        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
        //获取账号余额信息
        $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Userinfo/mainpage')
                .success(function (data) {
                    if(data.success){
                        $scope.gold=data.gold/100;
                        dingdan();
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        $scope.notcut = function(){
            if($scope.needgold>=0||$scope.needgold==''){
                $scope.needgold=$scope.needgold.replace(/(\.\d{2})\d*$/,'\$1');
                $scope.needgold=$scope.needgold>$scope.gold?$scope.gold:$scope.needgold;
                $scope.needgold=$scope.needgold>$scope.total_price/100?$scope.total_price/100:$scope.needgold;
                $scope.totalNeedpay=($scope.total_price-$scope.needgold*100)/100;
            }else{
                $scope.needgold='';
                $scope.totalNeedpay=$scope.total_price/100;
            }
            if($scope.total_price/100-$scope.needgold<0){
                $scope.totalNeedpay=0;
                $scope.needgold=$scope.total_price/100;
            }
        }
        function dingdan(){
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Orderinfo/orderdetail',{order_id:$stateParams.order_id})
                .success(function (data) {
                    if(data.success){
                        $scope.ds=data;
                        $scope.msg = data.detail;
                        $scope.total_price=data.detail.total_price;
                        $scope.order_goods_info=data.order_goods_info;
                        $scope.xiubi=data.detail.can_use_integral;
                        $scope.needgold=data.detail.use_gold;
                        if($scope.needgold>0){
                            $scope.type=1;
                            $scope.needgold=data.detail.use_gold/100;
                            $scope.totalNeedpay=($scope.total_price-$scope.needgold*100)/100;
                        }else{
                            $scope.type=0;
                            $scope.needgold=$scope.gold>$scope.total_price/100?$scope.total_price/100:$scope.gold;
                            $scope.totalNeedpay=($scope.total_price-$scope.needgold*100)/100;
                        }
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        }
        

        $scope.subOrder=function(){
            $http
                .post($config.api_uri + '/Apiuser/Orderinfo/check_order',{order_id:$stateParams.order_id,gold:$scope.needgold,remark:$scope.remark})
                .success(function (data) {
                    if(data.success){
                        if(data.flag==1){
                            $mdToast.show(
                            $mdToast.simple()
                                .content("支付完成")
                                .hideDelay(1000)
                            );
                            $state.go("main.Mycart",{type:"Indented"});
                        }else if(data.flag==2){
                            sessionStorage.setItem('order_id',data.logs.order_id);
                            sessionStorage.setItem('need_pay',data.logs.need_pay/100);
                            sessionStorage.setItem('log_id',data.logs.log_id);
                            sessionStorage.setItem('type',data.logs.type);
                            sessionStorage.setItem('kind',1);
                            $state.go('code');
                        }
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

angular
    .module( 'ohapp' )
    .controller( 'personalCtrl', function personalCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
          
            $scope.$emit('changeImg', 5); 

            $scope.showup=1;

            //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;

            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Userinfo/mainpage')
                .success(function (data) {
                    if(data.success){
                        $scope.userMsg=data;
                        $session.set('face', data.face)
                        $session.set('phone', data.mobile)
                        $session.save()
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
    
        $scope.exit = function(){
            $session.purge('auth');
            $state.go("signin");
            if(!$session.get('auth').token){
                $mdToast.show(
                        $mdToast.simple()
                            .content("退出成功")
                            .hideDelay(1000)
                        );
            }
        }

    });

angular
    .module( 'ohapp' )
    .controller( 'applyCashCtrl', function applyCashCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;

        if($stateParams.type=='drawal'){
            $scope.chose1=0;$scope.chose2=0;$scope.chose3=1;
        }else{
            $scope.chose1=1;$scope.chose2=0;$scope.chose3=0;
        }
        $scope.chose = function(id){
            switch (id) {
                case 1 :
                if($scope.chose1==1){
                    return;
                }
                $scope.chose1=1;$scope.chose2=0;$scope.chose3=0;
                break;
                case 2 :
                if($scope.chose2==1){
                    return;
                }
                $scope.chose1=0;$scope.chose2=1;$scope.chose3=0;
                break;
                case 3 :
                if($scope.chose3==1){
                    return;
                }
                $scope.chose1=0;$scope.chose2=0;$scope.chose3=1;
                break;
            }
        }

    });

angular
    .module( 'ohapp' )
    .controller( 'AccountCtrl', function AccountCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
    
// 注释信息
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;

            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Userinfo/mainpage')
                .success(function (data) {
                    if(data.success){
                        $scope.userMsg=data;
                        $session.set('face', data.face)
                        $session.set('nickname', data.nickname);
                        $session.save()
                        $scope.nickname=data.nickname;
                        $scope.phones=data.mobile;
                        $scope.phone=$scope.phones.slice(0,3)+"****"+$scope.phones.slice(7,11);
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
















    });

angular
    .module( 'ohapp' )
    .controller( 'changePwdCtrl', function changePwdCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

         //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在获取信息...';
        $scope.backdrop = true;
        $scope.promise = null;
        $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Userinfo/mainpage')
                .success(function (data) {
                    if(data.success){
                        $scope.phones=data.mobile;
                        $scope.mobile=$scope.phones.slice(0,3)+"****"+$scope.phones.slice(7,11);
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content("获取信息失败，请重试")
                            .hideDelay(1000)
                        );
                    }
                })

        $scope.getCard = function(){
                 $scope.promise = $http
                    .post($config.api_uri + '/Apipublic/Apilogin/resetpw_yzm',{mobile:$scope.phones})
                    .success(function (data) {
                        if(data.success){
                             $scope.getYzm=data.yzm;
                        }else{
                            $mdToast.show(
                            $mdToast.simple()
                                .content(data.error_msg)
                                .hideDelay(1000)
                            );
                        }
                    })
            }

            $scope.change = function(){
                if($scope.getYzm!=$scope.yzm){
                    $mdToast.show(
                            $mdToast.simple()
                                .content("验证码不正确")
                                .hideDelay(1000)
                            );
                    return;
                }
                 $scope.promise = $http
                    .post($config.api_uri + '/Apipublic/Apilogin/resetpw',{mobile:$session.get('phone'),Npassword:$scope.password})
                    .success(function (data) {
                        if(data.success){
                            $mdToast.show(
                            $mdToast.simple()
                                .content("密码修改成功")
                                .hideDelay(1000)
                            );
                             $session.purge('auth');
                             $state.go('signin');
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

angular
    .module( 'ohapp' )
    .controller( 'MaddressCtrl', function MaddressCtrl( $scope, $injector, $rootScope,Address,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');	

        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
        $scope.scroll_switch = 1;
        $scope.address = new Address();
        //兼容选择收货地址
        $scope.good_id=$stateParams.goods_id;

        $scope.delect =  function(adrId){
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Adr/delete',{addr_id:adrId})
                .success(function (data) {
                    if(data.status=="success"){
                        $mdToast.show(
                                $mdToast.simple()
                                    .content(data.error_msg)
                                    .hideDelay(1000)
                                );
                        angular.forEach($scope.address.items,function(item, index){
                            if(item.addr_id==adrId){
                                $scope.address.items.splice(index, 1); 
                                return;
                            }
                        })
                        
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        }

        $scope.changeImg = function(addr){
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Adr/update_addr',{addr_id:addr})
                .success(function (data) {
                    if(data.success){
                        $http
                            .post($config.api_uri + '/Apiuser/Adr/index')
                            .success(function (data) {
                                $scope.address.items = [];
                                $scope.address.end = false;
                                $scope.address.busy = false;
                                $scope.address.page = 1;
                                $scope.address.nextPage();
                            })
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

angular
    .module( 'ohapp' )
    .controller( 'addAddressCtrl', function addAddressCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
        $scope.add=0;

         //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;

    $scope.choseAdd = function(){
        $scope.add=1;
        $scope.promise = $http
                .post($config.api_uri + '/Apipublic/ApiPmall/get_nprovince')
                .success(function (data) {
                    if(data.success){
                        $scope.add_p = data.province_list;
                        $scope.add_near=[];
                    }else{
                       $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })

        $scope.province_code = function(privence,ap){
            $scope.promise = $http.post($config.api_uri + '/Apipublic/ApiPmall/get_ncity',{province_code:privence})
                .success(function (data) {
                    if(data.success){
                        $scope.p=ap;
                        $scope.privence=privence;
                        $scope.add_p=[];
                        $scope.add_c = data.city_list;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        }

        $scope.choseNear = function(city,ac){
            $scope.promise = $http.post($config.api_uri + '/Apipublic/ApiPmall/get_narea',{city_code:city})
                .success(function (data) {
                    if(data.success){
                        $scope.c=ac;
                        $scope.add_p=[];
                        $scope.add_c=[];
                        $scope.add_near=data.area_list;
                        $scope.city=city;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        }

        $scope.toacrt = function(near,an){
            $scope.add=0;
            $scope.n=an;
            $scope.near=near;
        }
    }
    $scope.chosedefault=0;
    $scope.choseImg = function(){
        $scope.chosedefault=!$scope.chosedefault;
    }
    $scope.submitAdd = function(){
        if($scope.chosedefault){
            $scope.isdefault=1
        }else{
            $scope.isdefault=0
        }
        $scope.promise = $http.post($config.api_uri + '/Apiuser/Adr/add_addr',{name:$scope.shoup,city_code:$scope.city,area_code:$scope.near,province_code:$scope.privence,mobile:$scope.shoutel,addr:$scope.shoutear,default:$scope.isdefault})
                .success(function (data) {
                    if(data.status=='success'){
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                        window.history.go(-1);
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

angular
    .module( 'ohapp' )
    .controller( 'chaAddressCtrl', function chaAddressCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
	
        $scope.add=0;
         //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;

        $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Adr/index')
                .success(function (data) {
                    if(data.success){
                        angular.forEach(data.addr,function(item, index){
                            if(item.addr_id==$stateParams.addr_id){
                                $scope.adr=item;
                                $scope.shoup=item.name;
                                $scope.shoutel=item.mobile;
                                $scope.p=item.province_name;
                                $scope.c=item.city_name;
                                $scope.n=item.area_name;
                                $scope.shoutear=item.addr;
                                $scope.chosedefault=item.is_default;
                                $scope.privence=item.province_code;
                                $scope.city=item.city_code;
                                $scope.near=item.area_code;
                            }
                        })
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })

    $scope.choseAdd = function(){
        $scope.add=1;
        $scope.promise = $http
                .post($config.api_uri + '/Apipublic/ApiPmall/get_nprovince')
                .success(function (data) {
                    if(data.success){
                        $scope.add_p = data.province_list;
                        $scope.add_near=[];
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })

        $scope.province_code = function(privence,ap){
            $scope.promise = $http.post($config.api_uri + '/Apipublic/ApiPmall/get_ncity',{province_code:privence})
                .success(function (data) {
                    if(data.success){
                        $scope.p=ap;
                        $scope.privence=privence;
                        $scope.add_p=[];
                        $scope.add_c = data.city_list;
                    }else{
                       $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        }

        $scope.choseNear = function(city,ac){
            $scope.promise = $http.post($config.api_uri + '/Apipublic/ApiPmall/get_narea',{city_code:city})
                .success(function (data) {
                    if(data.success){
                        $scope.c=ac;
                        $scope.city=city;
                        $scope.add_p=[];
                        $scope.add_c=[];
                        $scope.add_near=data.area_list;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        }

        $scope.toacrt = function(near,an){
            $scope.add=0;
            $scope.n=an;
            $scope.near=near;
        }
    }

    $scope.choseImg = function(){
        $scope.chosedefault==0?$scope.chosedefault=1:$scope.chosedefault=0;
    }

    $scope.baocun = function(){
        $http.post($config.api_uri + '/Apiuser/Adr/edit_addr',{addr_id:$stateParams.addr_id,name:$scope.shoup,city_code:$scope.city,area_code:$scope.near,province_code:$scope.privence,mobile:$scope.shoutel,addr:$scope.shoutear,default:$scope.chosedefault})
                .success(function (data) {
                    if(data.status=='success'){
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                        $state.go("Maddress");
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })

    }

   $scope.deladdr =  function(){
       $http.post($config.api_uri + '/Apiuser/Adr/delete',{addr_id:$stateParams.addr_id})
                .success(function (data) {
                    if(data.status=="success"){
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                        $state.go("Maddress");
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

angular
    .module( 'ohapp' )
    .controller( 'updataTotalCtrl', function updataTotalCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
	
        $scope.show=true;
        $scope.face=$session.get("face");
    function ajaxupload(data) {
            $http
                .post($config.api_uri + '/Apiuser/Userinfo/upload1',{face:data})
                .success(function (data) {
                    if(data.success){
                        $scope.face = data.face;
                        $scope.show=false;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
    }
    $('.now-change').click(function(){
            $http
                .post($config.api_uri + '/Apiuser/Userinfo/changeface',{face:$scope.face})
                .success(function (data) {
                    if(data.success){
                        $mdToast.show(
                        $mdToast.simple()
                            .content("修改成功")
                            .hideDelay(1000)
                        );
                        $scope.show=true;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
    })
    //点击上传按钮
    $(document).ready(function () {
        var img;
        $('#fileToUpload').localResizeIMG({
            width: 300,
            height: 300,
            quality: 1,
            success: function (result) {
                var a=$("#img_input").val(result.base64);
                img =new Image;
                img.src = result.base64;
                ajaxupload(img.src);
            }
        });
    });














    });

angular
    .module( 'ohapp' )
    .controller( 'MycartCtrl', function MycartCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
        var i=0;

        $scope.$emit('changeImg', 2); 
        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;

        if($stateParams.type=='noIndent'){
            $scope.chose1=0;$scope.chose2=1;$scope.chose3=0;
            // noIndent();
        }else if($stateParams.type=='Indented'){
            $scope.chose1=0;$scope.chose2=0;$scope.chose3=1;
            // Indented();
        }else{
            $scope.chose1=1;$scope.chose2=0;$scope.chose3=0;
            // allIndent();
        }

        $scope.chose = function(id){
            switch (id) {
                case 1 :
                $scope.chose1=1;$scope.chose2=0;$scope.chose3=0;
                // allIndent();
                break;
                case 2 :
                $scope.chose1=0;$scope.chose2=1;$scope.chose3=0;
                // noIndent();
                break;
                case 3 :
                $scope.chose1=0;$scope.chose2=0;$scope.chose3=1;
                // Indented();
                break;
            }
        }

        $scope.back = function(){
            $state.go("main.personal");
        }







    });

angular
    .module( 'ohapp' )
    .controller( 'choseAddressCtrl', function choseAddressCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');	

        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;

        $scope.promise=$http
                .post($config.api_uri + '/Apipublic/ApiPmall/get_nprovince')
                .success(function (data) {
                    if(data.success){
                        $scope.add_p = data.province_list;
                        $scope.add_near=[];
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })

        $scope.province_code = function(privence,ap){
            $scope.promise=$http.post($config.api_uri + '/Apipublic/ApiPmall/get_ncity',{province_code:privence})
                .success(function (data) {
                    if(data.success){
                        $scope.p=ap;
                        $scope.add_p=[];
                        $scope.add_near=[];
                        $scope.add_c = data.city_list;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        }

        $scope.choseNear = function(city,ac){
            $scope.promise=$http.post($config.api_uri + '/Apipublic/ApiPmall/get_narea',{city_code:city})
                .success(function (data) {
                    if(data.success){
                        sessionStorage.setItem('citycodes',city);
                        $scope.c=ac;
                        $scope.add_p=[];
                        $scope.add_c=[];
                        $scope.add_near=data.area_list;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        }
        $scope.toacrt = function(near,an){
            sessionStorage.setItem('area_code',near);
            sessionStorage.setItem('area_name',an);
            window.history.back();
        }
















    });

angular
    .module( 'ohapp' )
    .controller( 'nicknameCtrl', function nicknameCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在修改昵称...';
        $scope.backdrop = true;
        $scope.promise = null;

       $scope.nickname=$session.get("nickname");

       $scope.changeNick = function(){
             $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Userinfo/nickname',{nickname:$scope.nickname})
                .success(function (data) {
                    if(data.success){
                        $session.set('nickname', $scope.nickname);
                        $mdToast.show(
                        $mdToast.simple()
                            .content("修改成功")
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

angular
    .module( 'ohapp' )
    .controller( 'IndentMsgCtrl', function IndentMsgCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Orderinfo/orderdetail',{order_id:$stateParams.order_id})
                .success(function (data) {
                    if(data.success){
                        $scope.msg = data.detail;
                        $scope.order_goods_info=data.order_goods_info;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })

















    });

angular
    .module( 'ohapp' )
    .controller( 'preferentialCtrl', function preferentialCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
        $scope.fenxiao=0;
        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Yhk/index')
                .success(function (data) {
                    if(data.success){
                        $scope.yhk = data.yhk;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })


                $scope.preferential = function(id){
                    $http
                        .post($config.api_uri + '/Apiuser/Yhk/share',{shop_id:id})
                        .success(function (data) {
                            if(data.success){
                                $scope.url = data.url;
                                $mdDialog.show({
                                    scope: $scope,
                                    preserveScope: true,
                                    templateUrl: 'views/erweima.html',
                                    parent: angular.element(document.body),
                                    clickOutsideToClose: true,
                                    fullscreen: true
                                });
                                var timer = setInterval(function(){
                                    if($("#qrcode").html()!=undefined){
                                        new QRCode(document.getElementById('qrcode'),'http://llx.51loveshow.com/preCode?shop_id='+id+"&image_url="+$scope.url);
                                         clearInterval(timer);
                                    }
                                  },1000)
                            }else{
                                $mdToast.show(
                                $mdToast.simple()
                                    .content(data.error_msg)
                                    .hideDelay(1000)
                                );
                            }
                        })
                }
                $scope.closeDialog = function(){
                    $mdDialog.hide();
                }















    });

angular
    .module( 'ohapp' )
    .controller( 'OpinionCtrl', function OpinionCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
        
        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;

        $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Orderinfo/orderdetail',{order_id:$stateParams.order_id})
                .success(function (data) {
                    if(data.success){
                        $scope.Msg=data;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })


    $scope.i=4;
      $scope.tijiao = function(){
        $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Orderinfo/dianping',{order_id:$stateParams.order_id,score:$scope.i,contents:$scope.contents,photos_path:$scope.pic})
                .success(function (data) {
                    if(data.success){
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                        window.history.go(-1);
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
      }

      //评价星星
      $(document).ready(function(){
        var stepW = 0.6;
        var stars = $("#star > li");
        $("#showb").css("width",0);
        stars.each(function(i){
        $(stars[i]).click(function(e){
                var n = i+1;
                $("#showb").css({"width":stepW*n+"rem"});
                $(this).find('a').blur();
                $scope.i=n;
                return stopDefault(e);
            });
        });
    });
        function stopDefault(e){
            if(e && e.preventDefault)
                   e.preventDefault();
            else
                   window.event.returnValue = false;
            return false;
        };

        //保存图片
        $scope.pic=[];
        function ajaxupload(data) {
            $http
                .post($config.api_uri + '/Apiuser/Orderinfo/save_dp_pic',{dp_pic:data})
                .success(function (data) {
                    if(data.success){
                        $scope.pic.push(data.pic_path);
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
    }

    $(document).ready(function () {
        var img;
        $('#fileToUpload').localResizeIMG({
            width: 300,
            height: 300,
            quality: 1,
            success: function (result) {
                var a=$("#img_input").val(result.base64);
                img =new Image;
                img.src = result.base64;
                ajaxupload(img.src);
            }
        });
    });











    });

angular
    .module( 'ohapp' )
    .controller( 'informationCtrl', function informationCtrl( $scope, $injector, $rootScope,system,mumber) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

            $scope.$emit('changeImg', 4); 
         $scope.chose1=1;$scope.chose2=0;
            $scope.chose = function(id){
                switch (id) {
                    case 1 :
                    if($scope.chose1==1){
                        return;
                    }
                    $scope.chose1=1;$scope.chose2=0;
                    break;
                    case 2 :
                    if($scope.chose2==1){
                        return;
                    }
                    $scope.chose1=0;$scope.chose2=1;
                    break;
                }
            }
















    });

angular
    .module( 'ohapp' )
    .controller( 'OfferPayCtrl', function OfferPayCtrl( $scope, $injector, $rootScope,OfferPay) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');	
        $scope.$emit('changeImg', 3); 

        $scope.scroll_switch = 1;
        $scope.offerpay = new OfferPay();















    });

angular
    .module( 'ohapp' )
    .controller( 'restaurantsCtrl', function restaurantsCtrl( $scope, $injector, $rootScope,Shops,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
             //加载动画
            $scope.delay = 0;
            $scope.minDuration = 0;
            $scope.message = '正在加载...';
            $scope.backdrop = true;
            $scope.promise = null;

            $scope.Area=$stateParams.area_code;
            $scope.trues=false;
            $scope.cate_name=$stateParams.cate_name;
            $scope.cate_id=$stateParams.cate_id;
            //获取筛选分类
            $scope.promise = $http
                .post($config.api_uri + '/Apipublic/ApiPmall/getshopscate',{parent_id:$stateParams.cate_id})
                .success(function (data) {
                    if(data.success){
                        $scope.cate_list=data.cate_list
                    }else{
                       $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
            //获取区域分类
            $scope.promise = $http
                .post($config.api_uri + '/Apipublic/ApiPmall/get_narea',{city_code:$stateParams.citycode})
                .success(function (data) {
                    if(data.success){
                        $scope.area_list=data.area_list;
                    }else{
                       $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })


            //初始化加载页面
            $scope.scroll_switch = 1;
            $scope.shops = new Shops();
            $scope.shops.cate_id=$stateParams.cate_id;
            $scope.shops.order=$scope.order;
            $scope.shops.lat=$stateParams.lat;
            $scope.shops.lng=$stateParams.lng;
            $scope.shops.area_code=$stateParams.area_code;
            $scope.shops.items = [];
            $scope.shops.end = false;
            $scope.shops.busy = false;
            $scope.shops.page = 1;
            $scope.shops.nextPage();
            //控制筛选
        $scope.jiazai = function(){
            $scope.shops.order=$scope.order;
            $scope.shops.items = [];
            $scope.shops.end = false;
            $scope.shops.busy = false;
            $scope.shops.page = 1;
            $scope.shops.nextPage();
        }
        


        $scope.step==0;
        $scope.choseStep = function(step){
            switch (step) {
                case 1 :
                    $scope.step==1?$scope.step=0:$scope.step=1;
                    break;
                case 2 :
                    $scope.step==2?$scope.step=0:$scope.step=2;
                    break;
                case 3 :
                    $scope.step==3?$scope.step=0:$scope.step=3;
                    break;
            }
        }
        $scope.step2=11;
        $scope.chosech="智能排序";
        $scope.choseStep2 = function(steps){
            switch (steps) {
                case 11 :
                    $scope.step2=11;$scope.step=0;
                    $scope.chosech="智能排序";
                    $scope.order='';
                    $scope.jiazai();
                    break;
                case 12 :
                    $scope.step2=12;$scope.step=0;
                    $scope.chosech="离我最近";
                    $scope.order=1;
                    $scope.jiazai();
                    break;
                case 13 :
                    $scope.step2=13;$scope.step=0;
                    $scope.chosech="人气最高";
                    $scope.order=2;
                    $scope.jiazai();
                    break;
                case 14 :
                    $scope.step2=14;$scope.step=0;
                    $scope.chosech="好评优先";
                    $scope.order=3;
                    $scope.jiazai();
                    break;
            }
        }

        //筛选
        $scope.choseCate = function(id){
            $scope.trues=id;
            $scope.shops.cate_id=id;
            $scope.shops.items = [];
            $scope.shops.end = false;
            $scope.shops.busy = false;
            $scope.shops.page = 1;
            $scope.shops.nextPage();
            $scope.step=0;
        }

        //区域
        $scope.choseArea = function(id){
            $scope.Area=id;
            $scope.trues='';
            $scope.shops.area_code=id;
            //还原筛选
            $scope.shops.cate_id=$stateParams.cate_id;
            $scope.shops.items = [];
            $scope.shops.end = false;
            $scope.shops.busy = false;
            $scope.shops.page = 1;
            $scope.shops.nextPage();
            $scope.step=0;
        }

        window.filterByEnter = function(e){
            if(e.keyCode==13){
                $scope.$apply(function(){
                    $scope.shops.shop_name=$scope.text;
                    $scope.shops.items = [];
                    $scope.shops.end = false;
                    $scope.shops.busy = false;
                    $scope.shops.page = 1;
                    $scope.shops.nextPage();
                })
            }
        };
    $scope.soso = function(){
        $scope.shops.shop_name=$scope.text;
        $scope.shops.items = [];
        $scope.shops.end = false;
        $scope.shops.busy = false;
        $scope.shops.page = 1;
        $scope.shops.nextPage();
    }

    //跳转店铺
    $scope.choseShop = function(id,fd){
        location.href = 'http://llx.51loveshow.com/description?shop_id='+id+'&fd_id='+fd;
        // $state.go('description',{shop_id:id,fd_id:fd});
        // sessionStorage.setItem('scrollTop',$(document).scrollTop());
    }










    });

angular
    .module( 'ohapp' )
    .controller( 'systemMsgCtrl', function systemMsgCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Message/msgshow',{msg_id:$stateParams.msg_id})
                .success(function (data) {
                    if(data.success){
                       $scope.detail=data.detail;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
















    });

angular
    .module( 'ohapp' )
    .controller( 'mumberMsgCtrl', function mumberMsgCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;

            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Message/vipmsgshow',{msg_id:$stateParams.msg_id})
                .success(function (data) {
                    if(data.success){
                       $scope.detail=data.detail;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })













    });

angular
    .module( 'ohapp' )
    .controller( 'shopMsgCtrl', function shopMsgCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
            $scope.promise = $http
                .post($config.api_uri + '/Apipublic/ApiPshop/shopdetail',{shop_id:$stateParams.shop_id})
                .success(function (data) {
                    if(data.success){
                        $scope.detail=data.detail;
                        $scope.shop_audit=data.shop_audit;
                        $scope.ex = data.ex;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
           

















    });

angular
    .module( 'ohapp' )
    .controller( 'shopCenterCtrl', function shopCenterCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
            $scope.promise = $http
                    .post($config.api_uri+'/Apishop/ApiSmall/index')
                    .success(function (data) {
                        if(data.success){
                            $scope.shopdata=data;
                        }else{
                           $mdToast.show(
                            $mdToast.simple()
                                .content(data.error_msg)
                                .hideDelay(1000)
                            );
                        }
                    })

        $scope.exit = function(){
            $session.purge('auth');
            if(!$session.get('auth').token){
                window.location.reload();
                $mdToast.show(
                        $mdToast.simple()
                            .content("退出成功")
                            .hideDelay(1000)
                        );
            }
        }



    });

angular
    .module( 'ohapp' )
    .controller( 'basicCtrl', function basicCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
        $scope.chose1=1;$scope.chose2=0;
        $scope.chose = function(id){
                switch (id) {
                    case 1 :
                    $scope.chose1=1;$scope.chose2=0;
                    break;
                    case 2 :
                    $scope.chose1=0;$scope.chose2=1;
                    anImg();
                    break;
                }
            }

        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
            //获取信息
            $scope.promise = $http
                    .post($config.api_uri+'/Apishop/ApiSmall/index')
                    .success(function (data) {
                        if(data.success){
                            $scope.shopdata=data;
                        }else{
                           $mdToast.show(
                            $mdToast.simple()
                                .content(data.error_msg)
                                .hideDelay(1000)
                            );
                        }
                    })



                $scope.baseMsg = function (){
                    $scope.promise = $http
                        .post($config.api_uri+'/Apishop/ApiSmall/save_about',{addr:$scope.shopdata.shop_info.addr,contact:$scope.shopdata.shop_info.contact,tel:$scope.shopdata.shop_info.tel,business_time:$scope.shopdata.shop_detail.business_time})
                        .success(function (data) {
                            if(data.success){
                                $mdToast.show(
                                $mdToast.simple()
                                    .content("保存成功")
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
            

            function anImg (){
                $scope.promise = $http
                    .post($config.api_uri+'/Apishop/ApiSmall/photo')
                    .success(function (data) {
                        if(data.success){
                            $scope.shop_pics=data.shop_pics;
                        }else{
                           $mdToast.show(
                            $mdToast.simple()
                                .content(data.error_msg)
                                .hideDelay(1000)
                            );
                        }
                    })
            }

            $scope.delect=function(id){
                $scope.promise = $http
                    .post($config.api_uri+'/Apishop/ApiSmall/photo_delete',{pic_id:id})
                    .success(function (data) {
                        if(data.success){
                            angular.forEach($scope.shop_pics,function(item, index){
                                if(item.pic_id==id){
                                    $scope.shop_pics.splice(index, 1);
                                    return;
                                }
                            });
                            $mdToast.show(
                            $mdToast.simple()
                                .content("删除成功")
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

angular
    .module( 'ohapp' )
    .controller( 'addEnvironmentCtrl', function addEnvironmentCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        $scope.show=0;
        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.backdrop = true;
        $scope.promise = null;
        //上传图片
                function ajaxupload(data) {
                    $scope.message = '正在上传图片...';
                        $scope.promise = $http
                            .post($config.api_uri + '/Apishop/ApiSmall/upload',{shop_pic:data})
                            .success(function (data) {
                                if(data.success){
                                    $scope.shop_pic = data.path;
                                    $scope.show=1;
                                }else{
                                    $mdToast.show(
                                    $mdToast.simple()
                                        .content(data.error_msg)
                                        .hideDelay(1000)
                                    );
                                }
                            })
                };
                $scope.choseAdd = function(){
                    $scope.message = '正在添加图片...';
                    $scope.promise = $http
                            .post($config.api_uri + '/Apishop/ApiSmall/add_shop_pic',{title:$("#title").val(),photo:$scope.shop_pic,orderby:$("#orderby").val()})
                            .success(function (data) {
                                if(data.success){
                                    $mdToast.show(
                                    $mdToast.simple()
                                        .content("添加成功")
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

                $(document).ready(function () {
                    var img;
                    $('#fileToUpload').localResizeIMG({
                        width: 300,
                        height: 300,
                        quality: 1,
                        success: function (result) {
                            var a=$("#img_input").val(result.base64);
                            img =new Image;
                            img.src = result.base64;
                            ajaxupload(img.src);
                        }
                    });
                });




    });

angular
    .module( 'ohapp' )
    .controller( 'addPayCtrl', function addPayCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        var i=1;
        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在创建中...';
        $scope.backdrop = true;
        $scope.promise = null;

        $scope.chose = function(){
            if($scope.mobile.length==11){
                //查询优惠信息
                 $scope.promise = $http
                    .post($config.api_uri+'/Apishop/ApiSmall/index')
                    .success(function (data) {
                        if(data.success){
                            $scope.shop_info=data.shop_info;
                        }else{
                           $mdToast.show(
                            $mdToast.simple()
                                .content(data.error_msg)
                                .hideDelay(2000)
                            );
                        }
                    })

                $scope.promise = $http
                    .post($config.api_uri+'/Apishop/ApiSorder/get_zp',{mobile:$scope.mobile})
                    .success(function (data) {
                        if(data.success){
                            $scope.pay=data;
                            
                        }else{
                           $mdToast.show(
                            $mdToast.simple()
                                .content(data.error_msg)
                                .hideDelay(2000)
                            );
                        }
                    })
                
            }
        }

        //优惠卡折扣信息
        $scope.jiner = function(){
            if($scope.total>=0||$scope.total==''){
                $scope.total=$scope.total.replace(/(\.\d{2})\d*$/,'\$1');
            }else{
                $scope.total='';
            };
            if($scope.pay.yhk.bd!=0){
               $scope.bd = parseInt($scope.total/100)*$scope.shop_info.yhk1>$scope.pay.yhk.bd?$scope.pay.yhk.bd:parseInt($scope.total/100)*$scope.shop_info.yhk1;
               $scope.bds=-$scope.bd;
            }else if($scope.pay.yhk.qt!=0){
                $scope.bd = parseInt($scope.total/100)*$scope.shop_info.yhk1>$scope.pay.yhk.qt?$scope.pay.yhk.qt:parseInt($scope.total/100)*$scope.shop_info.yhk2;
                $scope.bds=-$scope.bd;
            }else{
                $scope.bd = 0;
                $scope.bds=-$scope.bd;
            }
        }




        $scope.affirm = function(){
            var descs=[],qtys=[];
                    angular.forEach($scope.pay.zp_list,function(item, index){
                            descs.push(item.zp_name);
                            qtys.push(item.zp_nums);
                        });
            $scope.promise = $http
                    .post($config.api_uri+'/Apishop/ApiSorder/create',{mobile:$scope.mobile,remark:$scope.remark,total:$scope.total,desc:descs,qty:qtys})
                    .success(function (data) {
                        if(data.success){
                            $mdToast.show(
                            $mdToast.simple()
                                .content("创建成功")
                                .hideDelay(2000)
                            );
                            $state.go("payShop");
                        }else{
                           $mdToast.show(
                            $mdToast.simple()
                                .content(data.error_msg)
                                .hideDelay(2000)
                            );
                        }
                    })
        }

    //添加
    
    // $scope.add = function() {
    //     i++;
    //     $(".czhao").before(
    // '<div class="msg-items"><span style="text-indent: 1em;float: left;">赠品</span><input type="text" class="zenpin desc'+i+'" ng-model="desc'+i+'"><button class="anniu" onclick="qty'+i+'=(qty'+i+'-1)>0?(qty'+i+'-1):0">-</button><input class="munZen qty'+i+'" ng-init="qty'+i+'=0" ng-model="qty'+i+'" value="0" style="width:1.0rem;height:1.2rem"><button class="anniu" onclick="qty'+i+'=qty'+i+'+1">+</button></div>'
    //         );
    // }

    // $scope.add = function() {
    //     i++;
    //     $(".czhao").before(
    // '<div class="msg-items"><span style="text-indent: 1em;float: left;">赠品</span><input type="text" class="zenpin desc'+i+'" ng-model="desc'+i+'"><button class="anniu" onclick="cut()">-</button><input class="munZen qty'+i+'" ng-init="qty'+i+'=0" ng-model="qty'+i+'" value="0" style="width:1.0rem;height:1.2rem"><button class="anniu" onclick="qty'+i+'=qty'+i+'+1">+</button></div>'
    //         );
    // }



    });

angular
    .module( 'ohapp' )
    .controller( 'payShopCtrl', function payShopCtrl( $scope, $injector, $rootScope,payShop) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');	
        $scope.$emit('changeImg', 3); 

        $scope.scroll_switch = 1;
        $scope.offerpay = new payShop();


        //soso界面
        window.filterByEnter = function(e){
            if(e.keyCode==13){
                $scope.$apply(function(){
                    $scope.offerpay.mobile = $scope.mobile;
                    $scope.offerpay.items = [];
                    $scope.offerpay.end = false;
                    $scope.offerpay.busy = false;
                    $scope.offerpay.page = 1;
                    $scope.offerpay.nextPage();
                })
            }
        };
        $scope.soso = function(){
            $scope.offerpay.mobile = $scope.mobile;
            $scope.offerpay.items = [];
            $scope.offerpay.end = false;
            $scope.offerpay.busy = false;
            $scope.offerpay.page = 1;
            $scope.offerpay.nextPage();
        }

        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在删除...';
        $scope.backdrop = true;
        $scope.promise = null;
        $scope.delect = function(id){
            if(confirm("确认删除此订单？")){
                $scope.promise = $http
                .post($config.api_uri + '/Apishop/ApiSorder/delete',{id:id})
                .success(function (data) {
                    if(data.success){
                        $scope.offerpay.items = [];
                        $scope.offerpay.end = false;
                        $scope.offerpay.busy = false;
                        $scope.offerpay.page = 1;
                        $scope.offerpay.nextPage();
                         $mdToast.show(
                            $mdToast.simple()
                            .content("删除成功")
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
            }else{
                
            }
            // $scope.promise = $http
            //     .post($config.api_uri + '/Apishop/ApiSorder/delete',{id:id})
            //     .success(function (data) {
            //         if(data.success){
            //             $scope.offerpay.items = [];
            //             $scope.offerpay.end = false;
            //             $scope.offerpay.busy = false;
            //             $scope.offerpay.page = 1;
            //             $scope.offerpay.nextPage();
            //         }else{
            //             $mdToast.show(
            //             $mdToast.simple()
            //                 .content(data.error_msg)
            //                 .hideDelay(1000)
            //             );
            //         }
            //     })
        }












    });

angular
    .module( 'ohapp' )
    .controller( 'myTeamCtrl', function myTeamCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
        $scope.chose=0;

        $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Team/index')
                .success(function (data) {
                    if(data.success){
                        $scope.shop = data.shop;
                    }else{
                       $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })

        $scope.selectChange = function(id){
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Team/index',{shop_id:id})
                .success(function (data) {
                    if(data.success){
                        $scope.chose=1;
                        $scope.fx=data;
                        $scope.team1_info = data.team1_info;
                        $scope.team2_info = data.team2_info;
                        $scope.team3_info = data.team3_info;
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

angular
    .module( 'ohapp' )
    .controller( 'codeCtrl', function codeCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config2' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
        if(!GetRequest().code){
                var redirect_url = 'http://llx.51loveshow.com/code';
                location.href =  "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0d70247bb52ac37e&redirect_uri="+encodeURIComponent(redirect_url)+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
            }else{
                $http({
                    method: 'POST',
                    url: 'http://be.51loveshow.com/Apipublic/WxPay/get_openidbycode',
                    data:{code:GetRequest().code}
                }).success(function (data) {
                    sessionStorage.setItem('code',data.openid);
                    $state.go("payment");
                })
        }


        function GetRequest() {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }















    });

angular
    .module( 'ohapp' )
    .controller( 'shopFansCtrl', function shopFansCtrl( $scope, $injector, $rootScope,shopFans) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        $scope.scroll_switch = 1;
        $scope.offerpay = new shopFans();
        //soso界面
        window.filterByEnter = function(e){
            if(e.keyCode==13){
                $scope.$apply(function(){
                    $scope.offerpay.mobile = $scope.mobile;
                    $scope.offerpay.items = [];
                    $scope.offerpay.end = false;
                    $scope.offerpay.busy = false;
                    $scope.offerpay.page = 1;
                    $scope.offerpay.nextPage();
                })
            }
        };
        $scope.soso = function(){
            $scope.offerpay.mobile = $scope.mobile;
            $scope.offerpay.items = [];
            $scope.offerpay.end = false;
            $scope.offerpay.busy = false;
            $scope.offerpay.page = 1;
            $scope.offerpay.nextPage();
        }



    });

angular
    .module( 'ohapp' )
    .controller( 'certificationCtrl', function certificationCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

         //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.backdrop = true;
        $scope.promise = null;
        $scope.show=0;$scope.shows=0;
        //上传图片
                function ajaxupload(data,type) {
                        //保存图片地址，暂无数据
                        $scope.message = '正在上传图片...';
                        $scope.promise = $http
                            .post($config.api_uri + '/Apishop/Audit/uploadpic',{photo:data})
                            .success(function (data) {
                                if(data.success){
                                    if(type==1){
                                        $scope.photo = data.pic_path;
                                        $scope.show=1;
                                    }else if(type==2){
                                        $scope.pic = data.pic_path;
                                        $scope.shows=1;
                                    }
                                    
                                }else{
                                    $mdToast.show(
                                    $mdToast.simple()
                                        .content(data.error_msg)
                                        .hideDelay(1000)
                                    );
                                }
                            })
                };
                $scope.choseAdd = function(){
                        //调用后台，暂缺数据
                    $scope.message = '正在保存修改...'
                    $scope.promise = $http
                            .post($config.api_uri + '/Apishop/Audit',{photo:$scope.photo,name:$scope.name,zhucehao:$scope.zhucehao,addr:$scope.addr,pic:$scope.pic,zuzhidaima:$scope.zuzhidaima,end_date:$scope.end_date})
                            .success(function (data) {
                                if(data.success){
                                    $mdToast.show(
                                    $mdToast.simple()
                                        .content("添加成功")
                                        .hideDelay(1000)
                                    );
                                    $scope.show=true;
                                }else{
                                    $mdToast.show(
                                    $mdToast.simple()
                                        .content(data.error_msg)
                                        .hideDelay(1000)
                                    );
                                }
                            })
                }

                $(document).ready(function () {
                    var img;
                    $('#fileToUpload').localResizeIMG({
                        width: 300,
                        height: 300,
                        quality: 1,
                        success: function (result) {
                            var a=$("#img_input").val(result.base64);
                            img =new Image;
                            img.src = result.base64;
                            ajaxupload(img.src,1);
                        }
                    });
                    $('#fileToUploads').localResizeIMG({
                        width: 300,
                        height: 300,
                        quality: 1,
                        success: function (result) {
                            var a=$("#img_input").val(result.base64);
                            img =new Image;
                            img.src = result.base64;
                            ajaxupload(img.src,2);
                        }
                    });
                });






    });

angular
    .module( 'ohapp' )
    .controller( 'HomesCtrl', function HomesCtrl( $scope, $injector, $rootScope, Shops, $timeout) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $state = $injector.get( '$state' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
        $scope.showlink=1;
        $scope.$emit('changeImg', 1); 
		$scope.currentPage = 0;
        $scope.scroll_switch = 1;
        $scope.shops = new Shops();
        $scope.shops.busy = true;
        $scope.shops.lat = '';
        $scope.shops.lng = '';
        $scope.isReady = false;
        $scope.$on('$viewContentLoaded', function() {
            //判断是否有缓存地址和经纬度
            if(sessionStorage.getItem('area_name')==null||sessionStorage.getItem('lat')==null||sessionStorage.getItem('lng')==null){

	            $timeout(function(){
		            wxConfig()
                },800);
            }else{
                $scope.area_name = sessionStorage.getItem('area_name');
                $scope.shops.area_code = sessionStorage.getItem('area_code');
                $scope.shops.lat = sessionStorage.getItem('lat');
                $scope.shops.lng = sessionStorage.getItem('lng');
                    //加载附近商铺
                    $scope.shops.items = [];
                    $scope.shops.end = false;
                    $scope.shops.busy = false;
                    $scope.shops.page = 1;
                    $scope.shops.nextPage();

                    //是否需要使用记录上次访问位置
                    // $("html,body").animate({"scrollTop": sessionStorage.getItem('scrollTop')}, 1000); 
                }
                
        });
        //获取经纬度所在地区
        $scope.getIndex = function(){
            $http({
                method: 'POST',
                url: $config.api_uri + '/Apipublic/Apilogin/use_QQmap',
                data: {lat:$scope.shops.lat,lng:$scope.shops.lng}
            }).success(function (data) {
                if (data.success) {
                    sessionStorage.setItem('citycodes',data.map.citycode);
                    $scope.area_name = data.map.name;
                    sessionStorage.setItem('area_name',data.map.name);
                    $scope.shops.area_code = data.map.code;
                    sessionStorage.setItem('area_code',data.map.code);
                    //加载附近商铺
                    $scope.shops.items = [];
                    $scope.shops.end = false;
                    $scope.shops.busy = false;
                    $scope.shops.page = 1;
                    $scope.shops.nextPage();
                } else {
                    $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                    );
                }

            })
        }

    $scope.choseTWO = function(type){
         $http.post($config.api_uri + '/Apipublic/ApiPmall/getshopscate')
                .success(function (data) {
                    if(data.success){
                       $scope.cate_list=data.cate_list;
                       angular.forEach(data.cate_list,function(item, index){
                            if(type=="秀币商城"){
                                $state.go('xiubiShop',{cate_id:item.cate_id,cate_name:item.cate_name,area_code:sessionStorage.getItem('area_code'),lat:sessionStorage.getItem('lat'),lng:sessionStorage.getItem('lng')})
                                return;
                            }else if(item.cate_name==type){
                                $state.go('restaurant',{cate_id:item.cate_id,cate_name:item.cate_name,citycode:sessionStorage.getItem('citycodes'),area_code:sessionStorage.getItem('area_code'),lat:sessionStorage.getItem('lat'),lng:sessionStorage.getItem('lng')})
                                return;
                            }
                        })
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
    }


    window.filterByEnter = function(e){
            if(e.keyCode==13){
                $scope.$apply(function(){
                    $state.go('soso',{shop_name:$scope.text,citycode:sessionStorage.getItem('citycodes'),area_code:sessionStorage.getItem('area_code'),lat:sessionStorage.getItem('lat'),lng:sessionStorage.getItem('lng')});
                })
            }
        };
    $scope.soso = function(){
        $state.go('soso',{shop_name:$scope.text,citycode:sessionStorage.getItem('citycodes'),area_code:sessionStorage.getItem('area_code'),lat:sessionStorage.getItem('lat'),lng:sessionStorage.getItem('lng')});
    }

    // $scope.$on('$viewContentLoaded', function() {
    //     window.wxConfig();
    // });
    function wxConfig(){
        $.getJSON($config.api_uri +'/Apipublic/Apilogin/get_wxconfig',function(data){
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.wxappId, // 必填，公众号的唯一标识
                timestamp: ""+data.wxtimestamp, // 必填，生成签名的时间戳
                nonceStr: ""+data.wxnonceStr, // 必填，生成签名的随机串
                signature: data.wxsignature,// 必填，签名，见附录1
                jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        });
        wx.ready(function() {
        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
                $scope.shops.lat = res.latitude;
                sessionStorage.setItem('lat',res.latitude);
                $scope.shops.lng = res.longitude;
                sessionStorage.setItem('lng',res.longitude);
                $scope.getIndex();
            },
            fail: function (res) {
                $mdToast.show(
                    $mdToast.simple()
                        .content("定位失败,请手动选择地区或重试")
                        .hideDelay(1000)
                    );
                $scope.citycodes=310100;
                sessionStorage.setItem('citycodes',$scope.citycodes);
                $scope.shops.lat = 31.2383718228;
                sessionStorage.setItem('lat',$scope.shops.lat);
                $scope.shops.lng = 121.3301816158;
                sessionStorage.setItem('lng',$scope.shops.lng);
                $scope.area_name='嘉定区';
                sessionStorage.setItem('area_name',$scope.area_name);
                $scope.shops.area_code = 310114;
                sessionStorage.setItem('area_code',310114);
                $scope.shops.items = [];
                $scope.shops.end = false;
                $scope.shops.busy = false;
                $scope.shops.page = 1;
                $scope.shops.nextPage();
          }
        });
        // wx.error(function(res){
        //     alert(JSON.stringify(res));
        // })
    });
    }

    $scope.choseShop = function(id,fd){
        location.href = 'http://llx.51loveshow.com/description?shop_id='+id+'&fd_id='+fd;
        // $state.go('description',{shop_id:id,fd_id:fd});
        // sessionStorage.setItem('scrollTop',$(document).scrollTop());
    }

    //广告位
    $http.post($config.api_uri + '/Apipublic/Apiajax/get_gg')
                .success(function (data) {
                    if(data.success){
                       $scope.gg=data.gg_list;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
         
});

angular
    .module( 'ohapp' )
    .controller( 'paysmentCtrl', function paysmentCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

          $scope.order_id=sessionStorage.getItem('order_id');
          $scope.need_pay=sessionStorage.getItem('need_pay');
          $scope.log_id=sessionStorage.getItem('log_id');
          $scope.type=sessionStorage.getItem('type');
          $scope.code=sessionStorage.getItem('code');
          $scope.kind=sessionStorage.getItem('kind');
          $scope.backs = function(){
            if($scope.kind==1){
                $state.go("main.Mycart",{type:"noIndent"});
            }else if($scope.kind==2){
                $state.go("main.OfferPay");
            }else if($scope.kind==3){
                $state.go("xiubiCart",{type:"noIndent"});
            }else{
              $state.go("main.personal");
            };
          }
            $scope.zhifu = function(){
              chosepay();
            }
        //获取构建参数信息
        function chosepay(){
                $http
                    .post('http://be.51loveshow.com/Apipublic/WxPay/aj_pay',{log_id:$scope.log_id,openid:$scope.code})
                    .success(function (data) {
                        if(data.success){
                            $scope.data=data.result.data;
                            zhifu();
                        }else{
                           $mdToast.show(
                            $mdToast.simple()
                                .content("请求失败")
                                .hideDelay(1000)
                            );
                        }
                    })
        }; 

        //执行支付操作
        function zhifu(){
            function onBridgeReady(){
               WeixinJSBridge.invoke(
                   'getBrandWCPayRequest', {
                        "appId":$scope.data.appId,     //公众号名称，由商户传入     
                        "timeStamp":$scope.data.timeStamp,         //时间戳，自1970年以来的秒数     
                        "nonceStr":$scope.data.nonceStr, //随机串     
                        "package":$scope.data.package,     
                        "signType":$scope.data.signType,         //微信签名方式：     
                        "paySign":$scope.data.paySign //微信签名 
                   },
                   function(res){ 
                       if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                            //完成支付，返回后台数据 
                            callback();
     
                       }
                       else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                          $mdToast.show(
                            $mdToast.simple()
                                .content("您已取消支付")
                                .hideDelay(1000)
                            );
                          if($scope.kind==1){
                            $state.go("main.Mycart",{type:"noIndent"});
                          }else if($scope.kind==2){
                            $state.go("main.OfferPay");
                          }else if($scope.kind==3){
                            $state.go("xiubiCart",{type:"noIndent"});
                          }else{
                            $state.go("main.personal");
                          };
                       }
                       else if(res.err_msg == "get_brand_wcpay_request:fail"){
                          $mdToast.show(
                            $mdToast.simple()
                                .content("支付失败")
                                .hideDelay(1000)
                            );
                          if($scope.kind==1){
                            $state.go("main.Mycart",{type:"noIndent"});
                          }else if($scope.kind==2){
                            $state.go("main.OfferPay");
                          }else if($scope.kind==3){
                            $state.go("xiubiCart",{type:"noIndent"});
                          }else{
                            $state.go("main.personal");
                          };
                       }
                   }
               ); 
            }
            if (typeof WeixinJSBridge == "undefined"){
               if( document.addEventListener ){
                   document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
               }else if (document.attachEvent){
                   document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                   document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
               }
            }else{
               onBridgeReady();
            } 
        }


        //返回函数
        function callback(){
            $http
                    .post($config.api_uri + '/Apipublic/WxPay/notify_tb',{log_id:$scope.log_id})
                    .success(function (data) {
                        if(data.success){
                            $mdToast.show(
                            $mdToast.simple()
                                .content("支付成功")
                                .hideDelay(1000)
                            );
                        }
                        if($scope.kind==1){
                            $state.go("main.Mycart",{type:"Indented"});
                          }else if($scope.kind==2){
                            $state.go("main.OfferPay");
                          }else if($scope.kind==3){
                            $state.go("xiubiCart",{type:"Indented"});
                          }else{
                            $state.go("main.personal");
                          }
                    })
        }


    });

angular
    .module( 'ohapp' )
    .controller( 'outlinePayCtrl', function outlinePayCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
            $scope.promise = $http
                .post($config.api_uri + '/Apishop/ApiSorder/pay',{id:$stateParams.pay_id})
                .success(function (data) {
                    if(data.success){
                        $scope.detail=data.detail;
                        $scope.zp_list=data.zp_list;
                        $scope.needPay=data.detail.total-data.detail.yhk;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })


        $scope.affirm = function(){
            $scope.promise = $http
                .post($config.api_uri + '/Apishop/ApiSorder/check_pay',{id:$stateParams.pay_id})
                .success(function (data) {
                    if(data.success){
                        $mdToast.show(
                        $mdToast.simple()
                            .content("支付成功")
                            .hideDelay(1000)
                        );
                        $state.go("payShop");
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

angular
    .module( 'ohapp' )
    .controller( 'onlinePayCtrl', function onlinePayCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;

        //获取账号余额信息
        $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Userinfo/mainpage')
                .success(function (data) {
                    if(data.success){
                        $scope.gold=data.gold/100;
                        dingdan();
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                });
        //用户输入金额
        $scope.notcut = function(){
            if($scope.needgold>=0||$scope.needgold==''){
                $scope.needgold=$scope.needgold.replace(/(\.\d{2})\d*$/,'\$1');
                $scope.needgold=$scope.needgold>$scope.gold?$scope.gold:$scope.needgold;
                $scope.needgold=$scope.needgold>$scope.needPay?$scope.needPay:$scope.needgold;
                $scope.totalNeedpay=$scope.needPay-$scope.needgold;
            }else{
                $scope.needgold='';
                $scope.totalNeedpay=$scope.needPay;
            }
            if($scope.needPay-$scope.needgold<0){
                $scope.totalNeedpay=0;
                $scope.needgold=$scope.needPay;
            }
        }

        function dingdan (){
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Pay/pay',{id:$stateParams.pay_id,gold:$scope.needgold})
                .success(function (data) {
                    if(data.success){
                        $scope.detail=data.detail;
                        $scope.zp_list=data.zp_list;
                        $scope.needPay=data.detail.total-data.detail.yhk;
                        $scope.needgold=data.detail.use_gold;
                        if($scope.needgold>0){
                            $scope.type=1;
                            $scope.needgold=data.detail.use_gold/100;
                            $scope.totalNeedpay=$scope.needPay-$scope.needgold;
                        }else{
                            $scope.type=0;
                            $scope.needgold=$scope.gold>$scope.needPay?$scope.needPay:$scope.gold;
                            $scope.totalNeedpay=$scope.needPay-$scope.needgold;
                        }
                        
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        }
        $scope.affirm = function(){
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/pay/check_pay',{id:$stateParams.pay_id,gold:$scope.needgold})
                .success(function (data) {
                    if(data.success){
                        if(data.flag==1){
                            $mdToast.show(
                            $mdToast.simple()
                                .content("支付完成")
                                .hideDelay(1000)
                            );
                            window.history.go(-1);
                        }else if(data.flag==2){
                            sessionStorage.setItem('order_id',data.logs.order_id);
                            sessionStorage.setItem('need_pay',data.logs.need_pay/100);
                            sessionStorage.setItem('log_id',data.logs.log_id);
                            sessionStorage.setItem('type',data.logs.type);
                            sessionStorage.setItem('kind',2);
                            $state.go('code');
                        }
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

angular
    .module( 'ohapp' )
    .controller( 'shopCashCtrl', function shopCashCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;

        if($stateParams.type=='drawal'){
            $scope.chose1=0;$scope.chose2=0;$scope.chose3=1;
        }else{
            $scope.chose1=1;$scope.chose2=0;$scope.chose3=0;
        }
        $scope.chose = function(id){
            switch (id) {
                case 1 :
                if($scope.chose1==1){
                    return;
                }
                $scope.chose1=1;$scope.chose2=0;$scope.chose3=0;
                break;
                case 2 :
                if($scope.chose2==1){
                    return;
                }
                $scope.chose1=0;$scope.chose2=1;$scope.chose3=0;
                break;
                case 3 :
                if($scope.chose3==1){
                    return;
                }
                $scope.chose1=0;$scope.chose2=0;$scope.chose3=1;
                break;
            }
        }

    });

angular
    .module( 'ohapp' )
    .controller( 'xiubiCtrl', function xiubiCtrl( $scope, $injector, $rootScope,xiubi) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
    
            $scope.scroll_switch = 1;
            $scope.xiubis = new xiubi();
            $scope.xiubis.bg_date=$("#beginTime").val();
            $scope.xiubis.end_date=$("#endTime").val();

            $scope.soso=function(){
                $scope.xiubis.bg_date=$("#beginTime").val();
                $scope.xiubis.end_date=$("#endTime").val();
                $scope.xiubis.items = [];
                $scope.xiubis.end = false;
                $scope.xiubis.busy = false;
                $scope.xiubis.page = 1;
                $scope.xiubis.nextPage();
            }















    });

angular
    .module( 'ohapp' )
    .controller( 'xiubiShopCtrl', function xiubiShopCtrl( $scope, $injector, $rootScope,xiubiShop,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

            $scope.cate_name=$stateParams.cate_name;
            //初始化加载页面
            $scope.scroll_switch = 1;
            $scope.xiubi = new xiubiShop();
            // $scope.xiubi.items = [];
            // $scope.xiubi.end = false;
            // $scope.xiubi.busy = false;
            // $scope.xiubi.page = 1;
            // $scope.xiubi.nextPage();
        







    });

angular
    .module( 'ohapp' )
    .controller( 'integralSubmitCtrl', function integralSubmitCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $config = $injector.get( '$config' );
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $session = $injector.get('$session');
        var $window = $injector.get('$window')
        var $location = $injector.get('$location');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast'); 

        //加载动画
        $scope.good_id=$stateParams.goods_id;
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
        $scope.pty=1;
        //获取账号余额信息
        $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Userinfo/mainpage')
                .success(function (data) {
                    if(data.success){
                        $scope.integral=data.integral;
                        // $scope.needIntegral=data.integral;
                        $scope.gold=data.gold/100;
                        dingdan();
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        //获取收货地址
        $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Adr/index')
                .success(function (data) {
                    if(data.success){
                        if($stateParams.addr_id!=null){
                            angular.forEach(data.addr,function(item, index){
                                if(item.addr_id==$stateParams.addr_id){
                                   $scope.adr=item;
                                   $scope.addr_id=item.addr_id;
                                }
                            })
                        }else{
                                angular.forEach(data.addr,function(item, index){
                                if(item.is_default==1){
                                    $scope.adr=item;
                                    $scope.addr_id=item.addr_id;
                                }
                            })
                        }
                        
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })      

        $scope.notcut = function(){
            if($scope.needgold>=0||$scope.needgold==''){
                $scope.needgold=$scope.needgold.replace(/(\.\d{2})\d*$/,'\$1');
                $scope.needgold=$scope.needgold>$scope.gold?$scope.gold:$scope.needgold;
                $scope.needgold=$scope.needgold>$scope.prices?$scope.prices:$scope.needgold;
                $scope.totalNeedpay=$scope.prices-$scope.needgold;
            }else{
                $scope.needgold='';
                $scope.totalNeedpay=$scope.prices;
            }
            if($scope.prices-$scope.needgold<0){
                $scope.totalNeedpay=0;
                $scope.needgold=$scope.prices;
            }
        }
        function dingdan (){
            $scope.promise = $http
                .post($config.api_uri + '/Apipublic/ApiPjf/goodsdetail',{goods_id:$stateParams.goods_id})
                .success(function (data) {
                    if(data.success){
                        $scope.msg = data.detail;
                        $scope.price = data.detail.mall_price;
                        if($scope.integral-$scope.price>=0){
                            $scope.needIntegral=$scope.price;
                            $scope.totalNeedpay=0;
                            return;
                        }else{
                            $scope.needIntegral=$scope.integral;
                            $scope.prices=($scope.price-$scope.needIntegral)/100;
                            $scope.needgold=data.detail.use_gold;
                            if($scope.needgold>0){
                                $scope.type=1;
                                $scope.needgold=data.detail.use_gold/100;
                                $scope.totalNeedpay=$scope.prices-$scope.needgold;
                            }else{
                                $scope.type=0;
                                $scope.needgold=$scope.gold>$scope.prices?$scope.prices:$scope.gold;
                                $scope.totalNeedpay=$scope.prices-$scope.needgold;
                            }
                        }
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        }
        

        $scope.subOrder=function(){
            $http
                .post($config.api_uri + '/Apiuser/Apijf/save_order',{goods_id:$stateParams.goods_id,gold:$scope.needgold,pty:$scope.pty,addr_id:$scope.addr_id,remark:$scope.remark})
                .success(function (data) {
                    if(data.success){
                        if(data.flag==1){
                            $mdToast.show(
                                $mdToast.simple()
                                .content("支付完成")
                                .hideDelay(1000)
                            );
                            $state.go("xiubiCart",{type:"Indented"});
                        }else if(data.flag==2){
                            sessionStorage.setItem('order_id',data.logs.order_id);
                            sessionStorage.setItem('need_pay',data.logs.need_pay/100);
                            sessionStorage.setItem('log_id',data.logs.log_id);
                            sessionStorage.setItem('type',data.logs.type);
                            sessionStorage.setItem('kind',3);
                            $state.go('code');
                        }
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

angular
    .module( 'ohapp' )
    .controller( 'pingjiaCtrl', function pingjiaCtrl( $scope, $injector, $rootScope,evaluatePr,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');   

        //加载动画
        // $scope.delay = 0;
        // $scope.minDuration = 0;
        // $scope.message = '正在加载...';
        // $scope.backdrop = true;
        // $scope.promise = null;
        
        // $scope.scroll_switch = 1;
        // $scope.evaluate = new evaluatePr();
        // $scope.evaluate.goods_id=$stateParams.goods_id;
        $scope.chose1=1;$scope.chose2=0;$scope.chose3=0;
        $scope.chose = function(id){
            switch (id) {
                case 1 :
                if($scope.chose1==1){
                    return;
                }
                $scope.chose1=1;$scope.chose2=0;$scope.chose3=0;
                break;
                case 2 :
                if($scope.chose2==1){
                    return;
                }
                $scope.chose1=0;$scope.chose2=1;$scope.chose3=0;
                break;
                case 3 :
                if($scope.chose3==1){
                    return;
                }
                $scope.chose1=0;$scope.chose2=0;$scope.chose3=1;
                break;
            }
        }

        $scope.promise = $http
                .post($config.api_uri + '/Apipublic/ApiPshop/goodsdianPing',{goods_id:$stateParams.goods_id,orderby:1})
                .success(function (data) {
                    if(data.success){
                       $scope.totalnum=data.totalnum;
                       $scope.totalnum_haspic=data.totalnum_haspic;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })












    });

angular
    .module( 'ohapp' )
    .controller( 'xiubiProductCtrl', function xiubiProductCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

            var currIndex = 0;
            $scope.myInterval = 4000;
            var slides = $scope.slides = [];
        $scope.good_id=$stateParams.goods_id;
        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
        
        $scope.promise = $http
				.post($config.api_uri + '/Apipublic/ApiPjf/goodsdetail',{goods_id:$stateParams.goods_id})
				.success(function (data) {
                    if(data.success){
                        $scope.is_vs = data.is_vs;
                        $scope.productMsg_list = data.detail;
                        $scope.slide=data.pics;
                        angular.forEach(
                            $scope.slide, function (item, index) {
                            slides.push({image:item.photo,id:currIndex++})}
                        )
                        $scope.productMsg=data;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
				})
        $scope.gopay = function(id){
            $http
                .post($config.api_uri + '/Apiuser/cart/cartadd',{goods_id:id})
                .success(function (data) {
                    if(data.success){
                       $state.go('integralSubmit')
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

angular
    .module( 'ohapp' )
    .controller( 'pingjiaAllCtrl', function pingjiaAllCtrl( $scope, $injector, $rootScope,evaluatePr,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');   
        
        $scope.scroll_switch = 1;
        $scope.evaluate = new evaluatePr();
        $scope.evaluate.goods_id=$stateParams.goods_id;
        $scope.evaluate.orderby=1;

        //点击图片放大
        $scope.checkImg = function(index,pic){
            var pics=[];
            for(var i=0;i<pic.length;i++){
                pics[i]='http://139.224.61.180:8080/attachs/'+pic[i];
            }
            wx.previewImage({
              current:pics[index],
              urls:pics,
            });
        }







    });

angular
    .module( 'ohapp' )
    .controller( 'pingjiaPhotoCtrl', function pingjiaPhotoCtrl( $scope, $injector, $rootScope,evaluatePr,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');   
        
        $scope.scroll_switch = 1;
        $scope.evaluate = new evaluatePr();
        $scope.evaluate.goods_id=$stateParams.goods_id;
        $scope.evaluate.orderby=3;
        //点击图片放大
        $scope.checkImg = function(index,pic){
            var pics=[];
            for(var i=0;i<pic.length;i++){
                pics[i]='http://139.224.61.180:8080/attachs/'+pic[i];
            }
            wx.previewImage({
              current:pics[index],
              urls:pics,
            });
        }










    });

angular
    .module( 'ohapp' )
    .controller( 'pingjiaNowCtrl', function pingjiaNowCtrl( $scope, $injector, $rootScope,evaluatePr,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');   
        
        $scope.scroll_switch = 1;
        $scope.evaluate = new evaluatePr();
        $scope.evaluate.goods_id=$stateParams.goods_id;
        $scope.evaluate.orderby=2;

        //点击图片放大
        $scope.checkImg = function(index,pic){
            var pics=[];
            for(var i=0;i<pic.length;i++){
                pics[i]='http://139.224.61.180:8080/attachs/'+pic[i];
            }
            wx.previewImage({
              current:pics[index],
              urls:pics,
            });
        }







    });

angular
    .module( 'ohapp' )
    .controller( 'xiubiCartCtrl', function xiubiCartCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
        var i=0;

        if($stateParams.type=='noIndent'){
            $scope.chose1=0;$scope.chose2=1;$scope.chose3=0;
        }else if($stateParams.type=='Indented'){
            $scope.chose1=0;$scope.chose2=0;$scope.chose3=1;
        }else{
            $scope.chose1=1;$scope.chose2=0;$scope.chose3=0;
        };

        $scope.chose = function(id){
            switch (id) {
                case 1 :
                $scope.chose1=1;$scope.chose2=0;$scope.chose3=0;
                break;
                case 2 :
                $scope.chose1=0;$scope.chose2=1;$scope.chose3=0;
                break;
                case 3 :
                $scope.chose1=0;$scope.chose2=0;$scope.chose3=1;
                break;
            }
        }
        



    });

angular
    .module( 'ohapp' )
    .controller( 'xiubiallIndentCtrl', function xiubiallIndentCtrl( $scope, $injector, $rootScope,xiubiCart,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');   
        
        $scope.scroll_switch = 1;
        $scope.xiubicart = new xiubiCart();
        $scope.xiubicart.status=0;
        // $scope.evaluate.goods_id=$stateParams.goods_id;
        // $scope.evaluate.orderby=1;
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在取消订单...';
        $scope.backdrop = true;
        $scope.promise = null;

        //删除订单
        $scope.quxiao = function(id){
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Apijf/order_delete',{order_id:id})
                .success(function (data) {
                    if(data.success){
                        angular.forEach($scope.xiubicart.items,function(item, index){
                                if(item.jforder_id==id){
                                    $scope.xiubicart.items.splice(index, 1);
                                    return;
                                }
                            });
                        $mdToast.show(
                        $mdToast.simple()
                            .content("订单取消成功")
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

        //确认收货
        $scope.shouhuo = function(id){
            $scope.message = '正在确认收货...';
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Apijf/order_sh',{order_id:id})
                .success(function (data) {
                    if(data.success){
                        angular.forEach($scope.xiubicart.items,function(item, index){
                                if(item.jforder_id==id){
                                    $scope.xiubicart.items[index].status=4;
                                    return;
                                }
                            });
                        $mdToast.show(
                        $mdToast.simple()
                            .content("收货成功")
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
        //立即支付
        $scope.paynow = function(id){
            $scope.message = '正在支付中...';
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Apijf/order_pay',{order_id:id})
                .success(function (data) {
                    if(data.success){
                        if(data.flag==1){
                           $mdToast.show(
                            $mdToast.simple()
                                .content("支付成功")
                                .hideDelay(1000)
                            ); 
                        }else if(data.flag==2){
                            sessionStorage.setItem('order_id',data.logs.order_id);
                            sessionStorage.setItem('need_pay',data.logs.need_pay/100);
                            sessionStorage.setItem('log_id',data.logs.log_id);
                            sessionStorage.setItem('type',data.logs.type);
                            sessionStorage.setItem('kind',3);
                            $state.go('code');
                        }
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        };



    });

angular
    .module( 'ohapp' )
    .controller( 'xiubinoIndentCtrl', function xiubinoIndentCtrl( $scope, $injector, $rootScope,xiubiCart,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');   
        
        $scope.scroll_switch = 1;
        $scope.xiubicart = new xiubiCart();
        $scope.xiubicart.status=1;
        // $scope.evaluate.goods_id=$stateParams.goods_id;
        // $scope.evaluate.orderby=1;

        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在取消订单...';
        $scope.backdrop = true;
        $scope.promise = null;

        //删除订单
        $scope.quxiao = function(id){
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Apijf/order_delete',{order_id:id})
                .success(function (data) {
                    if(data.success){
                        angular.forEach($scope.xiubicart.items,function(item, index){
                                if(item.jforder_id==id){
                                    $scope.xiubicart.items.splice(index, 1);
                                    return;
                                }
                            });
                        $mdToast.show(
                        $mdToast.simple()
                            .content("订单取消成功")
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

        //立即支付
        $scope.paynow = function(id){
            $scope.message = '正在支付中...';
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Apijf/order_pay',{order_id:id})
                .success(function (data) {
                    if(data.success){
                        if(data.flag==1){
                           $mdToast.show(
                            $mdToast.simple()
                                .content("支付成功")
                                .hideDelay(1000)
                            ); 
                        }else if(data.flag==2){
                            sessionStorage.setItem('order_id',data.logs.order_id);
                            sessionStorage.setItem('need_pay',data.logs.need_pay/100);
                            sessionStorage.setItem('log_id',data.logs.log_id);
                            sessionStorage.setItem('type',data.logs.type);
                            sessionStorage.setItem('kind',3);
                            $state.go('code');
                        }
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        };







    });

angular
    .module( 'ohapp' )
    .controller( 'xiubiIndentedCtrl', function xiubiIndentedCtrl( $scope, $injector, $rootScope,xiubiCart,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');   
        
        $scope.scroll_switch = 1;
        $scope.xiubicart = new xiubiCart();
        $scope.xiubicart.status=-1;
        // $scope.evaluate.goods_id=$stateParams.goods_id;
        // $scope.evaluate.orderby=1;
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在确认收货...';
        $scope.backdrop = true;
        $scope.promise = null;

        //确认收货
        $scope.shouhuo = function(id){
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Apijf/order_sh',{order_id:id})
                .success(function (data) {
                    if(data.success){
                        angular.forEach($scope.xiubicart.items,function(item, index){
                                if(item.jforder_id==id){
                                    $scope.xiubicart.items[index].status=4;
                                    return;
                                }
                            });
                        $mdToast.show(
                        $mdToast.simple()
                            .content("收货成功")
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

angular
    .module( 'ohapp' )
    .controller( 'courierMsgCtrl', function courierMsgCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
    
// 注释信息
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
        $scope.order_id=$stateParams.order_id;
        $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Apijf/order_detail',{order_id:$stateParams.order_id})
                .success(function (data) {
                    if(data.success){
                        $scope.express_name=data.order_detail.express_name;
                        $scope.express=data.order_detail.express;
                        $scope.kd_num=data.order_detail.kd_num;
                        $scope.goods_list=data.goods_list[0];
                        $scope.express_mobile=data.express_mobile;
                        wuliu();
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })

            function wuliu(){
                $scope.promise = $http
                .post($config.api_uri + '/Apipublic/Apilogin/get_express_info',{express:$scope.express,kd_num:$scope.kd_num})
                .success(function (data) {
                    if(data.success){
                        $scope.data=data.data;
                        $scope.state = data.state;
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

angular
    .module( 'ohapp' )
    .controller( 'jforderMsgCtrl', function jforderMsgCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
    
// 注释信息
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
        $scope.order_id=$stateParams.order_id;
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Apijf/order_detail',{order_id:$stateParams.order_id})
                .success(function (data) {
                    if(data.success){
                        $scope.msg = data.order_detail;
                        $scope.goods_list = data.goods_list;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })

            //删除订单
        $scope.quxiao = function(id){
            $scope.message = '正在取消订单...';
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Apijf/order_delete',{order_id:id})
                .success(function (data) {
                    if(data.success){
                        angular.forEach($scope.xiubicart.items,function(item, index){
                                if(item.jforder_id==id){
                                    $scope.xiubicart.items.splice(index, 1);
                                    return;
                                }
                            });
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        }

        //确认收货
        $scope.shouhuo = function(id){
            $scope.message = '正在确认收货...';
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Apijf/order_sh',{order_id:id})
                .success(function (data) {
                    if(data.success){
                        angular.forEach($scope.xiubicart.items,function(item, index){
                                if(item.jforder_id==id){
                                    $scope.xiubicart.items[index].status=4;
                                    return;
                                }
                            });
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        }
        //立即支付
        $scope.paynow = function(id){
            $scope.message = '正在支付中...';
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Apijf/order_pay',{order_id:id})
                .success(function (data) {
                    if(data.success){
                        if(data.flag==1){
                           $mdToast.show(
                            $mdToast.simple()
                                .content("支付成功")
                                .hideDelay(1000)
                            ); 
                        }else if(data.flag==2){
                            sessionStorage.setItem('order_id',data.logs.order_id);
                            sessionStorage.setItem('need_pay',data.logs.need_pay/100);
                            sessionStorage.setItem('log_id',data.logs.log_id);
                            sessionStorage.setItem('type',data.logs.type);
                            sessionStorage.setItem('kind',3);
                            $state.go('code');
                        }
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        };















    });

angular
    .module( 'ohapp' )
    .controller( 'allIndentCtrl', function allIndentCtrl( $scope, $injector, $rootScope,CartIndent,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');   
        
        $scope.scroll_switch = 1;
        $scope.cartIndent = new CartIndent();
        // $scope.cartIndent.aready = 1;
        
        $scope.delect = function(id){
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Orderinfo/order_del',{order_id:id})
                .success(function (data) {
                    if(data.success){
                        angular.forEach($scope.cartIndent.items,function(item, index){
                            if(item.orders.order_id==id){
                                $scope.cartIndent.items.splice(index,1);
                                return;
                            }
                        })
                        $mdToast.show(
                        $mdToast.simple()
                            .content("订单取消成功")
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

angular
    .module( 'ohapp' )
    .controller( 'noIndentCtrl', function noIndentCtrl( $scope, $injector, $rootScope,CartIndent,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');   
        
        $scope.scroll_switch = 1;
        $scope.cartIndent = new CartIndent();
        $scope.cartIndent.aready=1;

        $scope.delect = function(id){
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Orderinfo/order_del',{order_id:id})
                .success(function (data) {
                    if(data.success){
                        angular.forEach($scope.cartIndent.items,function(item, index){
                            if(item.orders.order_id==id){
                                $scope.cartIndent.items.splice(index,1);
                                return;
                            }
                        })
                        $mdToast.show(
                        $mdToast.simple()
                            .content("订单取消成功")
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

angular
    .module( 'ohapp' )
    .controller( 'IndentedCtrl', function IndentedCtrl( $scope, $injector, $rootScope,CartIndent,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');   
        
        $scope.scroll_switch = 1;
        $scope.cartIndent = new CartIndent();
        $scope.cartIndent.aready=4;
        // $scope.evaluate.goods_id=$stateParams.goods_id;
        // $scope.evaluate.orderby=1;

        



    });

angular
    .module( 'ohapp' )
    .controller( 'shopdescAllCtrl', function shopdescAllCtrl( $scope, $injector, $rootScope,Evaluate,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');   
        
        $scope.scroll_switch = 1;
        $scope.evaluate = new Evaluate();
        $scope.evaluate.shop_id=$stateParams.shop_id;

        //点击图片放大
        $scope.checkImg = function(index,pic){
            var pics=[];
            for(var i=0;i<pic.length;i++){
                pics[i]='http://139.224.61.180:8080/attachs/'+pic[i];
            }
            wx.previewImage({
              current:pics[index],
              urls:pics,
            });
        }







    });

angular
    .module( 'ohapp' )
    .controller( 'xitongMsgCtrl', function xitongMsgCtrl( $scope, $injector, $rootScope,system) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
            $scope.scroll_switch = 1;
            $scope.messages = new system();














    });

angular
    .module( 'ohapp' )
    .controller( 'huiyuanMsgCtrl', function huiyuanMsgCtrl( $scope, $injector, $rootScope,mumber) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

            $scope.scroll_switch = 1;
            $scope.messagem = new mumber();















    });

angular
    .module( 'ohapp' )
    .controller( 'moneyCtrl', function moneyCtrl( $scope, $injector, $rootScope,$stateParams,money) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
    

            $scope.scroll_switch = 1;
            $scope.moneys = new money();
            $scope.moneys.bg_date=$("#beginTime").val();
            $scope.moneys.end_date=$("#endTime").val();

            $scope.soso=function(){
                $scope.moneys.bg_date=$("#beginTime").val();
                $scope.moneys.end_date=$("#endTime").val();
                $scope.moneys.items = [];
                $scope.moneys.end = false;
                $scope.moneys.busy = false;
                $scope.moneys.page = 1;
                $scope.moneys.nextPage();
            }
















    });

angular
    .module( 'ohapp' )
    .controller( 'journalCtrl', function journalCtrl( $scope, $injector, $rootScope,$stateParams,journals) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
    
            $scope.scroll_switch = 1;
            $scope.journals = new journals();
















    });

angular
    .module( 'ohapp' )
    .controller( 'shopMoneyCtrl', function shopMoneyCtrl( $scope, $injector, $rootScope,$stateParams,shopMoney) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

            $scope.scroll_switch = 1;
            $scope.moneys = new shopMoney();
            $scope.moneys.bg_date=$("#beginTime").val();
            $scope.moneys.end_date=$("#endTime").val();

            $scope.soso=function(){
                $scope.moneys.bg_date=$("#beginTime").val();
                $scope.moneys.end_date=$("#endTime").val();
                $scope.moneys.items = [];
                $scope.moneys.end = false;
                $scope.moneys.busy = false;
                $scope.moneys.page = 1;
                $scope.moneys.nextPage();
            }
















    });

angular
    .module( 'ohapp' )
    .controller( 'shopJournalCtrl', function shopJournalCtrl( $scope, $injector, $rootScope,$stateParams,journalShop) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        $scope.scroll_switch = 1;
        $scope.journals = new journalShop(); 















    });

angular
    .module( 'ohapp' )
    .controller( 'preCodeCtrl', function preCodeCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config2' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
        if(!GetRequest().code){
                var redirect_url = 'http://llx.51loveshow.com/preCode?shop_id='+$stateParams.shop_id+"&image_url="+$stateParams.image_url;
                location.href =  "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0d70247bb52ac37e&redirect_uri="+encodeURIComponent(redirect_url)+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
            }else{
                $http({
                    method: 'POST',
                    url: 'http://be.51loveshow.com/Apipublic/WxPay/get_openidbycode',
                    data:{code:GetRequest().code}
                }).success(function (data) {
                    location.href = 'http://llx.51loveshow.com/description?shop_id='+$stateParams.shop_id+'&openid='+data.openid+'&type=1'+'&image_url='+$stateParams.image_url;
                    // $state.go("description",{shop_id:$stateParams.shop_id,openid:data.openid,type:1,image_url:$stateParams.image_url});
                })
        }


        function GetRequest() {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }















    });

angular
    .module( 'ohapp' )
    .controller( 'loginCodeCtrl', function loginCodeCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config2' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
        if(!GetRequest().code){
                var redirect_url = 'http://llx.51loveshow.com/loginCode';
                location.href =  "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0d70247bb52ac37e&redirect_uri="+encodeURIComponent(redirect_url)+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
            }else{
                $http({
                    method: 'POST',
                    url: 'http://be.51loveshow.com/Apipublic/WxPay/get_openidbycode',
                    data:{code:GetRequest().code}
                }).success(function (data) {
                    $state.go("main.personal");
                })
        }
        function GetRequest() {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }















    });

angular
    .module( 'ohapp' )
    .controller( 'sosoCtrl', function sosoCtrl( $scope, $injector, $rootScope,Shops,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
             //加载动画
            $scope.delay = 0;
            $scope.minDuration = 0;
            $scope.message = '正在加载...';
            $scope.backdrop = true;
            $scope.promise = null;

            $scope.Area=$stateParams.area_code;
            $scope.trues=false;
            $scope.text=$stateParams.shop_name;
            // $scope.cate_name=$stateParams.cate_name;
            // $scope.cate_id=$stateParams.cate_id;
            //获取筛选分类
            $scope.promise = $http
                .post($config.api_uri + '/Apipublic/ApiPmall/getshopscate')
                .success(function (data) {
                    if(data.success){
                        $scope.cate_list=data.cate_list;
                    }else{
                       $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
            //获取区域分类
            $scope.promise = $http
                .post($config.api_uri + '/Apipublic/ApiPmall/get_narea',{city_code:$stateParams.citycode})
                .success(function (data) {
                    if(data.success){
                        $scope.area_list=data.area_list;
                    }else{
                       $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })


            //初始化加载页面
            $scope.scroll_switch = 1;
            $scope.shops = new Shops();
            $scope.shops.cate_id=$stateParams.cate_id;
            $scope.shops.shop_name=$stateParams.shop_name;
            $scope.shops.order=$scope.order;
            $scope.shops.lat=$stateParams.lat;
            $scope.shops.lng=$stateParams.lng;
            $scope.shops.area_code=$stateParams.area_code;
            $scope.shops.items = [];
            $scope.shops.end = false;
            $scope.shops.busy = false;
            $scope.shops.page = 1;
            $scope.shops.nextPage();
            //控制筛选
        $scope.jiazai = function(){
            $scope.shops.order=$scope.order;
            $scope.shops.items = [];
            $scope.shops.end = false;
            $scope.shops.busy = false;
            $scope.shops.page = 1;
            $scope.shops.nextPage();
        }
        
        $scope.step==0;
        $scope.choseStep = function(step){
            switch (step) {
                case 1 :
                    $scope.step==1?$scope.step=0:$scope.step=1;
                    break;
                case 2 :
                    $scope.step==2?$scope.step=0:$scope.step=2;
                    break;
                case 3 :
                    $scope.step==3?$scope.step=0:$scope.step=3;
                    break;
            }
        }
        $scope.step2=11;
        $scope.chosech="智能排序";
        $scope.choseStep2 = function(steps){
            switch (steps) {
                case 11 :
                    $scope.step2=11;$scope.step=0;
                    $scope.chosech="智能排序";
                    $scope.order='';
                    $scope.jiazai();
                    break;
                case 12 :
                    $scope.step2=12;$scope.step=0;
                    $scope.chosech="离我最近";
                    $scope.order=1;
                    $scope.jiazai();
                    break;
                case 13 :
                    $scope.step2=13;$scope.step=0;
                    $scope.chosech="人气最高";
                    $scope.order=2;
                    $scope.jiazai();
                    break;
                case 14 :
                    $scope.step2=14;$scope.step=0;
                    $scope.chosech="好评优先";
                    $scope.order=3;
                    $scope.jiazai();
                    break;
            }
        }

        //筛选
        $scope.choseCate = function(id){
            $scope.trues=id;
            $scope.shops.cate_id=id;
            $scope.shops.items = [];
            $scope.shops.end = false;
            $scope.shops.busy = false;
            $scope.shops.page = 1;
            $scope.shops.nextPage();
            $scope.step=0;
        }

        //区域
        $scope.choseArea = function(id){
            $scope.Area=id;
            $scope.trues='';
            $scope.shops.area_code=id;
            //还原筛选
            $scope.shops.cate_id=$stateParams.cate_id;
            $scope.shops.items = [];
            $scope.shops.end = false;
            $scope.shops.busy = false;
            $scope.shops.page = 1;
            $scope.shops.nextPage();
            $scope.step=0;
        }

        //搜索
    window.filterByEnter = function(e){
            if(e.keyCode==13){
                $scope.$apply(function(){
                    $scope.shops.shop_name=$scope.text;
                    $scope.shops.items = [];
                    $scope.shops.end = false;
                    $scope.shops.busy = false;
                    $scope.shops.page = 1;
                    $scope.shops.nextPage();
                })
            }
        };
    $scope.soso = function(){
        $scope.shops.items = [];
        $scope.shops.end = false;
        $scope.shops.busy = false;
        $scope.shops.page = 1;
        $scope.shops.nextPage();
    }
    //跳转店铺
    $scope.choseShop = function(id,fd){
        location.href = 'http://llx.51loveshow.com/description?shop_id='+id+'&fd_id='+fd;
        // $state.go('description',{shop_id:id,fd_id:fd});
        // sessionStorage.setItem('scrollTop',$(document).scrollTop());
    }









    });

angular
    .module( 'ohapp' )
    .controller( 'shopdescCtrl', function shopdescCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');   

        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;

            $scope.promise = $http
                .post($config.api_uri + '/Apipublic/ApiPshop/shopDianPing',{shop_id:$stateParams.shop_id})
                .success(function (data) {
                    if(data.success){
                        $scope.items=data.list;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })

        //点击图片放大
        $scope.checkImg = function(index,pic){
            var pics=[];
            for(var i=0;i<pic.length;i++){
                pics[i]='http://139.224.61.180:8080/attachs/'+pic[i];
            }
            wx.previewImage({
              current:pics[index],
              urls:pics,
            });
        }







    });

angular
    .module( 'ohapp' )
    .controller( 'myLikeCtrl', function myLikeCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

         $scope.chose1=1;$scope.chose2=0;
            $scope.chose = function(id){
                switch (id) {
                    case 1 :
                    if($scope.chose1==1){
                        return;
                    }
                    $scope.chose1=1;$scope.chose2=0;
                    break;
                    case 2 :
                    if($scope.chose2==1){
                        return;
                    }
                    $scope.chose1=0;$scope.chose2=1;
                    break;
                }
            }
















    });

angular
    .module( 'ohapp' )
    .controller( 'likeShopCtrl', function likeShopCtrl( $scope, $injector, $rootScope,loveShop) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        $scope.scroll_switch = 1;
        $scope.loveshop = new loveShop();
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在删除...';
        $scope.backdrop = true;
        $scope.promise = null;

        $scope.delect = function(id){
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Sc/del_sc_fd',{scf_id:id})
                .success(function (data) {
                    if(data.success){
                        angular.forEach($scope.loveshop.items,function(item, index){
                                if(item.scf_id==id){
                                    $scope.loveshop.items.splice(index, 1);
                                    return;
                                }
                            });
                        $mdToast.show(
                        $mdToast.simple()
                            .content("删除成功")
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
        };
        
        $scope.choseShop = function(fd,sp){
            location.href = 'http://llx.51loveshow.com/description?shop_id='+sp+'&fd_id='+fd;
        }














    });

angular
    .module( 'ohapp' )
    .controller( 'likeProCtrl', function likeProCtrl( $scope, $injector, $rootScope,lovePro) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        $scope.scroll_switch = 1;
        $scope.lovepro = new lovePro();

        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在删除...';
        $scope.backdrop = true;
        $scope.promise = null;

        $scope.delect = function(id){
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Sc/del_sc_good',{scg_id:id})
                .success(function (data) {
                    if(data.success){
                        angular.forEach($scope.lovepro.items,function(item, index){
                                if(item.scg_id==id){
                                    $scope.lovepro.items.splice(index, 1);
                                    return;
                                }
                            });
                        $mdToast.show(
                        $mdToast.simple()
                            .content("删除成功")
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
        };
















    });

angular
    .module( 'ohapp' )
    .controller( 'drawalCtrl', function drawalCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;

            $scope.phone=$session.get('phone');
            //获取相关提现信息
           $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Money/cash')
                .success(function (data) {
                    if(data.success){
                        $scope.dan=data;
                        $scope.info=data.info;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
            
            $scope.tixian = function(){
                if($scope.dan.gold/100>=$scope.dan.cash_money){
                    $scope.money=$scope.dan.gold/100;
                }else{
                    $mdToast.show(
                        $mdToast.simple()
                            .content("您的余额太少了")
                            .hideDelay(1000)
                        );
                }
            }


            $scope.getCard = function(){
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Money/sendsms',{mobile:$scope.phone})
                .success(function (data) {
                    if(data.success){
                        $scope.yzm=data.yzm;
                        $mdToast.show(
                        $mdToast.simple()
                            .content("验证码已发送成功")
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
        // 验证输入金额
            $scope.yanzheng = function(){
                if($scope.money>=0||$scope.money==''){
                    $scope.money = $scope.money.replace(/(\.\d{2})\d*$/,'\$1');
                    $scope.money = $scope.money>$scope.dan.gold/100?$scope.dan.gold/100:$scope.money;
                }else{
                    $scope.money='';
                }
            }
            $scope.drawalMoney = function(){
                if($("#yzm").val()!=$scope.yzm){
                        $mdToast.show(
                            $mdToast.simple()
                                .content("验证码错误")
                                .hideDelay(1000)
                            );
                    return;
                }
           $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Money/cash',{gold:$scope.money,bank_name:$scope.info.bank_name,bank_num:$scope.info.bank_num,bank_branch:$scope.branch,bank_realname:$scope.info.bank_realname,mobile:$scope.phone})
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

    });

angular
    .module( 'ohapp' )
    .controller( 'shopDrawalCtrl', function shopDrawalCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;

            $scope.phone=$session.get('phone');
            //获取相关提现信息
            
           $scope.promise = $http
                .post($config.api_uri + '/Apishop/Money/cash')
                .success(function (data) {
                    if(data.success){
                        $scope.dan=data;
                        $scope.info=data.info;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
            // 验证输入金额
            $scope.yanzheng = function(){
                if($scope.money>=0||$scope.money==''){
                    $scope.money = $scope.money.replace(/(\.\d{2})\d*$/,'\$1');
                    $scope.money = $scope.money>$scope.dan.gold/100?$scope.dan.gold/100:$scope.money;
                }else{
                    $scope.money='';
                }
            }

            $scope.tixian = function(){
                if($scope.dan.gold/100>=$scope.dan.cash_money){
                    $scope.money=$scope.dan.gold/100;
                }else{
                    $mdToast.show(
                        $mdToast.simple()
                            .content("您的余额太少了")
                            .hideDelay(1000)
                        );
                }
            }

            $scope.getCard = function(){
            $scope.promise = $http
                .post($config.api_uri + '/Apishop/Money/sendsms',{mobile:$scope.phone})
                .success(function (data) {
                    if(data.success){
                        $scope.yzm=data.yzm;
                        $mdToast.show(
                        $mdToast.simple()
                            .content("验证码已发送成功")
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


        $scope.drawalMoney = function(){
            if($("#yzm").val()!=$scope.yzm){
                $mdToast.show(
                        $mdToast.simple()
                            .content("验证码错误")
                            .hideDelay(1000)
                        );
                return;
            }
           $scope.promise = $http
                .post($config.api_uri + '/Apishop/Money/cash',{gold:$scope.money,bank_name:$scope.info.bank_name,bank_num:$scope.info.bank_num,bank_branch:$scope.branch,bank_realname:$scope.info.bank_realname,mobile:$scope.phone})
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
    });
