angular
    .module( 'ohapp' )
    .controller( 'SubmitOrder', function SubmitOrder( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $config = $injector.get( '$config' );
        var $timeout = $injector.get( '$timeout' );
        var $session = $injector.get('$session');
        var $window = $injector.get('$window')
        var $location = $injector.get('$location');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast'); 
        
        $http
				.post($config.api_uri + '/Apipublic/ApiPshop/goodsdetail',{})
				.success(function (data) {
					if(data.success){

                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
				})

        // $scope.subOrder=function(){
        //     $rootScope.$page = 'payment'
        // }





















    });
