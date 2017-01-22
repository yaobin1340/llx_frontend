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

        $scope.order_id=$session.get('order_id');
        $scope.need_pay=$session.get('need_pay');
        $scope.log_id=$session.get('log_id');
        
        $scope.zhifu = function(){
            chosepay()
        }
            // 测试区域
        function chosepay(){
                $http
                    .post('http://be.51loveshow.com/Apipublic/WxPay/aj_pay',{log_id:$scope.log_id,openid:$session.get('code')})
                    .success(function (data) {
                        if(data.success){
                            $scope.data=data.result.data;
                            console.log($scope.data);
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
                    alert(res.err_msg);
                       if(res.err_msg == "get_brand_wcpay_request：ok" ) {
                            //完成支付，返回后台数据
     
                       }
                       alert(res.err_msg);     
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

          // wxConfig();
        }



        // function wxConfig(){
        //     $.getJSON($config.api_uri +'/Apipublic/Apilogin/get_wxconfig',function(data){
        //         wx.config({
        //             debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //             appId: data.wxappId, // 必填，公众号的唯一标识
        //             timestamp: data.wxtimestamp, // 必填，生成签名的时间戳
        //             nonceStr: data.wxnonceStr, // 必填，生成签名的随机串
        //             signature: data.wxsignature,// 必填，签名，见附录1
        //             jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        //         });

        //     });
        // }


        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后
 
                wx.chooseWXPay({
                    timestamp: $scope.data.timeStamp, // 支付签名时间戳 注意这里的s 文档新版大写 但是我的小写才好使
                    nonceStr: $scope.data.nonceStr, // 支付签名随机串
                    package: $scope.data.package, // 统一支付接口返回的package包
                    signType: $scope.data.signType, // 签名方式，'MD5'
                    paySign: $scope.data.paySign, // 支付签名
                 success: function (res) {
                     if (res.err_msg == "get_brand_wcpay_request:ok") {
                         alert("支付成功");
                         // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。 
                     }
                     else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                         alert("cancel");
                         // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。 
                     }
                     else if (res.err_msg == "get_brand_wcpay_request:fail") {
                         alert("fail");
                         // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。 
                     }
                 }
                });


    });
