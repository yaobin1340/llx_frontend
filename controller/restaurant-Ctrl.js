angular
    .module( 'ohapp' )
    .controller( 'RestaurantCtrl', function RestaurantCtrl( $scope, $injector, $rootScope, Shops) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

		$scope.currentPage = 0;
        $scope.scroll_switch = 1;
        $scope.shops = new Shops();
        $scope.shops.busy = true;
        $scope.shops.lat = '';
        $scope.shops.lng = '';
        $scope.isReady = false;

        // $scope.$on('$viewContentLoaded', function() {
        //     window.wxConfig();
        // });
        //获取经纬度所在地区
        $scope.getIndex = function(){
            $http({
                method: 'POST',
                url: $config.api_uri + '/Apipublic/ApiPmall/getshops',
                data: {lat:$scope.shops.lat,lng:$scope.shops.lng}
            }).success(function (data) {
                if (data.success) {
                    $scope.area_name = data.area_name;
                    $scope.shops.area_code = data.area_code;
                    $scope.shops.busy = false;
                    $scope.shops.nextPage()
                } else {
                    $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(2000)
                    );
                }

            })
        }




		$scope.choseAdd = function(){
        $scope.add=1;
        $http
                .post($config.api_uri + '/Apipublic/ApiPmall/get_nprovince')
                .success(function (data) {
                    if(data.success){
                        $scope.add_p = data.province_list;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })

        $scope.province_code = function(privence,ap){
            $http.post($config.api_uri + '/Apipublic/ApiPmall/get_ncity',{province_code:privence})
                .success(function (data) {
                    if(data.success){
                        $scope.p=ap;
                        $scope.add_p=[];
                        $scope.add_c = data.city_list;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        }

        $scope.choseNear = function(city,ac){
            $http.post($config.api_uri + '/Apipublic/ApiPmall/get_narea',{city_code:city})
                .success(function (data) {
                    if(data.success){
                        $scope.c=ac;
                        $scope.add_p=[];
                        $scope.add_c=[];
                        $scope.add_near=data.area_list;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
        }

        $scope.toacrt = function(near,an){
            $scope.add=0;
            $scope.n=an;
            $scope.shops.area_code =near;
            $scope.area_name = an;
            $scope.shops.items = [];
            $scope.shops.end = false;
            $scope.shops.busy = false;
            $scope.shops.page = 1;
            $scope.shops.nextPage();
        }
    }
			 















    });
