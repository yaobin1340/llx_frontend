angular
    .module( 'ohapp' )
    .controller( 'MycartCtrl', function MycartCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
        
		$scope.chose1=1;$scope.chose2=0;$scope.chose3=0;
        allIndent();

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
            leadMore();
            $(window).scroll(function(){
            　　var scrollTop = $(this).scrollTop();
            　　var scrollHeight = $(document).height();
            　　var windowHeight = $(this).height();
            　　if(scrollTop + windowHeight == scrollHeight){
            　　　　
                    $scope.page++;leadMore();
            　　}
            });
        }
        function noIndent(){
            $scope.arr=[];
            $scope.page=1;
            leadMore(1);
            $(window).scroll(function(){
            　　var scrollTop = $(this).scrollTop();
            　　var scrollHeight = $(document).height();
            　　var windowHeight = $(this).height();
            　　if(scrollTop + windowHeight == scrollHeight){
            　　　　
                    $scope.page++;leadMore(1);
            　　}
            });
        }
        function Indented(){
            $scope.arr=[];
            $scope.page=1;
            leadMore(4);
            $(window).scroll(function(){
            　　var scrollTop = $(this).scrollTop();
            　　var scrollHeight = $(document).height();
            　　var windowHeight = $(this).height();
            　　if(scrollTop + windowHeight == scrollHeight){
            　　　　
                    $scope.page++;leadMore(4);
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
                             var items = data.order_list;
                             var goods = data.goods;
                              for (var i = 0; i < items.length; i++) {
                                var obj = Object.assign(items[i],goods[i])
                                $scope.arr.push(obj);
                            }
                        }else{
                            $mdToast.show(
                            $mdToast.simple()
                                .content(data.error_msg)
                                .hideDelay(1000)
                            );
                        }
                    })
        }

$(window).scroll(function(){
　　var scrollTop = $(this).scrollTop();
　　var scrollHeight = $(document).height();
　　var windowHeight = $(this).height();
　　if(scrollTop + windowHeight == scrollHeight){
　　　　
        $scope.page++;leadMore();
　　}
});










    });
