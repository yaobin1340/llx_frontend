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
            if($scope.needgold>0){
                $scope.needgold=$scope.needgold>$scope.gold?$scope.gold:$scope.needgold;
                $scope.needgold=$scope.needgold>$scope.total_price/100?$scope.total_price/100:$scope.gold;
                $scope.totalNeedpay=$scope.total_price/100-$scope.needgold;
            }else{
                $scope.needgold=0;
                $scope.totalNeedpay=$scope.total_price/100-$scope.needgold;
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
                        $scope.needgold=$scope.gold>$scope.total_price/100?$scope.total_price/100:$scope.gold;
                        $scope.totalNeedpay=$scope.total_price/100-$scope.needgold;
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
                            $state.go("Mycart",{type:"Indented"});
                        }else if(data.flag==2){
                            sessionStorage.setItem('order_id',data.logs.order_id);
                            sessionStorage.setItem('need_pay',data.logs.need_pay/100);
                            sessionStorage.setItem('log_id',data.logs.log_id);
                            sessionStorage.setItem('type',data.logs.type);
                            $state.go('code');
                            // $state.go('payment',{order_id:data.logs.order_id,need_pay:data.logs.need_pay/100,log_id:data.logs.log_id,type:data.logs.type});
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
