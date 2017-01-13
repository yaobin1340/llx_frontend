angular
    .module( 'ohapp' )
    .controller( 'chaAddressCtrl', function chaAddressCtrl( $scope, $injector, $rootScope,$stateParams) {
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


        $http
                .post($config.api_uri + '/Apiuser/Adr/index')
                .success(function (data) {
                    if(data.success){
                        angular.forEach(data.addr,function(item, index){
                            if(item.addr_id==$stateParams.addr_id){
                                $scope.adr=item;
                                $scope.shoup=item.name;
                                $scope.shoutel=item.mobile;
                                $scope.p=item.province_name;
                                $scope.c=item.city_name;
                                $scope.n=item.area_name;
                                $scope.shoutear=item.addr;
                                $scope.chosedefault=item.is_default;
                                $scope.privence=item.province_code;
                                $scope.city=item.city_code;
                                $scope.near=item.area_code;
                            }
                        })
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })

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
        }
    }

    $scope.choseImg = function(){
        $scope.chosedefault==0?$scope.chosedefault=1:$scope.chosedefault=0;
    }

    $scope.baocun = function(){
        $http.post($config.api_uri + '/Apiuser/Adr/edit_addr',{addr_id:$stateParams.addr_id,name:$scope.shoup,city_code:$scope.city,area_code:$scope.near,province_code:$scope.privence,mobile:$scope.shoutel,addr:$scope.shoutear,default:$scope.chosedefault})
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

   $scope.deladdr =  function(){
       $http.post($config.api_uri + '/Apiuser/Adr/delete',{addr_id:$stateParams.addr_id})
                .success(function (data) {
                    if(data.status=="success"){
                        window.history.go(-1);
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
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
