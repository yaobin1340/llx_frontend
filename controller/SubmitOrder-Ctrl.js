angular
    .module( 'ohapp' )
    .controller( 'SubmitOrder', function SubmitOrder( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');



    //     $http
				// .get($config.api_uri + '/Apipublic/ApiPshop/goodsdetail',{goods_id:16})
				// .success(function (data) {
				// 	$scope.productMsg_list = data.detail;
				// 	$scope.productMsg=data;
				// 	console.log(data);
				// })
				// .error(function (err) {
					
				// })





















    });
