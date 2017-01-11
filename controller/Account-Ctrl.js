angular
    .module( 'ohapp' )
    .controller( 'AccountCtrl', function AccountCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config2' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
       $scope.nickname=$session.get("nickname");
       $scope.phone=$session.get('phone').slice(0,3)+"****"+$session.get('phone').slice(7,11);

















    });
