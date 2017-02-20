angular
    .module( 'ohapp' )
    .controller( 'shopdescAllCtrl', function shopdescAllCtrl( $scope, $injector, $rootScope,Evaluate,$stateParams) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');   
        
        $scope.scroll_switch = 1;
        $scope.evaluate = new Evaluate();
        $scope.evaluate.shop_id=$stateParams.shop_id;

        //点击图片放大
        $scope.checkImg = function(index,pic){
            var pics=[];
            for(var i=0;i<pic.length;i++){
                pics[i]='http://139.224.61.180:8080/attachs/'+pic[i];
            }
            wx.previewImage({
              current:pics[index],
              urls:pics,
            });
        }







    });
