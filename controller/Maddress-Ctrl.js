angular
    .module( 'ohapp' )
    .controller( 'MaddressCtrl', function MaddressCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');	

        // $http
        //         .post($config.api_uri + '/Apiuser/Userinfo/mainpage')
        //         .success(function (data) {
        //             if(data.success){
        //                 $scope.account = data;
        //             }else{
        //                 $scope.dialog={open: true};
        //                 $scope.err=data.error_msg;
        //             }
        //         })
        //         .error(function (err) {
        //             $scope.dialog={open: true};
        //             $scope.err = err.error_msg;
        //         })

        $scope.delect =  function(){
            console.log("删除接口")
        }

















    });
