angular
    .module( 'ohapp' )
    .controller( 'MycartCtrl', function MycartCtrl( $scope, $injector, $rootScope,$stateParams) {
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

        $scope.$emit('changeImg', 2); 
        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;

        if($stateParams.type=='noIndent'){
            $scope.chose1=0;$scope.chose2=1;$scope.chose3=0;
            // noIndent();
        }else if($stateParams.type=='Indented'){
            $scope.chose1=0;$scope.chose2=0;$scope.chose3=1;
            // Indented();
        }else{
            $scope.chose1=1;$scope.chose2=0;$scope.chose3=0;
            // allIndent();
        }

        $scope.chose = function(id){
            switch (id) {
                case 1 :
                $scope.chose1=1;$scope.chose2=0;$scope.chose3=0;
                // allIndent();
                break;
                case 2 :
                $scope.chose1=0;$scope.chose2=1;$scope.chose3=0;
                // noIndent();
                break;
                case 3 :
                $scope.chose1=0;$scope.chose2=0;$scope.chose3=1;
                // Indented();
                break;
            }
        }

        $scope.back = function(){
            $state.go("main.personal");
        }







    });
