angular
    .module( 'ohapp' )
    .controller( 'xiubinoIndentCtrl', function xiubinoIndentCtrl( $scope, $injector, $rootScope,xiubiCart,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');   
        
        $scope.scroll_switch = 1;
        $scope.xiubicart = new xiubiCart();
        $scope.xiubicart.status=1;
        // $scope.evaluate.goods_id=$stateParams.goods_id;
        // $scope.evaluate.orderby=1;

        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在取消订单...';
        $scope.backdrop = true;
        $scope.promise = null;

        //删除订单
        $scope.quxiao = function(id){
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
                        $mdToast.show(
                        $mdToast.simple()
                            .content("订单取消成功")
                            .hideDelay(1000)
                        );
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
                            sessionStorage.setItem('order_id',data.logs.order_id);
                            sessionStorage.setItem('need_pay',data.logs.need_pay/100);
                            sessionStorage.setItem('log_id',data.logs.log_id);
                            sessionStorage.setItem('type',data.logs.type);
                            sessionStorage.setItem('kind',3);
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
