angular
    .module( 'ohapp' )
    .controller( 'addEnvironmentCtrl', function addEnvironmentCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        $scope.show=0;
        //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.backdrop = true;
        $scope.promise = null;
        //上传图片
                function ajaxupload(data) {
                    $scope.message = '正在上传图片...';
                        $scope.promise = $http
                            .post($config.api_uri + '/Apishop/ApiSmall/upload',{shop_pic:data})
                            .success(function (data) {
                                console.log(data);
                                if(data.success){
                                    $scope.shop_pic = data.path;
                                    $scope.show=1;
                                }else{
                                    $mdToast.show(
                                    $mdToast.simple()
                                        .content(data.error_msg)
                                        .hideDelay(1000)
                                    );
                                }
                            })
                };
                $scope.choseAdd = function(){
                    $scope.message = '正在添加图片...';
                    $scope.promise = $http
                            .post($config.api_uri + '/Apishop/ApiSmall/add_shop_pic',{title:$("#title").val(),photo:$scope.shop_pic,orderby:$("#orderby").val()})
                            .success(function (data) {
                                if(data.success){
                                    $mdToast.show(
                                    $mdToast.simple()
                                        .content("添加成功")
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
