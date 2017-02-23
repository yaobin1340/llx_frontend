angular
    .module( 'ohapp' )
    .controller( 'likeShopCtrl', function likeShopCtrl( $scope, $injector, $rootScope,loveShop) {
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
        $scope.loveshop = new loveShop();
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在删除...';
        $scope.backdrop = true;
        $scope.promise = null;

        $scope.delect = function(id){
            console.log(id);
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Sc/del_sc_fd',{scf_id:id})
                .success(function (data) {
                    if(data.success){
                        angular.forEach($scope.loveshop.items,function(item, index){
                                if(item.scf_id==id){
                                    $scope.loveshop.items.splice(index, 1);
                                    return;
                                }
                            });
                        $mdToast.show(
                        $mdToast.simple()
                            .content("删除成功")
                            .hideDelay(1000)
                        );
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        };














    });
