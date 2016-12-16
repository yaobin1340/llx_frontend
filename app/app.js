angular.module( 'ohapp',
    [
        'ngResource',
        'ipCookie',
        'ui.router',
        'ui.bootstrap',
        'ohRoutes',
        'ohConfig',
    ]
)
.config( function config( $injector, $locationProvider)
{
    var $stateProvider = $injector.get( '$stateProvider' );
    var $urlRouterProvider = $injector.get( '$urlRouterProvider' );
    var $routesProvider = $injector.get( '$routesProvider' );
    var $httpProvider = $injector.get( '$httpProvider' );
    var $config = $injector.get('$configProvider').$get();


    $urlRouterProvider.otherwise( '/home' );

    $httpProvider.interceptors.push('AuthInterceptor')
    // $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
    //$httpProvider.defaults.withCredentials = true;

    $locationProvider.html5Mode(true).hashPrefix('!');

    var routes = $routesProvider.routes;

    angular.forEach( routes, function( value, key )
    {
        $stateProvider.state( key, routes[ key ] );
    });


    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for(name in obj) {
            value = obj[name];

            if(value instanceof Array) {
                for(i=0; i<value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value instanceof Object) {
                for(subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
})
.directive("scroll", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
            if (this.pageYOffset >= 60) {
                scope.showFloatMenu = true;
            } else {
                scope.showFloatMenu = false;
            }
            scope.$apply();
        });
    };
})
.run( function( $injector )
{
    var $rootScope = $injector.get( '$rootScope' );
    var $state = $injector.get( '$state' );
    var $stateParams = $injector.get( '$stateParams' );
    var $session = $injector.get('$session');
    $rootScope.$isLogin = false;

    if ($session.get('auth').authToken) {
        $rootScope.$isLogin = true;
    }

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
})
.filter('trustHtml', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
})
.filter('trustAsResourceUrl', function($sce) {
    return function(input) {
        return $sce.trustAsResourceUrl(input);
    };
})
.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
})
.animation('.slide', function() {
    var NG_HIDE_CLASS = 'ng-hide';
    return {
        beforeAddClass: function(element, className, done) {
            if(className === NG_HIDE_CLASS) {
                element.slideUp(done);
            }
        },
        removeClass: function(element, className, done) {
            if(className === NG_HIDE_CLASS) {
                element.hide().slideDown(done);
            }
        }
    };
}
)

