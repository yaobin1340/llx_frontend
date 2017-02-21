angular
    .module( 'ohapp')
    .controller( 'MainCtrl', function MainCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
 

		$scope.num=1;$scope.add=0;
	    $scope.changeImg = function(data){
	        $scope.num=data;
	    }
        $scope.$on('changeImg', function(event, data) {  
          $scope.num = data; 
        });


        $scope.chose = function(){
            $http
                    .post($config.api_uri + '/Apiuser/Userinfo/mainpage')
                    .success(function (data) {
                        if(data.success){
                            $scope.shopflag = data.shopflag;
                            if($scope.shopflag==1){
                                $state.go('main.OfferPay');
                            }else if($scope.shopflag==2){
                                $state.go('payShop');
                            }
                        }
                    })
        }
            














    });
