angular
    .module( 'ohapp' )
    .controller( 'restaurantsCtrl', function restaurantsCtrl( $scope, $injector, $rootScope,Shops,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config2' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

            $scope.cate_id=$stateParams.cate_id;
            $scope.cate_name=$stateParams.cate_name;
            $scope.$on('$viewContentLoaded', function() {
                wxConfig();
            });
            //初始化加载页面
            $scope.scroll_switch = 1;
            $scope.shops = new Shops();
            //控制筛选
        $scope.jiazai = function(){
            $scope.shops.cate_id=$scope.cate_id;
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
            $scope.shops.cate_name=$stateParams.cate_name;
            $scope.shops.cate_id=$stateParams.cate_id;
            $scope.order='';
            $scope.shops.items = [];
            $scope.shops.end = false;
            $scope.shops.busy = false;
            $scope.shops.page = 1;
            $scope.shops.nextPage();
            $scope.shops.cate_id=$scope.cate_id;
            $scope.shops.order=$scope.order;
        },
        fail: function (res) {
            $mdToast.show(
                $mdToast.simple()
                    .content("定位失败")
                    .hideDelay(1000)
                );
        }
    });
    });












    });
