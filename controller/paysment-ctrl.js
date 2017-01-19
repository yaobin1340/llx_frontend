angular
    .module( 'ohapp' )
    .controller( 'paysmentCtrl', function paysmentCtrl( $scope, $injector, $rootScope,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');

        $scope.order_id=$session.get('order_id');
        $scope.need_pay=$session.get('need_pay');
        $scope.log_id=$session.get('log_id');

        $scope.zhifu = function(){
            console.log("开始请求测试区")
            // 测试区域
                $http
                .post($config.api_uri +'/Apipublic/WxPay/aj_openid')
                .success(function (data) {
                    console.log(data);
                })  
        }
            // 测试区域
            console.log("开始请求")
        function chosepay(){
                $http
                .post($config.api_uri+'/Apipublic/WxPay/aj_pay',{log_id:$scope.log_id,openid:data.openid})
                .success(function (data) {
                    console.log(data);
                    if(data.success){
                        alert("请求成功")
                        $scope.data=data.result.parameters;
                        zhifu();
                    }else{
                       $mdToast.show(
                        $mdToast.simple()
                            .content("请求失败")
                            .hideDelay(1000)
                        );
                    }
                })
            }    
        }
        function zhifu(){
            //支付
            alert("开始支付")
            wx.chooseWXPay({
                timestamp: data.wxtimestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: data.wxnonceStr, // 支付签名随机串，不长于 32 位
                package: data.wxpackage, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: data.wxsignType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: data.wxpaySign, // 支付签名
                success: function (res) {
                    // 支付成功后的回调函数
                   console.log(res+"支付成功") 
                }
            })
        }
    function wxConfig(){
        $.getJSON($config.api_uri +'/Apipublic/Apilogin/get_wxconfig',function(data){
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.wxappId, // 必填，公众号的唯一标识
                timestamp: data.wxtimestamp, // 必填，生成签名的时间戳
                nonceStr: data.wxnonceStr, // 必填，生成签名的随机串
                signature: data.wxsignature,// 必填，签名，见附录1
                jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

        });
    }















    });
