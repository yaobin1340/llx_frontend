angular
    .module( 'ohapp' )
    .controller( 'shopJournalCtrl', function shopJournalCtrl( $scope, $injector, $rootScope,$stateParams,journalShop) {
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
        $scope.journals = new journalShop(); 















    });
