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


        $http
                .post($config.api_uri + '/Apiuser/Team/index')
                .success(function (data) {
                    if(data.success){
                        $scope.shop = data.shop;
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




    });
