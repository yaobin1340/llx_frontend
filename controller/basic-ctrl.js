angular
    .module( 'ohapp' )
    .controller( 'basicCtrl', function basicCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        $scope.chose1=1;$scope.chose2=0;
        $scope.chose = function(id){
                switch (id) {
                    case 1 :
                    $scope.chose1=1;$scope.chose2=0;
                    break;
                    case 2 :
                    $scope.chose1=0;$scope.chose2=1;
                    break;
                }
            }





    });
