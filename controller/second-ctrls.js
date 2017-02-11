angular
    .module( 'ohapp' )
    .controller( 'restaurantsCtrl', function restaurantsCtrl( $scope, $injector, $rootScope,Shops,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

            $scope.cate_name=$stateParams.cate_name;
            $scope.cate_id=$stateParams.cate_id;
            
            //初始化加载页面
            $scope.scroll_switch = 1;
            $scope.shops = new Shops();
            $scope.shops.cate_id=$stateParams.cate_id;
            $scope.shops.cate_name=$stateParams.cate_name;
            $scope.shops.order=$scope.order;
            $scope.shops.lat=$stateParams.lat;
            $scope.shops.lng=$stateParams.lng;
            $scope.shops.area_code=$stateParams.area_code;
            $scope.shops.items = [];
            $scope.shops.end = false;
            $scope.shops.busy = false;
            $scope.shops.page = 1;
            $scope.shops.nextPage();
            //控制筛选
        $scope.jiazai = function(){
            $scope.shops.order=$scope.order;
            $scope.shops.items = [];
            $scope.shops.end = false;
            $scope.shops.busy = false;
            $scope.shops.page = 1;
            $scope.shops.nextPage();
        }
        


        $scope.step==0;
        $scope.choseStep = function(step){
            switch (step) {
                case 1 :
                    $scope.step==1?$scope.step=0:$scope.step=1;
                    break;
                case 2 :
                    $scope.step==2?$scope.step=0:$scope.step=2;
                    break;
            }
        }
        $scope.step2=11;
        $scope.chosech="智能排序";
        $scope.choseStep2 = function(steps){
            switch (steps) {
                case 11 :
                    $scope.step2=11;$scope.step=0;
                    $scope.chosech="智能排序";
                    $scope.order='';
                    $scope.jiazai();
                    break;
                case 12 :
                    $scope.step2=12;$scope.step=0;
                    $scope.chosech="离我最近";
                    $scope.order=1;
                    $scope.jiazai();
                    break;
                case 13 :
                    $scope.step2=13;$scope.step=0;
                    $scope.chosech="人气最高";
                    $scope.order=2;
                    $scope.jiazai();
                    break;
                case 14 :
                    $scope.step2=14;$scope.step=0;
                    $scope.chosech="好评优先";
                    $scope.order=3;
                    $scope.jiazai();
                    break;
            }
        }












    });
