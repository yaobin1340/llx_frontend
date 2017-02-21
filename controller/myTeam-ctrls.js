angular
    .module( 'ohapp' )
    .controller( 'myTeamCtrl', function myTeamCtrl( $scope, $injector, $rootScope) {
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
        $scope.chose=0;

        $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Team/index')
                .success(function (data) {
                    if(data.success){
                        $scope.shop = data.shop;
                    }else{
                       $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })

        $scope.selectChange = function(id){
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Team/index',{shop_id:id})
                .success(function (data) {
                    if(data.success){
                        $scope.chose=1;
                        $scope.fx=data;
                        $scope.team1_info = data.team1_info;
                        $scope.team2_info = data.team2_info;
                        $scope.team3_info = data.team3_info;
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
