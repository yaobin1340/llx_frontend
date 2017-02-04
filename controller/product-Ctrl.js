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

            var currIndex = 0;
            $scope.myInterval = 4000;
            var slides = $scope.slides = [];
        $scope.good_id=$stateParams.goods_id;
        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
        
        $scope.promise = $http
				.post($config.api_uri + '/Apipublic/ApiPshop/goodsdetail',{goods_id:$stateParams.goods_id})
				.success(function (data) {
                    if(data.success){
                        $scope.productMsg_list = data.detail;
                        $scope.slide=data.pics;
                        angular.forEach(
                            $scope.slide, function (item, index) {
                            slides.push({image:item.photo,id:currIndex++})}
                        )
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
            $http
                .post($config.api_uri + '/Apiuser/cart/cartadd',{goods_id:$stateParams.goods_id})
                .success(function (data) {
                    if(data.success){
                       $mdToast.show(
                        $mdToast.simple()
                            .content("加入购物车成功")
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
        }

        $scope.love = function(){
            $http
                .post($config.api_uri + '/Apiuser/Favourite/goods_favourites',{goods_id:$stateParams.goods_id})
                .success(function (data) {
                    if(data.success){
                       $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
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
        }

        $scope.gopay = function(id){
            $http
                .post($config.api_uri + '/Apiuser/cart/cartadd',{goods_id:id})
                .success(function (data) {
                    if(data.success){
                       $state.go('shopcart')
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
