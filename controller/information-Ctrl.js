angular
    .module( 'ohapp' )
    .controller( 'informationCtrl', function informationCtrl( $scope, $injector, $rootScope) {
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
            systemMsg();
            
            $scope.chose = function(id){
                switch (id) {
                    case 1 :
                    $scope.chose1=1;$scope.chose2=0;
                    systemMsg();
                    break;
                    case 2 :
                    $scope.chose1=0;$scope.chose2=1;
                    memberMsg();
                    break;
                }
            }

            function systemMsg(){
                console.log("系统消息")
            }
            function memberMsg(){
                console.log("会员消息")
            }
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

















    });
