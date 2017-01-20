angular
    .module( 'ohapp' )
    .controller( 'navigationsCtrl', function navigationsCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $config = $injector.get( '$config' );
        var $timeout = $injector.get( '$timeout' );
        var $session = $injector.get('$session');
        var $window = $injector.get('$window')
        var $location = $injector.get('$location');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast'); 
        
    $scope.$on('$viewContentLoaded', function() {
        wxConfig();
    });
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
        });
    }
    wx.ready(function() {
        wx.openLocation({
          latitude: $stateParams.lat,
          longitude: $stateParams.lng,
          name: $stateParams.name,
          address: $stateParams.addr,
          scale: 14,
          infoUrl: 'http://llx.51loveshow.com/home',
            success: function(res) { 
            },  
            fail: function(res) { 
                location.replace(location.href);
            } 
        });
    });



















    });
