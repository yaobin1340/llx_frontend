angular
    .module( 'ohapp' )
    .controller( 'huiyuanMsgCtrl', function huiyuanMsgCtrl( $scope, $injector, $rootScope,mumber) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

            $scope.scroll_switch = 1;
            $scope.messagem = new mumber();















    });
