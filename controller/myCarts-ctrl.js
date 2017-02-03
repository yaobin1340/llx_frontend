angular
    .module( 'ohapp' )
    .controller( 'MycartCtrl', function MycartCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
        var i=0;
        if($stateParams.type=='noIndent'){
            $scope.chose1=0;$scope.chose2=1;$scope.chose3=0;
            noIndent();
        }else{
            $scope.chose1=1;$scope.chose2=0;$scope.chose3=0;
            allIndent();
        }

        $scope.chose = function(id){
            switch (id) {
                case 1 :
                $scope.chose1=1;$scope.chose2=0;$scope.chose3=0;
                allIndent();
                break;
                case 2 :
                $scope.chose1=0;$scope.chose2=1;$scope.chose3=0;
                noIndent();
                break;
                case 3 :
                $scope.chose1=0;$scope.chose2=0;$scope.chose3=1;
                Indented();
                break;
            }
        }

        function allIndent(){
            $scope.arr=[];
            $scope.page=1;
            i=0;
            $scope.aready='';
            leadMore($scope.aready);
            $(window).scroll(function(){
            　　var scrollTop = $(this).scrollTop();
            　　var scrollHeight = $(document).height();
            　　var windowHeight = $(this).height();
            　　if(scrollTop + windowHeight == scrollHeight){
            　　　　
                    $scope.page++;leadMore($scope.aready);
            　　}
            });
        }
        function noIndent(){
            $scope.arr=[];
            $scope.page=1;
            i=0;
            $scope.aready=1;
            leadMore($scope.aready);
            $(window).scroll(function(){
            　　var scrollTop = $(this).scrollTop();
            　　var scrollHeight = $(document).height();
            　　var windowHeight = $(this).height();
            　　if(scrollTop + windowHeight == scrollHeight){
            　　　　
                    $scope.page++;leadMore($scope.aready);
            　　}
            });
        }
        function Indented(){
            $scope.arr=[];
            $scope.page=1;
            i=0;
            $scope.aready=4;
            leadMore($scope.aready);
            $(window).scroll(function(){
            　　var scrollTop = $(this).scrollTop();
            　　var scrollHeight = $(document).height();
            　　var windowHeight = $(this).height();
            　　if(scrollTop + windowHeight == scrollHeight){
            　　　　
                    $scope.page++;leadMore($scope.aready);
            　　}
            });
        } 
        
        function leadMore (aready){
                    $http
                    .post($config.api_uri + '/Apiuser/Orderinfo/orderlist',{page:$scope.page,aready:aready})
                    .success(function (data) {
                        if(data.success){
                            if(data.order_list==null||!data.order_list.length){
                                $scope.noLead=1;
                                return
                            }
                            angular.forEach(data.order_list,function(item, index){
                                $scope.arr.push({orders:item,goods:[]})
                                angular.forEach(data.goods,function(items, indexs){
                                    if(item.order_id==items.order_id){
                                        $scope.arr[i].goods.push(items)
                                    }
                                })
                                i++;
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
