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
                            $scope.data=$.parseJSON(data.result.parameters);
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
                   alert($scope.data.appId),
                   alert($scope.data.timeStamp),
                   alert($scope.data.nonceStr),
                   alert($scope.data.package),
                   alert($scope.data.signType),
                   alert($scope.data.paySign),
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

        }

    });
