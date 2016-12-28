angular
    .module( 'ohapp' )
    .controller( 'forgotCtrl', function forgotCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');

        $scope.getYzm=function(){
        	$http
        		.post($config.api_uri + '/Apipublic/Apilogin/resetpw_yzm',$scope.phone)
        		.success(function(data){
                    if(data.success){
                        $scope.getY=data.yzm;
                    }
        		})
        		.error(function(err){
        			$scope.apiError = err.error_msg;
        		})
        }

        $scope.changePWD=function(){
        	if($scope.getY=!$scope.yzm){
        		$scope.apiError = "验证码不正确";
        		return;
        	}
        	if($scope.Npassword!=$scope.Npasswords){
        		
        	}
        	$http
        		.post($config.api_uri + '/Apipublic/Apilogin/resetpw',{mobile:$scope.phone,Npassword:$scope.Npassword})
        		.success(function(data){
                    if(data.success){
                        
                    }
        		})
        		.error(function(err){
        			$scope.apiError = err.error_msg;
        		})
        }




















    });
