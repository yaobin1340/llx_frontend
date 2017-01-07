angular
    .module( 'ohapp' )
    .controller( 'preferentialCtrl', function preferentialCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');

            $http
                .post($config.api_uri + '/Apiuser/Yhk/index')
                .success(function (data) {
                    if(data.success){
                        $scope.yhk = data.yhk;
                    }else{
                        $scope.dialog={open: true};
                        $scope.err=data.error_msg;
                    }
                })
                .error(function (err) {
                    $scope.dialog={open: true};
                    $scope.err = err.error_msg;
                })

















    });
