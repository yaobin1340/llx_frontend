angular
    .module( 'ohapp' )
    .controller( 'changePwdCtrl', function changePwdCtrl( $scope, $injector, $rootScope) {
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
        $scope.message = '正在修改...';
        $scope.backdrop = true;
        $scope.promise = null;

            $scope.change = function(){
                 $scope.promise = $http
                    .post($config.api_uri + '/Apipublic/Apilogin/resetpw',{mobile:$session.get('phone'),Npassword:$scope.password})
                    .success(function (data) {
                        if(data.success){
                             $mdToast.show(
                            $mdToast.simple()
                                .content("密码修改成功")
                                .hideDelay(1000)
                            );
                             $session.purge('auth');
                             $state.go('signin');
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
