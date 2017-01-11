angular
    .module( 'ohapp' )
    .controller( 'nicknameCtrl', function nicknameCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');


       $scope.nickname=$session.get("nickname");

       $scope.changeNick = function(){
             $http
                .post($config.api_uri + '/Apiuser/Userinfo/nickname',{nickname:$scope.nickname})
                .success(function (data) {
                    if(data.success){
                        $session.set('nickname', $scope.nickname);
                        $mdToast.show(
                        $mdToast.simple()
                            .content("修改成功")
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
