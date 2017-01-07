angular
    .module( 'ohapp' )
    .controller( 'updataTotalCtrl', function updataTotalCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');

	
        $scope.show=true;
        $scope.face=$session.get("face");
    function ajaxupload(data) {
            $http
                .post($config.api_uri + '/Apiuser/Userinfo/upload1',{face:data})
                .success(function (data) {
                    if(data.success){
                        $scope.face = data.face;
                        $scope.show=false;
                    }else{
                        $scope.dialog={open: true};
                        $scope.err=data.error_msg;
                    }
                })
                .error(function (err) {
                    $scope.dialog={open: true};
                    $scope.err = err.error_msg;
                })
    }
    $('.now-change').click(function(){
            $http
                .post($config.api_uri + '/Apiuser/Userinfo/changeface',{face:$scope.face})
                .success(function (data) {
                    if(data.success){
                        $scope.dialog={open: true};
                        $scope.err="修改成功"
                        $scope.show=true;
                    }else{
                        $scope.dialog={open: true};
                        $scope.err=data.error_msg;
                    }
                })
                .error(function (err) {
                    $scope.dialog={open: true};
                    $scope.err = err.error_msg;
                })
    })

    $(document).ready(function () {
        var img;
        $('#fileToUpload').localResizeIMG({
            width: 300,
            height: 300,
            quality: 1,
            success: function (result) {
                var a=$("#img_input").val(result.base64);
                img =new Image;
                img.src = result.base64;
                ajaxupload(img.src);
            }
        });
    });














    });
