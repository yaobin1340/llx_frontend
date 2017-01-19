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
// 修改调试
    this.routes[ 'main.home' ] =
    {
        url: '^/home',
        title: 'Home',
        templateUrl: 'views/home.html',
        controller: 'HomesCtrl'
    };
    this.routes['main.OfferPay'] = {
        url : '^/OfferPay',
        templateUrl : 'views/OfferPay.html',
        controller:'OfferPayCtrl'
    };
    this.routes['main.information'] = {
        url : '^/information',
        templateUrl : 'views/information.html',
        controller:'informationCtrl'
    };
    this.routes['main.personal'] = {
        url : '^/personal',
        templateUrl : 'views/personal.html',
        controller:'personalCtrl'
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
        url : '/SubmitOrder?goods_id,order_id',
        templateUrl : 'views/SubmitOrder.html',
        controller:'SubmitOrder'
    };
    // 修改调试
    this.routes['payment'] = {
        url : '/payment',
        templateUrl : 'views/payment.html',
        controller:'paysmentCtrl'
    };
     this.routes['applyCash'] = {
        url : '/applyCash?type',
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
    this.routes['Maddress'] = {
        url : '/Maddress',
        templateUrl : 'views/Maddress.html',
        controller:'MaddressCtrl'
    };
    this.routes['addAddress'] = {
        url : '/addAddress',
        templateUrl : 'views/addAddress.html',
        controller:'addAddressCtrl'
    };
    this.routes['chaAddress'] = {
        url : '/chaAddress?addr_id',
        templateUrl : 'views/chaAddress.html',
        controller:'chaAddressCtrl'
    };
    this.routes['updataTotal'] = {
        url : '/updataTotal',
        templateUrl : 'views/updataTotal.html',
        controller:'updataTotalCtrl'
    };
    this.routes['Mycart'] = {
        url : '/Mycart?type',
        templateUrl : 'views/Mycart.html',
        controller:'MycartCtrl'
    };
    this.routes['choseAddress'] = {
        url : '/choseAddress',
        templateUrl : 'views/choseAddress.html',
        controller:'choseAddressCtrl'
    };
    this.routes['nickname'] = {
        url : '/nickname',
        templateUrl : 'views/nickname.html',
        controller:'nicknameCtrl'
    };
    this.routes['IndentMsg'] = {
        url : '/IndentMsg?order_id',
        templateUrl : 'views/IndentMsg.html',
        controller:'IndentMsgCtrl'
    };
    this.routes['preferential'] = {
        url : '/preferential',
        templateUrl : 'views/preferential.html',
        controller:'preferentialCtrl'
    };
     this.routes['Opinion'] = {
        url : '/Opinion?order_id',
        templateUrl : 'views/Opinion.html',
        controller:'OpinionCtrl'
    };
    this.routes['restaurant'] = {
        url : '/restaurant?cate_id,cate_name',
        templateUrl : 'views/restaurant.html',
        controller:'restaurantsCtrl'
    };
    this.routes['hotel'] = {
        url : '/hotel',
        templateUrl : 'views/hotel.html',
        controller:'hotelCtrl'
    };
    this.routes['fruit'] = {
        url : '/fruit',
        templateUrl : 'views/fruit.html',
        controller:'fruitCtrl'
    };
    this.routes['hair'] = {
        url : '/hair',
        templateUrl : 'views/hair.html',
        controller:'hairCtrl'
    };
    this.routes['fitness'] = {
        url : '/fitness',
        templateUrl : 'views/fitness.html',
        controller:'fitnessCtrl'
    };
    this.routes['supermarket'] = {
        url : '/supermarket',
        templateUrl : 'views/supermarket.html',
        controller:'supermarketCtrl'
    };
    this.routes['articles'] = {
        url : '/articles',
        templateUrl : 'views/articles.html',
        controller:'articlesCtrl'
    };
    this.routes['medical'] = {
        url : '/medical',
        templateUrl : 'views/medical.html',
        controller:'medicalCtrl'
    };
    this.routes['integral'] = {
        url : '/integral',
        templateUrl : 'views/integral.html',
        controller:'integralCtrl'
    };
    this.routes['favorable'] = {
        url : '/favorable',
        templateUrl : 'views/favorable.html',
        controller:'favorableCtrl'
    };
    this.routes['systemMsg'] = {
        url : '/systemMsg?msg_id',
        templateUrl : 'views/systemMsg.html',
        controller:'systemMsgCtrl'
    };
    this.routes['mumberMsg'] = {
        url : '/mumberMsg?msg_id',
        templateUrl : 'views/mumberMsg.html',
        controller:'mumberMsgCtrl'
    };
    this.routes['navigation'] = {
        url : '/navigation?lng&?lat?name',
        templateUrl : 'views/navigation.html',
        controller:'navigationCtrl'
    };
    this.routes['shopMsg'] = {
        url : '/shopMsg?shop_id',
        templateUrl : 'views/shopMsg.html',
        controller:'shopMsgCtrl'
    };
    this.routes['shopCenter'] = {
        url : '/shopCenter',
        templateUrl : 'views/shopCenter.html',
        controller:'shopCenterCtrl'
    };
    this.routes['basic'] = {
        url : '/basic',
        templateUrl : 'views/basic.html',
        controller:'basicCtrl'
    };
    this.routes['addEnvironment'] = {
        url : '/addEnvironment',
        templateUrl : 'views/addEnvironment.html',
        controller:'addEnvironmentCtrl'
    };
    this.routes['addPay'] = {
        url : '/addPay',
        templateUrl : 'views/addPay.html',
        controller:'addPayCtrl'
    };
    this.routes['payShop'] = {
        url : '/payShop',
        templateUrl : 'views/payShop.html',
        controller:'payShopCtrl'
    };
    


    
    this.$get = function()
    {
        return( this.routes );
    };
}
);
