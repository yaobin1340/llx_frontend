angular
    .module( 'ohapp' )
    .controller( 'updataTotalCtrl', function updataTotalCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
	
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
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
    }
    $('.now-change').click(function(){
            $http
                .post($config.api_uri + '/Apiuser/Userinfo/changeface',{face:$scope.face})
                .success(function (data) {
                    if(data.success){
                        $mdToast.show(
                        $mdToast.simple()
                            .content("修改成功")
                            .hideDelay(1000)
                        );
                        $scope.show=true;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
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
