angular
    .module( 'ohapp' )
    .controller( 'shopCenterCtrl', function shopCenterCtrl( $scope, $injector, $rootScope) {
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
                    .post($config.api_uri+'/Apishop/ApiSmall/index')
                    .success(function (data) {
                        if(data.success){
                            $scope.shopdata=data;
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
