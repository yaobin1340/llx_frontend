angular
    .module( 'ohapp' )
    .controller( 'shopdescCtrl', function shopdescCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');   

        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;

            $scope.promise = $http
                .post($config.api_uri + '/Apipublic/ApiPshop/shopDianPing',{shop_id:$stateParams.shop_id})
                .success(function (data) {
                    if(data.success){
                        $scope.items=data.list;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })

        //点击图片放大
        $scope.checkImg = function(index,pic){
            var pics=[];
            for(var i=0;i<pic.length;i++){
                pics[i]='http://139.224.61.180:8080/attachs/'+pic[i];
            }
            wx.previewImage({
              current:pics[index],
              urls:pics,
            });
        }







    });
