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
                $scope.baseMsg = function (){
                    console.log($("#addr").val());
                    $http
                        .post($config.api_uri+'/Apishop/ApiSmall/save_about',{addr:$("#addr").val(),contact:$("#personal").val(),tel:$("#tel").val(),business_time:$("#times").val()})
                        .success(function (data) {
                            console.log(data);
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
                        console.log(data);
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

            $scope.delect=function(){
                $http
                    .post($config.api_uri+'/Apishop/ApiSmall/photo_delete')
                    .success(function (data) {
                        console.log(data);
                        if(data.success){
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
