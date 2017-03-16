angular
.module( 'ohapp' )
.controller( 'shenheCtrl', function shenheCtrl( $scope, $injector, $rootScope,$stateParams) {
    var $http = $injector.get( '$http' );
    var $location = $injector.get('$location');
    var $state = $injector.get( '$state' );
    var $timeout = $injector.get( '$timeout' );
    var $config = $injector.get( '$config2' );
    var $session = $injector.get('$session');
    var $mdDialog = $injector.get('$mdDialog');
    var $mdMedia = $injector.get('$mdMedia');
    var $mdToast = $injector.get('$mdToast');



        $scope.promise = $http
            .post( 'http://be.51loveshow.com/Apipublic/WxPay/aj_transfers',{openid:$stateParams.id,amount:$stateParams.amount,re_user_name:$stateParams.name})
            .success(function (datas) {
                if(datas.success){
                    $mdToast.show(
                        $mdToast.simple()
                        .content("微信提现成功")
                        .hideDelay(1000)
                        );
                    location.href = 'http://llx.51loveshow.com/weichart&type='+'1';
                }else{
                    $mdToast.show(
                        $mdToast.simple()
                        .content(datas.error_msg)
                        .hideDelay(100000)
                        );
                    location.href = 'http://llx.51loveshow.com/weichart';
                }
            })















    });
