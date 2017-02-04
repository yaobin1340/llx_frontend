angular
    .module( 'ohapp' )
    .controller( 'choseAddressCtrl', function choseAddressCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');	

        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = '正在加载...';
        $scope.backdrop = true;
        $scope.promise = null;
        
        $scope.promise = $http
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

        $scope.province_code = function(privence){
            $scope.promise = $http.post($config.api_uri + '/Apipublic/ApiPmall/get_ncity',{province_code:privence})
                .success(function (data) {
                    if(data.success){
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

        $scope.choseNear = function(city){
            $scope.promise = $http.post($config.api_uri + '/Apipublic/ApiPmall/get_narea',{city_code:city})
                .success(function (data) {
                    if(data.success){
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

        $scope.toacrt = function(near){
            
        }
















    });
