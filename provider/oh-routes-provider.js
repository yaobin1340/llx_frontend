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
        url: '^/home',
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
        url : '/description?shop_id',
        templateUrl : 'views/descriptionProducts.html',
        controller:'descriptionCrtl'
    };
    this.routes['smallShop'] = {
        url : '/smallShop?shop_id',
        templateUrl : 'views/smallShop.html',
        controller:'smallShopCrtl'
    };
    this.routes['product'] = {
        url : '/product?goods_id',
        templateUrl : 'views/product.html',
        controller:'productCtrl'
    };
    this.routes['shopcart'] = {
        url : '/shopcart?message',
        templateUrl : 'views/shopCart.html',
        controller:'shopcartCtrl'
    };
    this.routes['SubmitOrder'] = {
        url : '/SubmitOrder',
        templateUrl : 'views/SubmitOrder.html',
        controller:'SubmitOrder'
    };
    this.routes['payment'] = {
        url : '/payment',
        templateUrl : 'views/payment.html',
        controller:'paymentCtrl'
    };
    this.routes['main.personal'] = {
        url : '^/personal',
        templateUrl : 'views/personal.html',
        controller:'personalCtrl'
    };
     this.routes['applyCash'] = {
        url : '/applyCash',
        templateUrl : 'views/applyCash.html',
        controller:'applyCashCtrl'
    };
    this.routes['Account'] = {
        url : '/Account',
        templateUrl : 'views/Account.html',
        controller:'AccountCtrl'
    };
    this.routes['changePwd'] = {
        url : '/changePwd',
        templateUrl : 'views/changePwd.html',
        controller:'changePwdCtrl'
    };
    
    this.$get = function()
    {
        return( this.routes );
    };
}
);
