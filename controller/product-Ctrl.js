angular
    .module( 'ohapp' )
    .controller( 'productCtrl', function productCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');



    //     $http
				// .get($config.api_uri + '/Apipublic/ApiPmall/getshops',{area_id : $scope.area_id,city_id : $scope.shop_id,order:1})
				// .success(function (data) {
				// 	$scope.cate_list = data.cate_list;
				// 	console.log(data);
				// })
				// .error(function (err) {
					
				// })





















    });
