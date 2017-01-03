angular
    .module( 'ohapp' )
    .controller( 'personalCtrl', function personalCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        if(!$session.get('auth').token){
               $scope.dialog={open: true};
               $scope.showup=0;
        }else{
            $scope.showup=1;
            $http
                .post($config.api_uri + '/Apiuser/Userinfo/mainpage')
                .success(function (data) {
                    if(data.success){
                        $scope.userMsg=data;
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
        $scope.exit = function(){
            $session.purge('auth');

            // if(!$session.get('auth').token){
            //     $scope.dialog={open: true};
            //     $scope.err="退出成功";
            // }
        }


    });
