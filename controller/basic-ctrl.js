angular
    .module( 'ohapp' )
    .controller( 'basicCtrl', function basicCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
        $scope.chose1=1;$scope.chose2=0;
        $scope.chose = function(id){
                switch (id) {
                    case 1 :
                    $scope.chose1=1;$scope.chose2=0;
                    break;
                    case 2 :
                    $scope.chose1=0;$scope.chose2=1;
                    anImg();
                    break;
                }
            }
            //获取信息
            $http
                    .post($config.api_uri+'/Apishop/ApiSmall/index')
                    .success(function (data) {
                        if(data.success){
                            $scope.shopdata=data;
                        }else{
                           $mdToast.show(
                            $mdToast.simple()
                                .content(data.error_msg)
                                .hideDelay(1000)
                            );
                        }
                    })



                $scope.baseMsg = function (){
                    $http
                        .post($config.api_uri+'/Apishop/ApiSmall/save_about',{addr:$scope.shopdata.shop_info.addr,contact:$scope.shopdata.shop_info.contact,tel:$scope.shopdata.shop_info.tel,business_time:$scope.shopdata.shop_detail.business_time})
                        .success(function (data) {
                            if(data.success){
                                $mdToast.show(
                                $mdToast.simple()
                                    .content("保存成功")
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
            

            function anImg (){
                $http
                    .post($config.api_uri+'/Apishop/ApiSmall/photo')
                    .success(function (data) {
                        if(data.success){
                            $scope.shop_pics=data.shop_pics;
                        }else{
                           $mdToast.show(
                            $mdToast.simple()
                                .content(data.error_msg)
                                .hideDelay(1000)
                            );
                        }
                    })
            }

            $scope.delect=function(id){
                $http
                    .post($config.api_uri+'/Apishop/ApiSmall/photo_delete',{pic_id:id})
                    .success(function (data) {
                        if(data.success){
                            angular.forEach($scope.shop_pics,function(item, index){
                                if(item.pic_id==id){
                                    $scope.shop_pics.splice(index, 1);
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
            }





    });
