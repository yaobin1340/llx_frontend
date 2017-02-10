angular
    .module( 'ohapp' )
    .controller( 'pingjiaCtrl', function pingjiaCtrl( $scope, $injector, $rootScope,evaluatePr,$stateParams) {
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
        // $scope.delay = 0;
        // $scope.minDuration = 0;
        // $scope.message = '正在加载...';
        // $scope.backdrop = true;
        // $scope.promise = null;
        
        // $scope.scroll_switch = 1;
        // $scope.evaluate = new evaluatePr();
        // $scope.evaluate.goods_id=$stateParams.goods_id;
        $scope.chose1=1;$scope.chose2=0;$scope.chose3=0;
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
                break;
            }
        }

        $scope.promise = $http
                .post($config.api_uri + '/Apipublic/ApiPshop/goodsdianPing',{goods_id:$stateParams.goods_id,orderby:1})
                .success(function (data) {
                    if(data.success){
                       $scope.totalnum=data.totalnum;
                       $scope.totalnum_haspic=data.totalnum_haspic;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })












    });
