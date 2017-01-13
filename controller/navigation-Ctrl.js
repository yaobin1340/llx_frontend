angular
    .module( 'ohapp' )
    .controller( 'navigationCtrl', function navigationCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $config = $injector.get( '$config' );
        var $timeout = $injector.get( '$timeout' );
        var $session = $injector.get('$session');
        var $window = $injector.get('$window')
        var $location = $injector.get('$location');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast'); 
        
       $("iframe").attr("src","http://apis.map.qq.com/tools/routeplan/eword="+$stateParams.name+"&epointx="+$stateParams.lng+"&epointy="+$stateParams.lat+"?referer=myapp&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77");




















    });
