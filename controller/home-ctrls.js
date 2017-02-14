angular
    .module( 'ohapp' )
    .controller( 'HomeCtrl', function HomeCtrl( $scope, $injector ) {
        var $http = $injector.get( '$http' );
        var $location = $injector.get('$location');
        var $state = $injector.get( '$state' );
        var $timeout = $injector.get( '$timeout' );
        var $config = $injector.get( '$config' );
        var $session = $injector.get('$session');
        var $mdDialog = $injector.get('$mdDialog');
        var $mdMedia = $injector.get('$mdMedia');
        var $mdToast = $injector.get('$mdToast');


        var userId = $session.get('auth')._id

        $scope.showDishModal = function(ev,dish,index) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            $http.get($config.api_uri + '/dishes/' + dish._id).then(function(response){
                if(jQuery.inArray($session.get('auth')._id, response.data.like) > -1){
                    response.data.isLike = true
                }else{
                    response.data.isLike = false
                }
                response.data.index = index
                $scope.dish = response.data
                $mdDialog.show({
                    scope: $scope,
                    preserveScope: true,
                    templateUrl: 'views/modals/dish.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true

                });
            });
        };

        $scope.showUserLikeListModal = function(ev,type) {
            $mdDialog.hide();
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

            if(type === 'following'){$scope.title = 'PEOPLE YOU FOLLOW'; }
            if(type === 'follower'){$scope.title = 'PEOPLE FOLLOWING YOU'; }
            if(type === 'userLike'){$scope.title = 'PEOPLE WHO LIKE THIS'; }
            if(type === 'addedToList'){$scope.title = 'PEOPLE WHO ADDED TO LIST'; }

            $mdDialog.show({
                locals:{
                    title: $scope.title,
                },
                scope: $scope,
                preserveScope: true,
                templateUrl: 'views/userList.tpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true
            });
        };

        $scope.showAddToLikeToast = function(ev, dishId, index){
            if($session.data.auth){
                $http.post($config.api_uri + '/user/' + userId + '/dish/' + dishId + '/like')
                    .success(function(response){
                        $scope.dishes[index]['isLike'] = true
                        if($scope.dish && $scope.dish._id === dishId){
                            $scope.dish.isLike = true
                        }

                        $mdToast.show(
                            $mdToast.simple()
                                .content('Dish added to like')
                                .action('UNDO')
                                .position('top right')
                                .hideDelay(2000)
                        ).then(function(response) {

                                if ( response == 'ok' ) {
                                    $scope.showUndoLike(ev, dishId, index)
                                }
                            });
                    })
                    .error(function(response){
                        $mdToast.show(
                            $mdToast.simple()
                                .content(response.error)
                                .position('top right')
                                .hideDelay(2000)
                        )
                    });
            }else{
                $mdToast.show(
                    $mdToast.simple()
                        .content('You need to signin first!')
                        .position('top right')
                        .hideDelay(2000)
                )
            }

        };

        $scope.showUndoLike = function(ev, dishId, index){
            if($session.data.auth){
                $http.post($config.api_uri + '/user/' + userId + '/dish/' + dishId + '/unlike')
                    .success(function(response){
                        $scope.dishes[index]['isLike'] = false
                        if($scope.dish && $scope.dish._id === dishId){
                            $scope.dish.isLike = false
                        }
                        $mdToast.show(
                            $mdToast.simple()
                                .content('Dish removed to like')
                                .position('top right')
                                .hideDelay(2000)
                        )
                    })
                    .error(function(response){
                        $mdToast.show(
                            $mdToast.simple()
                                .content(response.error)
                                .position('top right')
                                .hideDelay(2000)
                        )
                    });
            }else{
                $mdToast.show(
                    $mdToast.simple()
                        .content('You need to signin first!')
                        .position('top right')
                        .hideDelay(2000)
                )
            }
        };

        if($scope.dishes.length < 1){
            $scope.getDishes(40.77,-73.97);
        }

    });