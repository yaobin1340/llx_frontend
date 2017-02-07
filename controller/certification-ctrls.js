angular
    .module( 'ohapp' )
    .controller( 'certificationCtrl', function certificationCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

         //加载动画
        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.backdrop = true;
        $scope.promise = null;
        $scope.show=0;$scope.shows=0;
        //上传图片
                function ajaxupload(data,type) {
                        //保存图片地址，暂无数据
                        $scope.message = '正在上传图片...';
                        $scope.promise = $http
                            .post($config.api_uri + '/Apishop/Audit/uploadpic',{photo:data})
                            .success(function (data) {
                                if(data.success){
                                    if(type==1){
                                        $scope.photo = data.pic_path;
                                        $scope.show=1;
                                    }else if(type==2){
                                        $scope.pic = data.pic_path;
                                        $scope.shows=1;
                                    }
                                    
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
                        //调用后台，暂缺数据
                    $scope.message = '正在保存修改...'
                    $scope.promise = $http
                            .post($config.api_uri + '/Apishop/Audit',{photo:$scope.photo,name:$scope.name,zhucehao:$scope.zhucehao,addr:$scope.addr,pic:$scope.pic,zuzhidaima:$scope.zuzhidaima,end_date:$scope.end_date})
                            .success(function (data) {
                                if(data.success){
                                    $mdToast.show(
                                    $mdToast.simple()
                                        .content("添加成功")
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
                            ajaxupload(img.src,1);
                        }
                    });
                    $('#fileToUploads').localResizeIMG({
                        width: 300,
                        height: 300,
                        quality: 1,
                        success: function (result) {
                            var a=$("#img_input").val(result.base64);
                            img =new Image;
                            img.src = result.base64;
                            ajaxupload(img.src,2);
                        }
                    });
                });






    });
