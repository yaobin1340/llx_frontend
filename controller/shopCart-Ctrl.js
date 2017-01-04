angular
    .module( 'ohapp' )
    .controller( 'shopcartCtrl', function shopcartCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        $scope.items=[];
        $http
				.post($config.api_uri + '/Apiuser/cart/cart_list')
				.success(function (data) {
                    if(data.success){
                        $scope.cart_list=data.cart_list;
                    }else{
                        $scope.dialog={open: true};
                        $scope.err=data.error_msg;
                    }
				})
				.error(function (err) {
                    $scope.dialog={open: true};
					$scope.err = err.error_msg;
				})

            $scope.delect=function(id){
                console.log(id);
                $http
                .post($config.api_uri + '/Apiuser/cart/cartdel',{card_id:id,token:$session.get('auth').token})
                .success(function (data) {
                    if(data.success){
                        $scope.cart_list=data.cart_list;
                    }else{
                        $scope.dialog={open: true};
                        $scope.err=data.error_msg;
                    }
                })
                .error(function (err) {
                    $scope.dialog={open: true};
                    $scope.err = err.error_msg;
                })
            };
            $scope.goPay=function(){

                $rootScope.$page = 'SubmitOrder'
            };
     
            $scope.only_number = function(a) {
                var num=parseInt(a.replace(/\D/g, ''));
                if(num>=1){
                    $scope.num=num;
                }else{
                    $scope.num=1;
                }
            };
            $scope.remo=function(){
                if($scope.num>1){
                    $http
                        .post($config.api_uri + '/Apiuser/cart/cartedit',{card_id:16,token:$scope.token,num:$scope.num-1})
                        .success(function (data) {
                             if(data.success){
                                $scope.num--;
                             }else{
                                $scope.dialog={open: true};
                                $scope.err=data.error_msg;
                             }
                        })
                        .error(function (err) {
                          $scope.err = err.error_msg;
                        })
                }else{
                    return $scope.num=1;
                }
            }
            $scope.add=function(){
                $http
                .post($config.api_uri + '/Apiuser/cart/cartedit',{card_id:16,token:$scope.token,num:$scope.num+1})
                .success(function (data) {
                     if(data.success){
                        $scope.num++;
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
            $scope.totalPrice = function(){
                var total = 0;
                for ( var i = 0,len = $scope.items.length;i<len;i++) {
                    total += $scope . items [ i ]. price * $scope . items [ i ]. quantity;
                }
                return total ;
            }














    });
