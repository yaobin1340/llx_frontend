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
		var $mdDialog = $injector.get('$mdDialog');
		var $mdMedia = $injector.get('$mdMedia');
		var $mdToast = $injector.get('$mdToast');

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
						$session.set('phone', $scope.user.mobile)
						$session.save()
						$rootScope.firstName = data.firstName
						$rootScope.lastName = data.lastName
						$state.go('main.personal');
					}else{
						$mdToast.show(
						$mdToast.simple()
							.content(data.error_msg)
							.hideDelay(1000)
					);
					}
				})
		}

		$scope.getCard=function(){
			if(!(/^1[34578]\d{9}$/.test($(".phone").val()))){
				$mdToast.show(
					$mdToast.simple()
							.content("您的手机号输入有误")
							.hideDelay(1000)
					);
				return;
			}
			$http
				.post($config.api_uri + '/Apipublic/Apilogin/get_yzm',{mobile:$scope.user.mobile})
				.success(function (data) {
					if(data.success){
						$rootScope.$isLogin = true;
						$session.set('auth', data)
						$session.set('phone', $scope.user.mobile)
						$session.save()
						$rootScope.firstName = data.firstName
						$rootScope.lastName = data.lastName
						$mdDialog.hide();
						$scope.yzm=data.yzm;
					}else{
						$mdToast.show(
						$mdToast.simple()
							.content(data.error_msg)
							.hideDelay(1000)
						);
					}
				})
		}
		$scope.signup = function () {
			if($scope.yzm!=$scope.cards){
				$mdToast.show(
					$mdToast.simple()
							.content('验证码输入错误')
							.hideDelay(1000)
					);
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
				.post($config.api_uri + '/Apipublic/Apilogin/save_user',{mobile:$scope.user.mobile,password:$scope.pwd1})
				.success(function (data) {
					if(data.success){
						$rootScope.$isLogin = true;
						$session.set('auth', data)
						$session.set('phone', $scope.user.mobile)
						$session.save()
						$rootScope.firstName = data.firstName
						$rootScope.lastName = data.lastName
						$mdDialog.hide();
					}else{
						$mdToast.show(
						$mdToast.simple()
							.content(data.error_msg)
							.hideDelay(1000)
						);
					}
					
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