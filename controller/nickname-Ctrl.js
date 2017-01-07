angular
    .module( 'ohapp' )
    .controller( 'nicknameCtrl', function nicknameCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');



       $scope.nickname=$session.get("nickname");

       $scope.changeNick = function(){
             $http
                .post($config.api_uri + '/Apiuser/Userinfo/nickname',{nickname:$scope.nickname})
                .success(function (data) {
                    if(data.success){
                        $scope.dialog={open: true};
                        $scope.err="修改成功";
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














    });
