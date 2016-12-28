angular
    .module( 'ohapp' )
    .controller( 'shopcartCtrl', function shopcartCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');

        
        $http
				.post($config.api_uri + '/Apiuser/cart/cart_list',{token:'jYqEe46caKuB0H7Ls4WJmrCjyauHmoxmhKl1oQ=='})
				.success(function (data) {
                    if(data.success){
                        $scope.cart_list=data.cart_list;
                    }
					
                    console.log(data);
				})
				.error(function (err) {
					
				})

            $scope.delect=function(id){
                $http
                .post($config.api_uri + '/Apiuser/cart/cartdel',{card_id:id,token:"jYqEe46caKuB0H7Ls4WJmrCjyauHhISthJl1oQ=="})
                .success(function (data) {
                    if(data.success){
                        $scope.cart_list=data.cart_list;
                    }
                })
                .error(function (err) {
                    
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
                                console.log("修改失败");
                             }
                        })
                        .error(function (err) {
                          console.log("修改失败");
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
                        console.log("修改失败");
                     }
                })
                .error(function (err) {
                    console.log("修改失败");
                })
            }
















    });
