angular
    .module( 'ohapp' )
    .controller( 'OpinionCtrl', function OpinionCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
      
        $http
                .post($config.api_uri + '/Apiuser/Orderinfo/orderdetail',{order_id:$stateParams.order_id})
                .success(function (data) {
                    if(data.success){
                        $scope.Msg=data;
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })


    $scope.i=4;
      $scope.tijiao = function(){
        $http
                .post($config.api_uri + '/Apiuser/Orderinfo/dianping',{order_id:$stateParams.order_id,score:$scope.i,contents:$scope.contents,photos_path:$scope.pic})
                .success(function (data) {
                    if(data.success){
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

      //评价星星
      $(document).ready(function(){
        var stepW = 0.6;
        var stars = $("#star > li");
        $("#showb").css("width",0);
        stars.each(function(i){
        $(stars[i]).click(function(e){
                var n = i+1;
                $("#showb").css({"width":stepW*n+"rem"});
                $(this).find('a').blur();
                $scope.i=n;
                return stopDefault(e);
            });
        });
    });
        function stopDefault(e){
            if(e && e.preventDefault)
                   e.preventDefault();
            else
                   window.event.returnValue = false;
            return false;
        };

        //保存图片
        $scope.pic=[];
        function ajaxupload(data) {
            $http
                .post($config.api_uri + '/Apiuser/Orderinfo/save_dp_pic',{dp_pic:data})
                .success(function (data) {
                    if(data.success){
                        $scope.pic.push(data.pic_path);
                    }else{
                        $mdToast.show(
                        $mdToast.simple()
                            .content(data.error_msg)
                            .hideDelay(1000)
                        );
                    }
                })
    }

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
