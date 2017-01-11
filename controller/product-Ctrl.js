angular
    .module( 'ohapp' )
    .controller( 'productCtrl', function productCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
        
        $http
				.post($config.api_uri + '/Apipublic/ApiPshop/goodsdetail',{goods_id:$stateParams.goods_id})
				.success(function (data) {
                    if(data.success){
                        $scope.productMsg_list = data.detail;
                        $scope.productMsg=data;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
				})

        $scope.addCart = function(){
            if(!$session.get('auth').token){
                $state.go('signin');
            }else{
            $http
                .post($config.api_uri + '/Apiuser/cart/cartadd',{goods_id:$stateParams.goods_id})
                .success(function (data) {
                    if(data.success){
                       console.log(data);
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })





            }
        }
















    });
