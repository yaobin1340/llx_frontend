angular
.module( 'ohRoutes', [] )
.provider( '$routes', function $routesProvider()
{
    this.routes = {};

    this.routes['main'] = {
        url: '/',
        abstract: true,
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    };

    this.routes[ 'main.home' ] =
    {
        url: 'home',
        title: 'Home',
        templateUrl: 'views/restaurants.html',
        controller: 'RestaurantCtrl'
    };


    this.routes['signin'] = {
        url : '/signin',
        templateUrl : 'views/signin.html',
        controller : 'SigninSignupCtrl'
    };

    this.routes['signup'] = {
        url : '/signup',
        templateUrl : 'views/signup.html',
        controller : 'SigninSignupCtrl'
    };

    this.routes['forgot'] = {
        url : '/forgot',
        templateUrl : 'views/forgot-password.html',
        controller:'forgotCtrl'
    };
     this.routes['description'] = {
        url : '/description',
        templateUrl : 'views/descriptionProducts.html',
        controller:'descriptionCrtl'
    };
    this.routes['smallShop'] = {
        url : '/smallShop',
        templateUrl : 'views/smallShop.html',
        controller:'smallShopCrtl'
    };
    this.routes['product'] = {
        url : '/product',
        templateUrl : 'views/product.html',
        controller:'productCtrl'
    };
    this.$get = function()
    {
        return( this.routes );
    };
}
);
