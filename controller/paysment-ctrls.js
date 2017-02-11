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
                            $state.go("Mycart",{type:"noIndent"});
                          }else if($scope.kind==2){
                            $state.go("OfferPay");
                          }else if($scope.kind==3){
                            $state.go("xiubiCart",{type:"noIndent"});
                          }else{
                            $state.go("personal");
                          };
                       }
                       else if(res.err_msg == "get_brand_wcpay_request:fail"){
                          $mdToast.show(
                            $mdToast.simple()
                                .content("支付失败")
                                .hideDelay(1000)
                            );
                          if($scope.kind==1){
                            $state.go("Mycart",{type:"noIndent"});
                          }else if($scope.kind==2){
                            $state.go("OfferPay");
                          }else if($scope.kind==3){
                            $state.go("xiubiCart",{type:"noIndent"});
                          }else{
                            $state.go("personal");
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
                            $state.go("Mycart",{type:"Indented"});
                          }else if($scope.kind==2){
                            $state.go("OfferPay");
                          }else if($scope.kind==3){
                            $state.go("xiubiCart",{type:"Indented"});
                          }else{
                            $state.go("personal");
                          }
                    })
        }


    });
