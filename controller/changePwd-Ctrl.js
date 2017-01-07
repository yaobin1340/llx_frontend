angular
    .module( 'ohapp' )
    .controller( 'changePwdCtrl', function changePwdCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');

            $scope.change = function(){
                 $http
                    .post($config.api_uri + '/Apipublic/Apilogin/resetpw',{mobile:$session.get('phone'),Npassword:$scope.password})
                    .success(function (data) {
                        if(data.success){
                             $scope.dialog={open: true};
                             $scope.err="密码修改成功"
                        }else{
                            $scope.dialog={open: true};
                            $scope.err=data.error_msg;
                        }
                    })
                    .error(function (err) {
                        // $scope.dialog={open: true};
                        // $scope.err = err.error_msg;
                    })
            }
           

















    });
