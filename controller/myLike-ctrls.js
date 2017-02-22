angular
    .module( 'ohapp' )
    .controller( 'myLikeCtrl', function myLikeCtrl( $scope, $injector, $rootScope) {
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
                    if($scope.chose1==1){
                        return;
                    }
                    $scope.chose1=1;$scope.chose2=0;
                    break;
                    case 2 :
                    if($scope.chose2==1){
                        return;
                    }
                    $scope.chose1=0;$scope.chose2=1;
                    break;
                }
            }
















    });
