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
				.post($config.api_uri + '/Apiuser/cart/cart_list',{token:$scope.token})
				.success(function (data) {
					$scope.cart_list=data.cart_list;
                    $scope.num=data.cart_list.cart_num;
				})
				.error(function (err) {
					
				})


            $scope.delect=function(){
                $http
                .post($config.api_uri + '/Apiuser/cart/cartdel',{card_id:$scope.card_id})
                .success(function (data) {

                    data.cart_list.cart_id.splice(card_id,1);

                })
                .error(function (err) {
                    
                })
            };
            $scope.goPay=function(ev){
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                $mdDialog.show({
                controller: 'SubmitOrder',
                templateUrl: 'views/SubmitOrder.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
                });
                $rootScope.$page = 'SubmitOrder'
            };
     
            $scope.only_number = function(a) {
                $scope.num = a.replace(/\D/g, '');
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
