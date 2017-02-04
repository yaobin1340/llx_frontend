angular
    .module( 'ohapp' )
    .controller( 'personalCtrl', function personalCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
          
            $scope.$emit('changeImg', 5); 

            $scope.showup=1;

            //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;

            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Userinfo/mainpage')
                .success(function (data) {
                    if(data.success){
                        $scope.userMsg=data;
                        $session.set('face', data.face)
                        $session.set('nickname', data.nickname);
                        $session.save()
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
    
        $scope.exit = function(){
            $session.purge('auth');
            if(!$session.get('auth').token){
                window.location.reload();
                $mdToast.show(
                        $mdToast.simple()
                            .content("退出成功")
                            .hideDelay(1000)
                        );
            }
        }

    });
