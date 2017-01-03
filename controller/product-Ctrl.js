angular
    .module( 'ohapp' )
    .controller( 'productCtrl', function productCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        $http
				.post($config.api_uri + '/Apipublic/ApiPshop/goodsdetail',{goods_id:$stateParams.goods_id})
				.success(function (data) {
                    if(data.success){
                        $scope.productMsg_list = data.detail;
                        $scope.productMsg=data;
                    }else{
                        $scope.dialog={open: true};
                        $scope.err=data.error_msg;
                    }
				})
				.error(function (err) {
                    $scope.dialog={open: true};
					 $scope.err = err.error_msg;
				})

        $scope.addCart = function(){
            if(!$session.get('auth').token){
                alert("请先登录")
                $state.go('signin');
            }else{
            $http
                .post($config.api_uri + '/Apiuser/cart/cartadd',{goods_id:$stateParams.goods_id,token:$session.get('auth').token})
                .success(function (data) {
                    if(data.success){
                       console.log("加入购物车成功");
                    }else{
                        $scope.dialog={open: true};
                        $scope.err=data.error_msg;
                    }
                })
                .error(function (err) {
                    $scope.dialog={open: true};
                     $scope.err = err.error_msg;
                })





            }
        }
















    });
