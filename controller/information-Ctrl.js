angular
    .module( 'ohapp' )
    .controller( 'informationCtrl', function informationCtrl( $scope, $injector, $rootScope,system,mumber) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

            $scope.$emit('changeImg', 4); 

	        $scope.chose1=1;$scope.chose2=0;
            $scope.scroll_switch = 1;
            $scope.messages = new system();
            $scope.chose = function(id){
                switch (id) {
                    case 1 :
                    $scope.chose1=1;$scope.chose2=0;
                    $scope.messages.items = [];
                    $scope.messages.end = false;
                    $scope.messages.busy = false;
                    $scope.messages.page = 1;
                    $scope.messages.nextPage();
                    break;
                    case 2 :
                    $scope.chose1=0;$scope.chose2=1;
                    if($scope.messagem==undefined){
                         $scope.scroll_switch = 1;
                        $scope.messagem = new mumber();
                    }else{
                        $scope.messagem.items = [];
                        $scope.messagem.end = false;
                        $scope.messagem.busy = false;
                        $scope.messagem.page = 1;
                        $scope.messagem.nextPage();
                    }
                    break;
                }
            }
















    });
