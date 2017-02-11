angular
    .module( 'ohapp' )
    .controller( 'codeCtrl', function codeCtrl( $scope, $injector, $rootScope) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config2' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');
        if(!GetRequest().code){
                var redirect_url = 'http://llx.51loveshow.com/code';
                location.href =  "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0d70247bb52ac37e&redirect_uri="+encodeURIComponent(redirect_url)+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
            }else{
                $http({
                    method: 'POST',
                    url: 'http://be.51loveshow.com/Apipublic/WxPay/get_openidbycode',
                    data:{code:GetRequest().code}
                }).success(function (data) {
                    sessionStorage.setItem('code',data.openid);
                    $state.go("payment");
                })
        }


        function GetRequest() {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }















    });
