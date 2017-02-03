angular
    .module( 'ohapp' )
    .controller( 'HomesCtrl', function HomesCtrl( $scope, $injector, $rootScope, Shops) {
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
        $scope.$emit('changeImg', 1); 
		$scope.currentPage = 0;
        $scope.scroll_switch = 1;
        $scope.shops = new Shops();
        $scope.shops.busy = true;
        $scope.shops.lat = '';
        $scope.shops.lng = '';
        $scope.isReady = false;
        $scope.$on('$viewContentLoaded', function() {
            wxConfig();
            // if(JSON.stringify($session.get('area_name'))=='{}'){wxConfig();}else{
            //     $scope.area_name = $session.get('area_name');
            //     $scope.shops.area_code = $session.get('area_code');
            //         //加载附近商铺
            //         $scope.shops.items = [];
            //         $scope.shops.end = false;
            //         $scope.shops.busy = false;
            //         $scope.shops.page = 1;
            //         $scope.shops.nextPage();
                    
            // }
        });
        //获取经纬度所在地区
        $scope.getIndex = function(){
            $http({
                method: 'POST',
                url: $config.api_uri + '/Apipublic/Apilogin/use_QQmap',
                data: {lat:$scope.shops.lat,lng:$scope.shops.lng}
            }).success(function (data) {
                if (data.success) {
                    $scope.area_name = data.map.name;
                    $scope.shops.area_code = data.map.citycode;
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




		$scope.choseAdd = function(){
        $scope.add=1;
        $http
                .post($config.api_uri + '/Apipublic/ApiPmall/get_nprovince')
                .success(function (data) {
                    if(data.success){
                        $scope.add_p = data.province_list;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })

        $scope.province_code = function(privence,ap){
            $http.post($config.api_uri + '/Apipublic/ApiPmall/get_ncity',{province_code:privence})
                .success(function (data) {
                    if(data.success){
                        $scope.p=ap;
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
            $http.post($config.api_uri + '/Apipublic/ApiPmall/get_narea',{city_code:city})
                .success(function (data) {
                    console.log(data);
                    if(data.success){
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
            $scope.add=0;
            $scope.shops.area_code = near;
            $scope.area_name = an;
            // $session.set('area_code',near);
            // $session.set('area_name',an);
            // $session.save();
            sessionStorage.setItem('area_code',near);
            sessionStorage.setItem('area_name',an);
            $scope.shops.items = [];
            $scope.shops.end = false;
            $scope.shops.busy = false;
            $scope.shops.page = 1;
            $scope.shops.nextPage();
        }
    }


    $scope.choseTWO = function(type){
         $http.post($config.api_uri + '/Apipublic/ApiPmall/getshopscate')
                .success(function (data) {
                    if(data.success){
                       $scope.cate_list=data.cate_list;
                       angular.forEach(data.cate_list,function(item, index){
                            if(item.cate_name==type){
                                $state.go('restaurant',{cate_id:item.cate_id,cate_name:item.cate_name})
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
                    $scope.shops.shop_name = $scope.text;
                    $scope.shops.area_code = '';
                    $scope.shops.items = [];
                    $scope.shops.end = false;
                    $scope.shops.busy = false;
                    $scope.shops.page = 1;
                    $scope.shops.nextPage();
                })
            }
        };
    $scope.soso = function(){
        $scope.shops.shop_name = $scope.text;
        $scope.shops.area_code = '';
        $scope.area_name = '请选择';
        $scope.shops.items = [];
        $scope.shops.end = false;
        $scope.shops.busy = false;
        $scope.shops.page = 1;
        $scope.shops.nextPage();
    }

    function wxConfig(){
        $.getJSON($config.api_uri +'/Apipublic/Apilogin/get_wxconfig',function(data){
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.wxappId, // 必填，公众号的唯一标识
                timestamp: data.wxtimestamp, // 必填，生成签名的时间戳
                nonceStr: data.wxnonceStr, // 必填，生成签名的随机串
                signature: data.wxsignature,// 必填，签名，见附录1
                jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        });
    }
    wx.ready(function() {
        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
                $scope.shops.lat = res.latitude;
                $scope.shops.lng = res.longitude;
                // $scope.getIndex();
                if(JSON.stringify(sessionStorage.getItem('area_name'))=='{}'){$scope.getIndex();}else{

                $scope.area_name = sessionStorage.getItem('area_name');
                $scope.shops.area_code = sessionStorage.getItem('area_code');
                    //加载附近商铺
                    $scope.shops.items = [];
                    $scope.shops.end = false;
                    $scope.shops.busy = false;
                    $scope.shops.page = 1;
                    $scope.shops.nextPage();
                    if (JSON.stringify(sessionStorage.getItem('juli'))!='{}'){
                        $(document).scrollTop(sessionStorage.getItem('juli'));
                    }console.log($(document).scrollTop());
                }
            },
            fail: function (res) {
                $mdToast.show(
                    $mdToast.simple()
                        .content("定位失败,请重试或手动选择地区")
                        .hideDelay(2000)
                    );
          }
        });
    });


    $scope.choseShop = function(id){
        sessionStorage.setItem("juli",$(document).scrollTop())
        $state.go('description',{shop_id:id});
    }

});
