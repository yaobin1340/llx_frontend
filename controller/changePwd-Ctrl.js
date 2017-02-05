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
        $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Userinfo/mainpage')
                .success(function (data) {
                    if(data.success){
                        $scope.phones=data.mobile;
                        $scope.mobile=$scope.phones.slice(0,3)+"****"+$scope.phones.slice(7,11);
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content("获取信息失败，请重试")
                            .hideDelay(1000)
                        );
                    }
                })

        $scope.getCard = function(){
                 $scope.promise = $http
                    .post($config.api_uri + '/Apipublic/Apilogin/resetpw_yzm',{mobile:$scope.mobile})
                    .success(function (data) {
                        if(data.success){
                             $scope.getYzm=data.yzm;
                        }else{
                            $mdToast.show(
                            $mdToast.simple()
                                .content(data.error_msg)
                                .hideDelay(1000)
                            );
                        }
                    })
            }

            $scope.change = function(){
                if($scope.getYzm!=$scope.yzm){
                    $mdToast.show(
                            $mdToast.simple()
                                .content("验证码不正确")
                                .hideDelay(1000)
                            );
                    return;
                }
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
