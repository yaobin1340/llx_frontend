angular
    .module( 'ohapp' )
    .controller( 'addAddressCtrl', function addAddressCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
        $scope.add=0;


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
                        $scope.privence=privence;
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
                        $scope.city=city;
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
            $scope.near=near;
        }
    }
    $scope.chosedefault=0;
    $scope.choseImg = function(){
        $scope.chosedefault=!$scope.chosedefault;
    }
    $scope.submitAdd = function(){
        if($scope.chosedefault){
            $scope.isdefault=1
        }else{
            $scope.isdefault=0
        }
        $http.post($config.api_uri + '/Apiuser/Adr/add_addr',{name:$scope.shoup,city_code:$scope.city,area_code:$scope.near,province_code:$scope.privence,mobile:$scope.shoutel,addr:$scope.shoutear,default:$scope.isdefault})
                .success(function (data) {
                    if(data.status=='success'){
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                        window.history.go(-1);
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
