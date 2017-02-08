angular
    .module( 'ohapp' )
    .controller( 'integralSubmitCtrl', function integralSubmitCtrl( $scope, $injector, $rootScope,$stateParams) {
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
        $scope.good_id=$stateParams.goods_id;
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
        $scope.pty=1;
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
        //获取收货地址
        $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Adr/index')
                .success(function (data) {
                    if(data.success){
                        if($stateParams.addr_id!=null){
                            angular.forEach(data.addr,function(item, index){
                                if(item.addr_id==$stateParams.addr_id){
                                   $scope.adr=item;
                                   $scope.addr_id=item.addr_id;
                                }
                            })
                        }else{
                                angular.forEach(data.addr,function(item, index){
                                if(item.is_default==1){
                                    $scope.adr=item;
                                    $scope.addr_id=item.addr_id;
                                }
                            })
                        }
                        
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
                $scope.needgold=$scope.needgold>$scope.price/100?$scope.price/100:$scope.gold;
            }else{
                $scope.needgold=0;
            }
        }
        function dingdan (){
            $scope.promise = $http
                .post($config.api_uri + '/Apipublic/ApiPjf/goodsdetail',{goods_id:$stateParams.goods_id})
                .success(function (data) {
                    if(data.success){
                        $scope.msg = data.detail;
                        $scope.price = data.detail.price;
                        $scope.needgold=$scope.gold>$scope.price/100?$scope.price/100:$scope.gold;
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
                .post($config.api_uri + '/Apiuser/Apijf/save_order',{goods_id:$stateParams.goods_id,gold:$scope.needgold,pty:$scope.pty,addr_id:$scope.addr_id,remark:$scope.remark})
                .success(function (data) {
                    if(data.success){
                        if(data.flag==1){
                            $mdToast.show(
                                $mdToast.simple()
                                .content("支付完成")
                                .hideDelay(1000)
                            );
                            // $state.go("Mycart",{type:"Indented"});
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
            
        }





















    });
