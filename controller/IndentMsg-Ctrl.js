angular
    .module( 'ohapp' )
    .controller( 'IndentMsgCtrl', function IndentMsgCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

            $http
                .post($config.api_uri + '/Apiuser/Orderinfo/orderdetail',{order_id:$stateParams.order_id})
                .success(function (data) {
                    if(data.success){
                        console.log(data);
                        $scope.msg = data.detail;
                        $scope.order_goods_info=data.order_goods_info;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })

















    });
