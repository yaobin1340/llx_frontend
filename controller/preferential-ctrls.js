angular
    .module( 'ohapp' )
    .controller( 'preferentialCtrl', function preferentialCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
        $scope.fenxiao=0;
        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
            $scope.promise = $http
                .post($config.api_uri + '/Apiuser/Yhk/index')
                .success(function (data) {
                    if(data.success){
                        $scope.yhk = data.yhk;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })


                $scope.preferential = function(id){
                    $http
                        .post($config.api_uri + '/Apiuser/Yhk/share',{shop_id:id})
                        .success(function (data) {
                            if(data.success){
                                $scope.url = data.url;
                                $mdDialog.show({
                                    scope: $scope,
                                    preserveScope: true,
                                    templateUrl: 'views/erweima.html',
                                    parent: angular.element(document.body),
                                    clickOutsideToClose: true,
                                    fullscreen: true
                                });
                                var timer = setInterval(function(){
                                    if($("#qrcode").html()!=undefined){
                                        new QRCode(document.getElementById('qrcode'),'http://llx.51loveshow.com/preCode?shop_id='+id+"&img_url="+$scope.url);
                                         clearInterval(timer);
                                    }
                                  },1000)
                            }else{
                                $mdToast.show(
                                $mdToast.simple()
                                    .content(data.error_msg)
                                    .hideDelay(1000)
                                );
                            }
                        })
                }
                $scope.closeDialog = function(){
                    $mdDialog.hide();
                }















    });
