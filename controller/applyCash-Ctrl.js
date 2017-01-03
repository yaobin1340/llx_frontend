angular
    .module( 'ohapp' )
    .controller( 'applyCashCtrl', function applyCashCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
		$scope.chose1=1;$scope.chose2=0;$scope.chose3=0;
        money();

        $scope.chose = function(id){
            switch (id) {
                case 1 :
                $scope.chose1=1;$scope.chose2=0;$scope.chose3=0;
                money();
                break;
                case 2 :
                $scope.chose1=0;$scope.chose2=1;$scope.chose3=0;
                drawal();
                break;
                case 3 :
                $scope.chose1=0;$scope.chose2=0;$scope.chose3=1;
                journal();
                break;
            }
        }


        function money(){
            $scope.soso = function(){
                $scope.beDate=$("#beginTime").val();
                $scope.endDate=$("#endTime").val();
                if($scope.beDate&&$scope.endDate){
                    $http
                    .post($config.api_uri + '/Apiuser/Money/detail',{bg_data:$scope.beDate,end_data:$scope.endDate})
                    .success(function (data) {
                        if(data.success){
                            $scope.money = data;
                        }else{
                            $scope.dialog={open: true};
                            $scope.err=data.error_msg;
                        }
                    })
                    .error(function (err) {
                        $scope.dialog={open: true};
                        $scope.err = err.error_msg;
                    })
                }else{
                    $scope.dialog={open: true};
                    $scope.err = "您输入的信息有误";
                }
            }
        }
        function drawal(){
            $scope.getCard = function(){
            $http
                .post($config.api_uri + '/Apiuser/Money/sendsms')
                .success(function (data) {
                    if(data.success){
                        $scope.yzm=data.yzm;
                    }else{
                        $scope.dialog={open: true};
                        $scope.msg=data.error_msg;
                    }
                })
                .error(function (err) {
                    $scope.dialog={open: true};
                    $scope.msg=err.error_msg;
                })
        }

        $scope.drawalMoney = function(){
            $http
                .post($config.api_uri + '/Apiuser/Money/cash',{gold:$scope.money,bank_name:scope.cardType,bank_num:scope.cardNum,bank_branch:scope.branch,bank_realname:scope.person,mobile:scope.user.mobile})
                .success(function (data) {
                    if(data.success){
                        $scope.dialog={open: true};
                        $scope.msg="您的申请已成功提交"
                    }else{
                        $scope.dialog={open: true};
                         $scope.msg=data.error_msg;
                    }
                })
                .error(function (err) {
                    $scope.dialog={open: true};
                    $scope.msg=err.error_msg;
                })   
            }
        }
        function journal(){
             $http
                .post($config.api_uri + '/Apiuser/Money/cashlogs')
                .success(function (data) {
                    if(data.success){
                        $scope.journal=data.list;
                    }else{
                        
                    }
                })
                .error(function (err) {
                    
                })   
        }













    });
