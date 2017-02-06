angular
    .module( 'ohapp' )
    .controller( 'xiubiCtrl', function xiubiCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
    
// 注释信息
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;

        $scope.soso = function(){
            $scope.arr=[];
            $scope.page=1;
            $scope.leadMore()
            }

        $scope.leadMore =function(){
            $scope.beDate=$("#beginTime").val();
            $scope.endDate=$("#endTime").val();
            $scope.promise = $http
                    .post($config.api_uri + '/Apishop/Money/detail',{bg_date:$scope.beDate,end_date:$scope.endDate,page:$scope.page})
                    .success(function (data) {
                        if(data.success){
                            if(data.list==null||!data.list.length){
                                $scope.noLead=1;
                                return
                            }
                             var items = data.list;
                              for (var i = 0; i < items.length; i++) {
                                $scope.arr.push(items[i]);
                            }
                        }else{
                           $mdToast.show(
                            $mdToast.simple()
                                    .content(data.error_msg)
                                    .hideDelay(1000)
                            );
                        }
                    })
            }

    //滚动加载
        $(window).scroll(function(){
        　　var scrollTop = $(this).scrollTop();
        　　var scrollHeight = $(document).height();
        　　var windowHeight = $(this).height();
        　　if(scrollTop + windowHeight == scrollHeight){
        　　　　
                $scope.page++;$scope.leadMore();
        　　}
        });
















    });
