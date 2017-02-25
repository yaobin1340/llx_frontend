angular
    .module( 'ohapp' )
    .controller( 'drawalCtrl', function drawalCtrl( $scope, $injector, $rootScope) {
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

            $scope.phone=$session.get('phone');
            //获取相关提现信息
           $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Money/cash')
                .success(function (data) {
                    if(data.success){
                        $scope.dan=data;
                        $scope.info=data.info;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
            
            $scope.tixian = function(){
                if($scope.dan.gold/100>=$scope.dan.cash_money){
                    $scope.money=$scope.dan.gold/100;
                }else{
                    $mdToast.show(
                        $mdToast.simple()
                            .content("您的余额太少了")
                            .hideDelay(1000)
                        );
                }
            }


            $scope.getCard = function(){
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Money/sendsms',{mobile:$scope.phone})
                .success(function (data) {
                    if(data.success){
                        $scope.yzm=data.yzm;
                        $mdToast.show(
                        $mdToast.simple()
                            .content("验证码已发送成功")
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
        // 验证输入金额
            $scope.yanzheng = function(){
                if($scope.money>=0||$scope.money==''){
                    $scope.money = $scope.money.replace(/(\.\d{2})\d*$/,'\$1');
                    $scope.money = $scope.money>$scope.dan.gold/100?$scope.dan.gold/100:$scope.money;
                }else{
                    $scope.money='';
                }
            }
            $scope.drawalMoney = function(){
                if($("#yzm").val()!=$scope.yzm){
                        $mdToast.show(
                            $mdToast.simple()
                                .content("验证码错误")
                                .hideDelay(1000)
                            );
                    return;
                }
           $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Money/cash',{gold:$scope.money,bank_name:$scope.info.bank_name,bank_num:$scope.info.bank_num,bank_branch:$scope.branch,bank_realname:$scope.info.bank_realname,mobile:$scope.phone})
                .success(function (data) {
                    if(data.success){
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
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

    });
