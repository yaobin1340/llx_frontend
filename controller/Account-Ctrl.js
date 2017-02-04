angular
    .module( 'ohapp' )
    .controller( 'AccountCtrl', function AccountCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
        
       $scope.nickname=$session.get("nickname");
       $scope.phones=JSON.stringify($session.get('phone'));
       $scope.phone=$scope.phones.slice(1,4)+"****"+$scope.phones.slice(7,11);
// 注释信息
















    });
