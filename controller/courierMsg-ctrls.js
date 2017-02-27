angular
    .module( 'ohapp' )
    .controller( 'courierMsgCtrl', function courierMsgCtrl( $scope, $injector, $rootScope,$stateParams) {
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
                        $scope.express_name=data.order_detail.express_name;
                        $scope.express=data.order_detail.express;
                        $scope.kd_num=data.order_detail.kd_num;
                        $scope.goods_list=data.goods_list[0];
                        $scope.express_mobile=data.express_mobile;
                        wuliu();
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })

            function wuliu(){
                $scope.promise = $http
                .post($config.api_uri + '/Apipublic/Apilogin/get_express_info',{express:$scope.express,kd_num:$scope.kd_num})
                .success(function (data) {
                    if(data.success){
                        $scope.data=data.data;
                        $scope.state = data.state;
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
