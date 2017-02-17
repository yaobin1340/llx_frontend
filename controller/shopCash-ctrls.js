angular
    .module( 'ohapp' )
    .controller( 'shopCashCtrl', function shopCashCtrl( $scope, $injector, $rootScope,$stateParams) {
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

        if($stateParams.type=='drawal'){
            $scope.chose1=0;$scope.chose2=0;$scope.chose3=1;
            drawal();
        }else{
            $scope.chose1=1;$scope.chose2=0;$scope.chose3=0;
        }
        $scope.chose = function(id){
            switch (id) {
                case 1 :
                if($scope.chose1==1){
                    return;
                }
                $scope.chose1=1;$scope.chose2=0;$scope.chose3=0;
                break;
                case 2 :
                if($scope.chose2==1){
                    return;
                }
                $scope.chose1=0;$scope.chose2=1;$scope.chose3=0;
                break;
                case 3 :
                if($scope.chose3==1){
                    return;
                }
                $scope.chose1=0;$scope.chose2=0;$scope.chose3=1;
                drawal();
                break;
            }
        }

         function drawal(){
            $scope.phone=$session.get('phone');
            //获取相关提现信息
            
           $scope.promise = $http
                .post($config.api_uri + '/Apishop/Money/cash')
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
                .post($config.api_uri + '/Apishop/Money/sendsms',{mobile:$scope.phone})
                .success(function (data) {
                    if(data.success){
                        $scope.yzm=data.yzm;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
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
            $scope.money=$("#money").val();
           $scope.promise = $http
                .post($config.api_uri + 'Apishop/Money/cash',{gold:$scope.money,bank_name:$scope.info.bank_name,bank_num:$scope.info.bank_num,bank_branch:$scope.branch,bank_realname:$scope.info.bank_realname,mobile:$scope.phone})
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
        }

    });
