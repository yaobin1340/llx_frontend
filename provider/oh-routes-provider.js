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
        title: '优惠买单',
        templateUrl : 'views/OfferPay.html',
        controller:'OfferPayCtrl'
    };
    this.routes['main.information'] = {
        url : '^/information',
        title: '消息',
        templateUrl : 'views/information.html',
        controller:'informationCtrl'
    };
    this.routes['main.personal'] = {
        url : '^/personal',
        title: '会员中心',
        templateUrl : 'views/personal.html',
        controller:'personalCtrl'
    };

    this.routes['signin'] = {
        url : '/signin',
        title: '登陆',
        templateUrl : 'views/signin.html',
        controller : 'SigninSignupCtrl'
    };

    this.routes['signup'] = {
        url : '/signup',
        title: '注册',
        templateUrl : 'views/signup.html',
        controller : 'SigninSignupCtrl'
    };
    this.routes['forgot'] = {
        url : '/forgot',
        title: '忘记密码',
        templateUrl : 'views/Forgot-password.html',
        controller:'forgotCtrl'
    };

     this.routes['description'] = {
        url : '/description?shop_id',
        title: '商户信息',
        templateUrl : 'views/descriptionProducts.html',
        controller:'descriptionCrtl'
    };
    this.routes['smallShop'] = {
        url : '/smallShop?shop_id',
        title: '微店',
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
        title: '购物车',
        templateUrl : 'views/shopCart.html',
        controller:'shopcartCtrl'
    };

    this.routes['SubmitOrder'] = {
        url : '/SubmitOrder?goods_id,order_id',
        title: '提交订单',
        templateUrl : 'views/SubmitOrder.html',
        controller:'SubmitOrder'
    };
    // 修改调试
    this.routes['payment'] = {
        url : '/payment',
        title: '订单支付',
        templateUrl : 'views/payment.html',
        controller:'paysmentCtrl'
    };
     this.routes['applyCash'] = {
        url : '/applyCash?type',
        title:'资金管理',
        templateUrl : 'views/applyCash.html',
        controller:'applyCashCtrl'
    };
    this.routes['Account'] = {
        url : '/Account',
        title: '账户信息',
        templateUrl : 'views/Account.html',
        controller:'AccountCtrl'
    };
    this.routes['changePwd'] = {
        url : '/changePwd',
        title: '修改密码',
        templateUrl : 'views/changePwd.html',
        controller:'changePwdCtrl'
    };
    this.routes['Maddress'] = {
        url : '/Maddress',
        title: '管理收货地址',
        templateUrl : 'views/Maddress.html',
        controller:'MaddressCtrl'
    };
    this.routes['addAddress'] = {
        url : '/addAddress',
        title: '添加新地址',
        templateUrl : 'views/addAddress.html',
        controller:'addAddressCtrl'
    };
    this.routes['chaAddress'] = {
        url : '/chaAddress?addr_id',
        title: '修改地址',
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
        url : '/restaurant?cate_id,cate_name,area_code,lat,lng',
        templateUrl : 'views/restaurant.html',
        controller:'restaurantsCtrl'
    };
    // this.routes['hotel'] = {
    //     url : '/hotel',
    //     templateUrl : 'views/hotel.html',
    //     controller:'hotelCtrl'
    // };
    // this.routes['fruit'] = {
    //     url : '/fruit',
    //     templateUrl : 'views/fruit.html',
    //     controller:'fruitCtrl'
    // };
    // this.routes['hair'] = {
    //     url : '/hair',
    //     templateUrl : 'views/hair.html',
    //     controller:'hairCtrl'
    // };
    // this.routes['fitness'] = {
    //     url : '/fitness',
    //     templateUrl : 'views/fitness.html',
    //     controller:'fitnessCtrl'
    // };
    // this.routes['supermarket'] = {
    //     url : '/supermarket',
    //     templateUrl : 'views/supermarket.html',
    //     controller:'supermarketCtrl'
    // };
    // this.routes['articles'] = {
    //     url : '/articles',
    //     templateUrl : 'views/articles.html',
    //     controller:'articlesCtrl'
    // };
    // this.routes['medical'] = {
    //     url : '/medical',
    //     templateUrl : 'views/medical.html',
    //     controller:'medicalCtrl'
    // };
    // this.routes['integral'] = {
    //     url : '/integral',
    //     templateUrl : 'views/integral.html',
    //     controller:'integralCtrl'
    // };
    // this.routes['favorable'] = {
    //     url : '/favorable',
    //     templateUrl : 'views/favorable.html',
    //     controller:'favorableCtrl'
    // };
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
    // this.routes['navigation'] = {
    //     url : '/navigation?lng?lat?name?addr',
    //     templateUrl : 'views/navigation.html',
    //     controller:'navigationsCtrl'
    // };
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
    this.routes['addPays'] = {
        url : '/addPays',
        templateUrl : 'views/addPays.html',
        controller:'addPaysCtrl'
    };
    this.routes['myTeam'] = {
        url : '/myTeam',
        templateUrl : 'views/myTeam.html',
        controller:'myTeamCtrl'
    };
    this.routes['code'] = {
        url : '/code',
        templateUrl : 'views/code.html',
        controller:'codeCtrl'
    };
    this.routes['shopFans'] = {
        url : '/shopFans',
        templateUrl : 'views/shopFans.html',
        controller:'shopFansCtrl'
    };
    this.routes['certification'] = {
        url : '/certification',
        templateUrl : 'views/certification.html',
        controller:'certificationCtrl'
    };
    this.routes['xiubi'] = {
        url : '/xiubi',
        title:'秀币记录',
        templateUrl : 'views/xiubi.html',
        controller:'xiubiCtrl'
    };
    this.routes['outlinePay'] = {
        url : '/outlinePay?pay_id',
        title:'线下支付',
        templateUrl : 'views/outlinePay.html',
        controller:'outlinePayCtrl'
    };
    this.routes['onlinePay'] = {
        url : '/onlinePay?pay_id',
        title:'线上支付',
        templateUrl : 'views/onlinePay.html',
        controller:'onlinePayCtrl'
    };
    this.routes['shopCash'] = {
        url : '/shopCash?type',
        title:'资金结算',
        templateUrl : 'views/shopCash.html',
        controller:'shopCashCtrl'
    };
    


    
    this.$get = function()
    {
        return( this.routes );
    };
}
);
