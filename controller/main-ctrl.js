angular
    .module( 'ohapp')
    .controller( 'MainCtrl', function MainCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');

			$scope.num=1;
	        $scope.changeImg = function(data){
	        	$scope.num=data;
	        }
            console.log($scope.num);
















    });
