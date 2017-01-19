angular
    .module( 'ohapp' )
    .controller( 'HomesCtrl', function HomesCtrl( $scope, $injector, $rootScope, Shops) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

		$scope.currentPage = 0;
        $scope.scroll_switch = 1;
        $scope.shops = new Shops();
        $scope.shops.busy = true;
        $scope.shops.lat = '';
        $scope.shops.lng = '';
        $scope.isReady = false;

        $scope.$on('$viewContentLoaded', function() {
            wxConfig();
        });
        //获取经纬度所在地区
        $scope.getIndex = function(){
            $http({
                method: 'POST',
                url: $config.api_uri + '/Apipublic/Apilogin/use_QQmap',
                data: {lat:$scope.shops.lat,lng:$scope.shops.lng}
            }).success(function (data) {
                console.log(data);
                if (data.success) {
                    $scope.area_name = data.map.district;
                    $scope.shops.area_code = data.map.adcode;
                    $session.set('near_code', data.map.adcode);
                    $session.set('near_name', data.map.district);
                    $session.save();
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
            $session.set('near_code', near);
            $session.set('near_name', an);
            $session.save();
            $scope.shops.area_code = near;
            $scope.area_name = an;
            $scope.shops.items = [];
            $scope.shops.end = false;
            $scope.shops.busy = false;
            $scope.shops.page = 1;
            $scope.shops.nextPage();
        }
    }
            $scope.shops.area_code = $session.get("near_code");
            $scope.area_name = $session.get('near_name');
           if(JSON.stringify($session.get('near_name')) != "{}"){$scope.n= $session.get('near_name');}  
            $scope.shops.items = [];
            $scope.shops.end = false;
            $scope.shops.busy = false;
            $scope.shops.page = 1;
            $scope.shops.nextPage();



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
            $scope.getIndex();
        }
    });
})







    });
