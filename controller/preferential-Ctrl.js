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
            $http
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
                                $("#qrcode").html("");
                                $scope.fenxiao=1;
                                new QRCode(document.getElementById('qrcode'), $scope.url);
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
