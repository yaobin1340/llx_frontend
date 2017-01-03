angular
	.module( 'ohapp' )
	.controller( 'SigninSignupCtrl', function SigninSignupCtrl( $scope, $injector, $rootScope) {
		var $http = $injector.get( '$http' );
		var $config = $injector.get( '$config' );
		var $timeout = $injector.get( '$timeout' );
		var $state = $injector.get( '$state' );
		var $session = $injector.get('$session');
		var $window = $injector.get('$window')
		var $location = $injector.get('$location');

		$scope.page = $rootScope.$page

		$scope.passwordSignin = function (e) {
			if (undefined !== e && 13 !== e.which) return;
			if(!$scope.signinForm['emailAddress'].$valid){
				$scope.signinForm.emailAddress.$touched = true
				return;
			}

			if(!$scope.signinForm['password'].$valid){
				$scope.signinForm.password.$touched = true
				return;
			}

			$scope.signin();
		};

		$scope.signin = function () {
			$http
				.post($config.api_uri + '/Apipublic/Apilogin/login_name_pw',{mobile:$scope.user.mobile,password:$scope.user.password})
				.success(function (data) {
					if(data.success){
						$rootScope.$isLogin = true;
						$session.set('auth', data)
						$session.save()
						$rootScope.firstName = data.firstName
						$rootScope.lastName = data.lastName
						// $mdDialog.hide();
						$state.go('main.personal');
					}else{
						$scope.dialog={open: true};
                        $scope.err=data.error_msg;
					}
				})
				.error(function (data) {
					$scope.dialog={open: true};
					$scope.err = err.error_msg;
				})
		}

		$scope.getCard=function(){
			$http
				.post($config.api_uri + '/Apipublic/Apilogin/get_yzm',{mobile:$scope.user.mobile})
				.success(function (data) {
					if(data.success){
						$rootScope.$isLogin = true;
						$session.set('auth', data)
						$session.save()
						$rootScope.firstName = data.firstName
						$rootScope.lastName = data.lastName
						// $mdDialog.hide();
						$scope.yzm=data.yzm;
					}else{
						$scope.dialog={open: true};
                        $scope.err=data.error_msg;
					}
					
				})
				.error(function (data) {
					$scope.dialog={open: true};
					$scope.err = err.error_msg;
				})
		}
		$scope.signup = function () {
			if($scope.yzm!=$scope.cards){
				console.log("验证码输入错误")
				return;
			}
			// if(!$scope.signupForm['firstName'].$valid){
			// 	$scope.signupForm.firstName.$touched = true
			// 	return;
			// }
			// if(!$scope.signupForm['lastName'].$valid){
			// 	$scope.signupForm.lastName.$touched = true
			// 	return;
			// }
			// if(!$scope.signupForm['emailAddress'].$valid){
			// 	$scope.signupForm.emailAddress.$touched = true
			// 	return;
			// }
			// if(!$scope.signupForm['password'].$valid){
			// 	$scope.signupForm.password.$touched = true
			// 	return;
			// }

			$http
				.post($config.api_uri + '/Apipublic/Apilogin/save_user',{mobile:$scope.user.mobile,password:$scope.user.password})
				.success(function (data) {
					if(data.success){
						$rootScope.$isLogin = true;
						$session.set('auth', data)
						$session.save()
						$rootScope.firstName = data.firstName
						$rootScope.lastName = data.lastName
						// $mdDialog.hide();
					}else{
						$scope.dialog={open: true};
                        $scope.err=data.error_msg;
					}
					
				})
				.error(function (data) {
					$scope.dialog={open: true};
					$scope.err = err.error_msg;
				})
		}

		$scope.showSignin = function(ev) {
			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
			$mdDialog.show({
				controller: 'SigninSignupCtrl',
				templateUrl: 'views/modals/signin-signup.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
				fullscreen: useFullScreen
			});
			$rootScope.$page = 'signIn'
		}

		$scope.showSignup = function(ev) {
			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
			$mdDialog.show({
				controller: 'SigninSignupCtrl',
				templateUrl: 'views/modals/signin-signup.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
				fullscreen: useFullScreen
			});
			$rootScope.$page = 'signUp'
		}

		$scope.forgotPassword = function(ev) {
			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
			$mdDialog.show({
				controller: 'SigninSignupCtrl',
				templateUrl: 'views/modals/signin-signup.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
				fullscreen: useFullScreen
			});
			$rootScope.$page = 'forgotPassword'
		}

	});