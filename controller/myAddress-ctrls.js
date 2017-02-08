angular
    .module( 'ohapp' )
    .controller( 'MaddressCtrl', function MaddressCtrl( $scope, $injector, $rootScope,Address,$stateParams) {
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
        $scope.scroll_switch = 1;
        $scope.address = new Address();
        //兼容选择收货地址
        $scope.good_id=$stateParams.goods_id;

        $scope.delect =  function(adrId){
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Adr/delete',{addr_id:adrId})
                .success(function (data) {
                    if(data.status=="success"){
                        $mdToast.show(
                                $mdToast.simple()
                                    .content(data.error_msg)
                                    .hideDelay(1000)
                                );
                        angular.forEach($scope.address.items,function(item, index){
                            if(item.addr_id==adrId){
                                $scope.address.items.splice(index, 1); 
                                return;
                            }
                        })
                        
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        }

        $scope.changeImg = function(addr){
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Adr/update_addr',{addr_id:addr})
                .success(function (data) {
                    if(data.success){
                        $http
                            .post($config.api_uri + '/Apiuser/Adr/index')
                            .success(function (data) {
                                if(data.success){
                                $scope.address = data.addr;
                                }else{
                                    window.history.go(0);
                                }
                            })
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
