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
            if($scope.needgold>0){
                $scope.needgold=$scope.needgold>$scope.gold?$scope.gold:$scope.needgold;
                $scope.needgold=$scope.needgold>$scope.needPay?$scope.needPay:$scope.needgold;
                $scope.totalNeedpay=$scope.needPay-$scope.needgold;
            }else{
                $scope.needgold=0;
                $scope.totalNeedpay=$scope.needPay-$scope.needgold;
            }
            if($scope.needPay-$scope.needgold<0){
                $scope.totalNeedpay=0;
                $scope.needgold=$scope.needPay;
            }
        }

        function dingdan (){
            $scope.promise = $http
                .post($config.api_uri + '/Apishop/ApiSorder/pay',{id:$stateParams.pay_id,gold:$scope.needgold})
                .success(function (data) {
                    console.log(data);
                    if(data.success){
                        $scope.detail=data.detail;
                        $scope.zp_list=data.zp_list;
                        $scope.needPay=data.detail.total-data.detail.yhk;
                        $scope.needgold=$scope.gold>$scope.needPay?$scope.needPay:$scope.gold;
                        $scope.totalNeedpay=$scope.needPay-$scope.needgold;
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
