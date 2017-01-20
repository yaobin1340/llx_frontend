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
        //     function onBridgeReady(){
        //        WeixinJSBridge.invoke(
        //            'getBrandWCPayRequest', {
        //                 "appId":$scope.data.appId,     //公众号名称，由商户传入     
        //                 "timeStamp":$scope.data.timeStamp,         //时间戳，自1970年以来的秒数     
        //                 "nonceStr":$scope.data.nonceStr, //随机串     
        //                 "package":$scope.data.package,     
        //                 "signType":$scope.data.signType,         //微信签名方式：     
        //                 "paySign":$scope.data.paySign //微信签名 
        //            },
        //            function(res){ 
        //             alert(res.err_msg);
        //                if(res.err_msg == "get_brand_wcpay_request：ok" ) {
        //                     //完成支付，返回后台数据
     
        //                }
        //                alert(res.err_msg);     
        //            }
        //        ); 
        //     }
        //     if (typeof WeixinJSBridge == "undefined"){
        //        if( document.addEventListener ){
        //            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        //        }else if (document.attachEvent){
        //            document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
        //            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        //        }
        //     }else{
        //        onBridgeReady();
        //     } 

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
                    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

            });
        }


          wx.ready(function(){
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            wx.chooseWXPay({
                timestamp: $scope.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: $scope.data.nonceStr, // 支付签名随机串，不长于 32 位
                package: $scope.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType:$scope.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: $scope.data.paySign, // 支付签名
                success: function (res) {
                    // 支付成功后的回调函数
                   alert(res+"支付成功") 
                },
                fail: function (res) {
                  alert(JSON.stringify(res));
                }
            });
        });


    });
