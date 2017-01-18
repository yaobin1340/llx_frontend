angular
    .module( 'ohapp' )
    .controller( 'MaddressCtrl', function MaddressCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');	

$scope.page=1;
        $scope.load = function(){
            $http
                .post($config.api_uri + '/Apiuser/Adr/index',{page:$scope.page})
                .success(function (data) {
                    if(data.success){
                        $scope.address = data.addr;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );

                    }
                })
        }
        $scope.load();






        $scope.delect =  function(adrId){
            $http
                .post($config.api_uri + '/Apiuser/Adr/delete',{addr_id:adrId})
                .success(function (data) {
                    if(data.status=="success"){
                        $mdToast.show(
                                $mdToast.simple()
                                    .content(data.error_msg)
                                    .hideDelay(1000)
                                ); 
                        angular.forEach($scope.address,function(item, index){
                            if(item.addr_id==adrId){
                                $scope.address.splice(index, 1); 
                                return;
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
        }

        $scope.changeImg = function(addr){
            $http
                .post($config.api_uri + '/Apiuser/Adr/update_addr',{addr_id:addr})
                .success(function (data) {
                    if(data.success){
                        $http
                            .post($config.api_uri + '/Apiuser/Adr/index')
                            .success(function (data) {
                                if(data.success){
                                $scope.address = data.addr;
                                }else{
                                    window.history.go(0);
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
        }
















    });
