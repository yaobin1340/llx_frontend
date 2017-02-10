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
