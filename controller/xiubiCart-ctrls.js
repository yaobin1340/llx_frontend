angular
    .module( 'ohapp' )
    .controller( 'xiubiCartCtrl', function xiubiCartCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
        var i=0;

        if($stateParams.type=='noIndent'){
            $scope.chose1=0;$scope.chose2=1;$scope.chose3=0;
        }else if($stateParams.type=='Indented'){
            $scope.chose1=0;$scope.chose2=0;$scope.chose3=1;
        }else{
            $scope.chose1=1;$scope.chose2=0;$scope.chose3=0;
        };

        $scope.chose = function(id){
            switch (id) {
                case 1 :
                $scope.chose1=1;$scope.chose2=0;$scope.chose3=0;
                break;
                case 2 :
                $scope.chose1=0;$scope.chose2=1;$scope.chose3=0;
                break;
                case 3 :
                $scope.chose1=0;$scope.chose2=0;$scope.chose3=1;
                break;
            }
        }
        



    });
