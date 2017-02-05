angular
    .module( 'ohapp' )
    .controller( 'outlinePayCtrl', function outlinePayCtrl( $scope, $injector, $rootScope,$stateParams) {
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
                        console.log(data);
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
                .post($config.api_uri + '/Apishop/ApiSorder/check_pay',{id:$stateParams.pay_id})
                .success(function (data) {
                    console.log(data);
                    if(data.success){
                        $mdToast.show(
                        $mdToast.simple()
                            .content("支付成功")
                            .hideDelay(1000)
                        );
                        $state.go("payShop");
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
