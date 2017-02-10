angular
    .module( 'ohapp' )
    .controller( 'noIndentCtrl', function noIndentCtrl( $scope, $injector, $rootScope,CartIndent,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');   
        
        $scope.scroll_switch = 1;
        $scope.cartIndent = new CartIndent();
        $scope.cartIndent.aready=1;

        $scope.delect = function(id){
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Orderinfo/order_del',{order_id:id})
                .success(function (data) {
                    if(data.success){
                        angular.forEach($scope.cartIndent.items,function(item, index){
                            if(item.orders.order_id==id){
                                $scope.cartIndent.items.splice(index,1);
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
        }



    });
