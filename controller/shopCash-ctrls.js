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
                break;
            }
        }

    });
