angular
    .module( 'ohapp' )
    .controller( 'jforderMsgCtrl', function jforderMsgCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
    
// 注释信息
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
        $scope.order_id=$stateParams.order_id;
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Apijf/order_detail',{order_id:$stateParams.order_id})
                .success(function (data) {
                    if(data.success){
                        $scope.msg = data.order_detail;
                        $scope.goods_list = data.goods_list;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })

            //删除订单
        $scope.quxiao = function(id){
            $scope.message = '正在取消订单...';
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Apijf/order_delete',{order_id:id})
                .success(function (data) {
                    if(data.success){
                        angular.forEach($scope.xiubicart.items,function(item, index){
                                if(item.jforder_id==id){
                                    $scope.xiubicart.items.splice(index, 1);
                                    return;
                                }
                            });
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        }

        //确认收货
        $scope.shouhuo = function(id){
            $scope.message = '正在确认收货...';
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Apijf/order_sh',{order_id:id})
                .success(function (data) {
                    if(data.success){
                        angular.forEach($scope.xiubicart.items,function(item, index){
                                if(item.jforder_id==id){
                                    $scope.xiubicart.items[index].status=4;
                                    return;
                                }
                            });
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        }
        //立即支付
        $scope.paynow = function(id){
            $scope.message = '正在支付中...';
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Apijf/order_pay',{order_id:id})
                .success(function (data) {
                    if(data.success){
                        if(data.flag==1){
                           $mdToast.show(
                            $mdToast.simple()
                                .content("支付成功")
                                .hideDelay(1000)
                            ); 
                        }else if(data.flag==2){
                            $session.set('order_id', data.logs.order_id)
                            $session.set('need_pay', data.logs.need_pay/100)
                            $session.set('log_id', data.logs.log_id)
                            $session.save()
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
        };















    });
