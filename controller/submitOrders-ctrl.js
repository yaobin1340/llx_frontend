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


        //获取账号余额信息
        $http
                .post($config.api_uri + '/Apiuser/Userinfo/mainpage')
                .success(function (data) {
                    if(data.success){
                        $scope.gold=data.gold/100;
                        console.log($scope.gold);
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })


        $http
                .post($config.api_uri + '/Apiuser/Orderinfo/orderdetail',{order_id:$stateParams.order_id})
                .success(function (data) {
                    console.log(data);
                    if(data.success){
                        $scope.ds=data;
                        $scope.msg = data.detail;
                        $scope.order_goods_info=data.order_goods_info;
                        $scope.xiubi=data.detail.can_use_integral;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })

        $scope.subOrder=function(){
            $http
                .post($config.api_uri + '/Apiuser/Orderinfo/check_order',{order_id:$stateParams.order_id,gold:$scope.gold})
                .success(function (data) {
                    if(data.success){
                    $session.set('order_id', data.logs.order_id)
                    $session.set('need_pay', data.logs.need_pay/100)
                    $session.set('log_id', data.logs.log_id)
                    $session.save()
                     $state.go('code');
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
