angular
    .module( 'ohapp' )
    .controller( 'forgotCtrl', function forgotCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        $scope.getCards=function(){
        	$http
        		.post($config.api_uri + '/Apipublic/Apilogin/resetpw_yzm',{mobile:$scope.phone})
        		.success(function(data){
                    if(data.success){
                        $scope.yzm=data.yzm;
                        $mdToast.show(
                        $mdToast.simple()
                            .content("验证码发送成功")
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

        $scope.changePWD=function(){
        	if($scope.yzm!=$scope.yzms){
        		$mdToast.show(
                        $mdToast.simple()
                            .content('您输入的验证码不正确')
                            .hideDelay(1000)
                        );
        		return;
        	}
        	$http
        		.post($config.api_uri + '/Apipublic/Apilogin/resetpw',{mobile:$scope.phone,Npassword:$scope.password})
        		.success(function(data){
                    if(data.success){
                        $mdToast.show(
                        $mdToast.simple()
                            .content("请使用新密码登陆")
                            .hideDelay(1000)
                        );
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
