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














    });
