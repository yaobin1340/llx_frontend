angular
    .module( 'ohapp' )
    .controller( 'shopCashCtrl', function shopCashCtrl( $scope, $injector, $rootScope,journalShop,$stateParams) {
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
            money();
        }
        $scope.chose = function(id){
            switch (id) {
                case 1 :
                if($scope.chose1==1){
                    return;
                }
                $scope.chose1=1;$scope.chose2=0;$scope.chose3=0;
                money();
                break;
                case 2 :
                if($scope.chose2==1){
                    return;
                }
                $scope.chose1=0;$scope.chose2=1;$scope.chose3=0;
                $scope.journal();
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
        //滚动加载
        $(window).scroll(function(){
        　　var scrollTop = $(this).scrollTop();
        　　var scrollHeight = $(document).height();
        　　var windowHeight = $(this).height();
        　　if(scrollTop + windowHeight == scrollHeight){
        　　　　
                $scope.page++;$scope.leadMore();
        　　}
        });

       function money(){
            $scope.arr=[];
            $scope.page=1;
            $scope.soso = function(){
            $scope.arr=[];
            $scope.page=1;
            $scope.leadMore()
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
                if($scope.dan.gold>=$scope.dan.cash_money){
                    $scope.money=$scope.dan.gold>$scope.dan.cash_money_big?$scope.dan.cash_money_big:$scope.dan.gold;
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
            if($scope.yzms!=$scope.yzm){
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
        
        $scope.journal=function(){
            $scope.scroll_switch = 1;
            $scope.journals = new journalShop();  
        }

        $scope.leadMore =function(){
            $scope.beDate=$("#beginTime").val();
            $scope.endDate=$("#endTime").val();
            $scope.promise = $http
                    .post($config.api_uri + '/Apishop/Money/detail',{bg_date:$scope.beDate,end_date:$scope.endDate,page:$scope.page})
                    .success(function (data) {
                        if(data.success){
                            if(data.list==null||!data.list.length){
                                $scope.noLead=1;
                                return
                            }
                             var items = data.list;
                              for (var i = 0; i < items.length; i++) {
                                $scope.arr.push(items[i]);
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
