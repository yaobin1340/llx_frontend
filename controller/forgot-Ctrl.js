angular
    .module( 'ohapp' )
    .controller( 'forgotCtrl', function forgotCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');





        $scope.getCards=function(){
        	$http
        		.post($config.api_uri + '/Apipublic/Apilogin/resetpw_yzm',{mobile:$scope.phone})
        		.success(function(data){
                    if(data.success){
                        $scope.yzm=data.yzm;
                    }else{
                        $scope.dialog={open: true};
                        $scope.err=data.error_msg;
                    }
        		})
        		.error(function(err){
                    $scope.dialog={open: true};
        			$scope.err = err.error_msg;
        		})
        }

        $scope.changePWD=function(){
        	if($scope.yzm=!$scope.yzms){
        		$scope.apiError = "验证码不正确";
        		return;
        	}
        	$http
        		.post($config.api_uri + '/Apipublic/Apilogin/resetpw',{mobile:$scope.phone,Npassword:$scope.password})
        		.success(function(data){
                    if(data.success){
                        $state.go('signin');
                    }else{
                        $scope.dialog={open: true};
                        $scope.err=data.error_msg;
                    }
        		})
        		.error(function(err){
                    $scope.dialog={open: true};
        			$scope.err = err.error_msg;
        		})
        }




















    });
