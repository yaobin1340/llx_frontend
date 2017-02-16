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
        title: '首页',
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
        url : '/description?shop_id,type,openid,image_url',
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
        title: '产品详情',
        templateUrl : 'views/product.html',
        controller:'productCtrl'
    };
    this.routes['pingjia'] = {
        url : '/pingjia?goods_id',
        title: '商品点评',
        templateUrl : 'views/pingjia.html',
        controller:'pingjiaCtrl'
    };
    this.routes['shopcart'] = {
        url : '/shopcart?message',
        title: '购物车',
        templateUrl : 'views/shopCart.html',
        controller:'shopcartCtrl'
    };

    this.routes['SubmitOrder'] = {
        url : '/SubmitOrder?goods_id,order_id,log_id',
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
        title: '修改头像',
        templateUrl : 'views/updataTotal.html',
        controller:'updataTotalCtrl'
    };
    this.routes['main.Mycart'] = {
        url : '^/Mycart?type',
        title: '购物订单',
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
        title: '修改昵称',
        templateUrl : 'views/nickname.html',
        controller:'nicknameCtrl'
    };
    this.routes['IndentMsg'] = {
        url : '/IndentMsg?order_id',
        title: '订单详情',
        templateUrl : 'views/IndentMsg.html',
        controller:'IndentMsgCtrl'
    };
    this.routes['preferential'] = {
        url : '/preferential',
        title: '优惠卡',
        templateUrl : 'views/preferential.html',
        controller:'preferentialCtrl'
    };
     this.routes['Opinion'] = {
        url : '/Opinion?order_id',
        title: '商品点评',
        templateUrl : 'views/Opinion.html',
        controller:'OpinionCtrl'
    };
    this.routes['restaurant'] = {
        url : '/restaurant?cate_id,area_code,lat,lng',
        title: '二级菜单',
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
        title: '系统信息',
        templateUrl : 'views/systemMsg.html',
        controller:'systemMsgCtrl'
    };
    this.routes['mumberMsg'] = {
        url : '/mumberMsg?msg_id',
        title: '会员信息',
        templateUrl : 'views/mumberMsg.html',
        controller:'mumberMsgCtrl'
    };
    this.routes['shopMsg'] = {
        url : '/shopMsg?shop_id',
        title: '商户信息',
        templateUrl : 'views/shopMsg.html',
        controller:'shopMsgCtrl'
    };
    this.routes['shopCenter'] = {
        url : '/shopCenter',
        title: '商户中心',
        templateUrl : 'views/shopCenter.html',
        controller:'shopCenterCtrl'
    };
    this.routes['basic'] = {
        url : '/basic',
        title: '基本设置',
        templateUrl : 'views/basic.html',
        controller:'basicCtrl'
    };
    this.routes['addEnvironment'] = {
        url : '/addEnvironment',
        title: '账户信息',
        templateUrl : 'views/addEnvironment.html',
        controller:'addEnvironmentCtrl'
    };
    this.routes['addPay'] = {
        url : '/addPay',
        title: '创建支付',
        templateUrl : 'views/addPay.html',
        controller:'addPayCtrl'
    };
    this.routes['payShop'] = {
        url : '/payShop',
        title: '优惠买单',
        templateUrl : 'views/payShop.html',
        controller:'payShopCtrl'
    };
    this.routes['myTeam'] = {
        url : '/myTeam',
        title: '我的团队',
        templateUrl : 'views/myTeam.html',
        controller:'myTeamCtrl'
    };
    this.routes['code'] = {
        url : '/code?order_id,need_pay,log_id',
        title: '正在获取信息',
        templateUrl : 'views/code.html',
        controller:'codeCtrl'
    };
    this.routes['shopFans'] = {
        url : '/shopFans',
        title: '粉丝列表',
        templateUrl : 'views/shopFans.html',
        controller:'shopFansCtrl'
    };
    this.routes['certification'] = {
        url : '/certification',
        title: '商户认证中心',
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
    this.routes['xiubiShop'] = {
        url : '/xiubiShop?cate_id,cate_name,area_code,lat,lng',
        title:'秀币商城',
        templateUrl : 'views/xiubiShop.html',
        controller:'xiubiShopCtrl'
    };
    this.routes['integralSubmit'] = {
        url : '/integralSubmit?goods_id?addr_id',
        title:'提交订单',
        templateUrl : 'views/integralSubmit.html',
        controller:'integralSubmitCtrl'
    };
    this.routes['integralAddr'] = {
        url : '/integralAddr?goods_id',
        title:'选择收货地址',
        templateUrl : 'views/integralAddr.html',
        controller:'MaddressCtrl'
    };
    this.routes['xiubiProduct'] = {
        url : '/xiubiProduct?goods_id',
        title: '产品详情',
        templateUrl : 'views/xiubiProduct.html',
        controller:'xiubiProductCtrl'
    };
    this.routes['xiubiCart'] = {
        url : '/xiubiCart?type',
        title: '秀币商城订单',
        templateUrl : 'views/xiubiCart.html',
        controller:'xiubiCartCtrl'
    };
    this.routes['courierMsg'] = {
        url : '/courierMsg?order_id',
        title: '物流信息',
        templateUrl : 'views/courierMsg.html',
        controller:'courierMsgCtrl'
    };
    this.routes['jforderMsg'] = {
        url : '/jforderMsg?order_id',
        title: '详情',
        templateUrl : 'views/jforderMsg.html',
        controller:'jforderMsgCtrl'
    };
    this.routes['preCode'] = {
        url : '/preCode?shop_id,image_url',
        title: '正在获取信息',
        templateUrl : 'views/preCode.html',
        controller:'preCodeCtrl'
    };

    
    this.$get = function()
    {
        return( this.routes );
    };
}
);
