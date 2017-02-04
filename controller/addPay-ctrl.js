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

        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在创建中...';
        $scope.backdrop = true;
        $scope.promise = null;
        $scope.affirm = function(){
            $scope.promise = $http
                    .post($config.api_uri+'/Apishop/ApiSorder/create',{moblie:$scope.moblie,remark:$scope.remark,total:$scope.total,desc:[$scope.desc1,$scope.desc2],qty:[$scope.qty1,$scope.qty2]})
                    .success(function (data) {
                        if(data.success){
                            $mdToast.show(
                            $mdToast.simple()
                                .content("创建成功")
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
