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
        
       // $("iframe").attr("src","http://apis.map.qq.com/tools/routeplan/eword="+$stateParams.name+"&epointx="+$stateParams.lng+"&epointy="+$stateParams.lat+"?referer=myapp&key=RLZBZ-EBGW4-YPXUT-XUQZC-7BAQK-JYFFO");
       $("iframe").attr("src","http://apis.map.qq.com/uri/v1/routeplan?type=bus&from=我的家&fromcoord=39.980683,116.302&to=中关村&tocoord=39.9836,116.3164&policy=1&referer=myapp");




















    });
