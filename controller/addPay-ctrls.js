angular
    .module( 'ohapp' )
    .controller( 'addPayCtrl', function addPayCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        var i=1;
        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在创建中...';
        $scope.backdrop = true;
        $scope.promise = null;

        $scope.chose = function(){
            if($scope.mobile.length==11){
                //查询优惠信息
                 $scope.promise = $http
                    .post($config.api_uri+'/Apishop/ApiSmall/index')
                    .success(function (data) {
                        if(data.success){
                            $scope.shop_info=data.shop_info;
                        }else{
                           $mdToast.show(
                            $mdToast.simple()
                                .content(data.error_msg)
                                .hideDelay(2000)
                            );
                        }
                    })

                $scope.promise = $http
                    .post($config.api_uri+'/Apishop/ApiSorder/get_zp',{mobile:$scope.mobile})
                    .success(function (data) {
                        if(data.success){
                            $scope.pay=data;
                            
                        }else{
                           $mdToast.show(
                            $mdToast.simple()
                                .content(data.error_msg)
                                .hideDelay(2000)
                            );
                        }
                    })
                
            }
        }

        //优惠卡折扣信息
        $scope.jiner = function(){
            if($scope.pay.yhk.bd!=0){
               $scope.bd = parseInt($scope.total/100)*$scope.shop_info.yhk1;
            }else if($scope.pay.yhk.qt!=0){
                $scope.bd = parseInt($scope.total/100)*$scope.shop_info.yhk2;
            }else{
                $scope.bd = 0;
            }
        }




        $scope.affirm = function(){
            var descs=[],qtys=[];
                    angular.forEach($scope.pay.zp_list,function(item, index){
                            descs.push(item.zp_name);
                            qtys.push(item.zp_num);
                        })
            $scope.promise = $http
                    .post($config.api_uri+'/Apishop/ApiSorder/create',{mobile:$scope.mobile,remark:$scope.remark,total:$scope.total,desc:descs,qty:qtys})
                    .success(function (data) {
                        if(data.success){
                            $mdToast.show(
                            $mdToast.simple()
                                .content("创建成功")
                                .hideDelay(2000)
                            );
                            $state.go("payShop");
                        }else{
                           $mdToast.show(
                            $mdToast.simple()
                                .content(data.error_msg)
                                .hideDelay(2000)
                            );
                        }
                    })
        }

    //添加
    
    // $scope.add = function() {
    //     i++;
    //     $(".czhao").before(
    // '<div class="msg-items"><span style="text-indent: 1em;float: left;">赠品</span><input type="text" class="zenpin desc'+i+'" ng-model="desc'+i+'"><button class="anniu" onclick="qty'+i+'=(qty'+i+'-1)>0?(qty'+i+'-1):0">-</button><input class="munZen qty'+i+'" ng-init="qty'+i+'=0" ng-model="qty'+i+'" value="0" style="width:1.0rem;height:1.2rem"><button class="anniu" onclick="qty'+i+'=qty'+i+'+1">+</button></div>'
    //         );
    // }

    // $scope.add = function() {
    //     i++;
    //     $(".czhao").before(
    // '<div class="msg-items"><span style="text-indent: 1em;float: left;">赠品</span><input type="text" class="zenpin desc'+i+'" ng-model="desc'+i+'"><button class="anniu" onclick="cut()">-</button><input class="munZen qty'+i+'" ng-init="qty'+i+'=0" ng-model="qty'+i+'" value="0" style="width:1.0rem;height:1.2rem"><button class="anniu" onclick="qty'+i+'=qty'+i+'+1">+</button></div>'
    //         );
    // }



    });
