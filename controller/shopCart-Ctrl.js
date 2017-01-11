angular
    .module( 'ohapp' )
    .controller( 'shopcartCtrl', function shopcartCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        $scope.items=[];
        $http
				.post($config.api_uri + '/Apiuser/cart/cart_list')
				.success(function (data) {
                    if(data.success){
                        $scope.cart_list=data.cart_list;
                        console.log(data);
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
				})

            $scope.delect=function(id){
                $http
                .post($config.api_uri + '/Apiuser/cart/cartdel',{card_id:id})
                .success(function (data) {
                    if(data.success){
                        angular.forEach($scope.cart_list,function(item, index){
                            if(item.cart_id==id){
                                $scope.cart_list.splice(index, 1);
                                return;
                            }
                        })
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
            };
            $scope.goPay=function(){
                angular.forEach($scope.cart_list, function (item) {
                    $scope.items.push(item.cart_id);
                });
                $state.go('payment', {shopcartId: $scope.items});
            };
            
            // $scope.only_number = function(data) {
            //     num=a.replace(/\D/g,'');
            //     if(num>=1){
            //         $scope.num=num;
            //     }else{
            //         $scope.num=1;
            //     }
            // };
            $scope.remo=function(id){
                if(id.cart_num>1){
                    $http
                        .post($config.api_uri + '/Apiuser/cart/cartedit',{card_id:id.cart_id,num:id.cart_num-1})
                        .success(function (data) {
                             if(data.success){
                                id.cart_num--;
                             }else{
                                $mdToast.show(
                                $mdToast.simple()
                                    .content(data.error_msg)
                                    .hideDelay(1000)
                                );
                             }
                        })
                }else{
                    return id.cart_num=1;
                }
            }
            $scope.add=function(id){
                $http
                .post($config.api_uri + '/Apiuser/cart/cartedit',{card_id:id.cart_id,num:id.cart_num+1})
                .success(function (data) {
                     if(data.success){
                        id.cart_num++;
                     }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                     }
                })
            }
           $scope.getTotalAmount = function () {
                var totalAmount = 0;
                angular.forEach($scope.cart_list, function (item, index, array) {
                    totalAmount += parseInt(item.cart_num);  });
                    return (totalAmount>99?"99+":totalAmount);
             };
             $scope.getTotalPrice = function () {
                var totalPrice = 0;
                angular.forEach($scope.cart_list, function (item, index, array) {
                    totalPrice += item.mall_price * item.cart_num;  });
                    return totalPrice;
             };














    });
