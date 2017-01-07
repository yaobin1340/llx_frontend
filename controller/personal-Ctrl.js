angular
    .module( 'ohapp' )
    .controller( 'personalCtrl', function personalCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        
            $scope.showup=1;
            $http
                .post($config.api_uri + '/Apiuser/Userinfo/mainpage')
                .success(function (data) {
                    if(data.success){
                        $scope.userMsg=data;
                        $session.set('face', data.face)
                        $session.set('nickname', data.nickname);
                        $session.save()
                    }
                })
                .error(function (err) {
                    
                })
        $scope.exit = function(){
            $session.purge('auth');
            if(!$session.get('auth').token){
                window.location.reload();
                $scope.dialog2={open: true};
                $scope.err="退出成功";
            }
        }


    });
