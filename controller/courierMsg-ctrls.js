angular
    .module( 'ohapp' )
    .controller( 'courierMsgCtrl', function courierMsgCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
    
// 注释信息
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
        $scope.order_id=$stateParams.order_id;
            // $scope.promise = $http
            //     .post($config.api_uri + '/Apiuser/Userinfo/mainpage')
            //     .success(function (data) {
            //         if(data.success){
            //             $scope.userMsg=data;
            //             $session.set('face', data.face)
            //             $session.set('nickname', data.nickname);
            //             $session.save()
            //             $scope.nickname=data.nickname;
            //             $scope.phones=data.mobile;
            //             $scope.phone=$scope.phones.slice(0,3)+"****"+$scope.phones.slice(7,11);
            //         }else{
            //             $mdToast.show(
            //             $mdToast.simple()
            //                 .content(data.error_msg)
            //                 .hideDelay(1000)
            //             );
            //         }
            //     })
















    });
