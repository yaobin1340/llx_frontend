angular
    .module( 'ohapp' )
    .controller( 'applyCashCtrl', function applyCashCtrl( $scope, $injector, $rootScope,journals) {
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
                $scope.journal();
                break;
                case 3 :
                $scope.chose1=0;$scope.chose2=0;$scope.chose3=1;
                $scope.drawal();
                break;
            }
        }

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
        $scope.drawal = function(){
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
        $scope.journal=function(){
            $scope.scroll_switch = 1;
            $scope.journals = new journals(); 
        }

        $scope.leadMore =function(){
            $scope.beDate=$("#beginTime").val();
            $scope.endDate=$("#endTime").val();
                    $http
                    .post($config.api_uri + '/Apiuser/Money/detail',{bg_date:$scope.beDate,end_date:$scope.endDate,page:$scope.page})
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
                            $scope.dialog={open: true};
                            $scope.err=data.error_msg;
                        }
                    })
                    .error(function (err) {
                        $scope.dialog={open: true};
                        $scope.err = err.error_msg;
                    })
            }
        }


    });
