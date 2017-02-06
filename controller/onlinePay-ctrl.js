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
            $scope.promise = $http
                .post($config.api_uri + '/Apishop/ApiSorder/pay',{id:$stateParams.pay_id})
                .success(function (data) {
                    if(data.success){
                        $scope.detail=data.detail;
                        $scope.zp_list=data.zp_list;
                        $scope.needPay=data.detail.total-data.detail.yhk;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })


        $scope.affirm = function(){
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/pay/check_pay',{id:$stateParams.pay_id})
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
