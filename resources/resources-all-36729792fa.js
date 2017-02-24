angular.module('ohapp').factory('Shops', function ($config, $http) {
	var Shops = function () {
		this.items = [];
		this.busy = false;
		this.after = '';
		this.page = 1;
		this.end = false
		this.lat = '';
		this.lng = '';
		this.area_code = '';
		this.cate_id='';
		this.order='';
		this.shop_name='';
		this.message = '正在加载...';
        this.backdrop = true;
        this.promise = null;
	};

	Shops.prototype.nextPage = function () {
		if (this.busy) return;
		if (this.end) return;
		this.busy = true;
		this.promise = $http({
			method: 'POST',
			url: $config.api_uri + '/Apipublic/ApiPmall/getshops',
			data: {page:this.page,lat:this.lat,lng:this.lng,area_code:this.area_code,order:this.order,cate_id:this.cate_id,shop_name:this.shop_name},
		}).success(function (data) {
			if (data.success) {
				if(data.shop_list==null||!data.shop_list.length){
					this.end = true;
					return
				}
				var items = data.shop_list;
				for (var i = 0; i < items.length; i++) {
					this.items.push(items[i]);
				}
				this.after = "t3_" + this.items[this.items.length - 1].id;
				this.busy = false;
				this.page++;
			} else {
				
			}

		}.bind(this))
	};

	return Shops;

});
angular.module('ohapp').factory('journals', function ($config, $http) {
    var journals = function () {
        this.items = [];
        this.busy = false;
        this.after = '';
        this.page = 1;
        this.end = false;
        this.minDuration = 0;
        this.message = '正在加载...';
        this.backdrop = true;
        this.promise = null;
    };
    journals.prototype.nextPage = function () {
        if (this.busy) return;
        if (this.end) return;
        this.busy = true;
        this.promise = $http({
            method: 'POST',
            url: $config.api_uri + '/Apiuser/Money/cashlogs',
            data: {page:this.page},
        }).success(function (data) {
            if (data.success) {
                if(data.list==null||!data.list.length){
                    this.end = true;
                    return
                }
                var items = data.list;
                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }
                this.after = "t3_" + this.items[this.items.length - 1].id;
                this.busy = false;
                this.page++;
            } else {

            }

        }.bind(this))
    };

    return journals;

});
angular.module('ohapp').factory('OfferPay', function ($config, $http) {
    var OfferPay = function () {
        this.items = [];
        this.busy = false;
        this.after = '';
        this.page = 1;
        this.end = false;
        this.minDuration = 0;
        this.message = '正在加载...';
        this.backdrop = true;
        this.promise = null;
    };
    OfferPay.prototype.nextPage = function () {
        if (this.busy) return;
        if (this.end) return;
        this.busy = true;
        this.promise = $http({
            method: 'POST',
            url: $config.api_uri + '/Apiuser/Pay/index',
            data: {page:this.page},
        }).success(function (data) {
            
            if (data.success) {
                if(data.list==null||!data.list.length){
                    this.end = true;
                    return
                }
                var items = data.list;
                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }
                this.after = "t3_" + this.items[this.items.length - 1].id;
                this.busy = false;
                this.page++;
            } else {

            }

        }.bind(this))
    };

    return OfferPay;

});
angular.module('ohapp').factory('system', function ($config, $http) {
    var system = function () {
        this.items = [];
        this.busy = false;
        this.page = 1;
        this.end = false;
        this.delay = 0;
        this.minDuration = 0;
        this.message = '正在加载...';
        this.backdrop = true;
        this.promise = null;
    };
    system.prototype.nextPage = function () {
        if (this.busy) return;
        if (this.end) return;
        this.busy = true;
        this.promise = $http({
            method: 'POST',
            url: $config.api_uri + '/Apiuser/Message/index',
            data: {page:this.page},
        }).success(function (data) {
            
            if (data.success) {
                if(data.msg==null||!data.msg.length){
                    this.end = true;
                    return
                }
                var items = data.msg;
                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }
                this.after = "t3_" + this.items[this.items.length - 1].id;
                this.busy = false;
                this.page++;
            } else {

            }
        }.bind(this))
    };

    return system;

});
angular.module('ohapp').factory('mumber', function ($config, $http) {
    var mumber = function () {
        this.items = [];
        this.busy = false;
        this.page = 1;
        this.end = false;
        this.minDuration = 0;
        this.message = '正在加载...';
        this.backdrop = true;
        this.promise = null;
    };
    mumber.prototype.nextPage = function () {
        if (this.busy) return;
        if (this.end) return;
        this.busy = true;
        this.promise = $http({
            method: 'POST',
            url: $config.api_uri + '/Apiuser/Message/vipmsg',
            data: {page:this.page},
        }).success(function (data) {
            if (data.success) {
                if(data.msg==null||!data.msg.length){
                    this.end = true;
                    return
                }
                var items = data.msg;
                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }
                this.after = "t3_" + this.items[this.items.length - 1].id;
                this.busy = false;
                this.page++;
            } else {

            }

        }.bind(this))
    };

    return mumber;

});
angular.module('ohapp').factory('Evaluate', function ($config, $http) {
    var Evaluate = function (a) {
        this.items = [];
        this.busy = false;
        this.after = '';
        this.page = 1;
        this.end = false;
        this.totalnum_haspic=0;
        this.shop_id='';
        this.minDuration = 0;
        this.message = '正在加载...';
        this.backdrop = true;
        this.promise = null;
    };
    Evaluate.prototype.nextPage = function () {
        if (this.busy) return;
        if (this.end) return;
        this.busy = true;
        this.promise = $http({
            method: 'POST',
            url: $config.api_uri + '/Apipublic/ApiPshop/shopDianPing',
            data: {shop_id:this.shop_id,page:this.page},
        }).success(function (data) {
            if (data.success) {
                this.totalnum_haspic = data.totalnum_haspic;
                if(data.list==null||!data.list.length){
                    this.end = true;
                    return
                }
                var items = data.list;
                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }
                this.after = "t3_" + this.items[this.items.length - 1].id;
                this.busy = false;
                this.page++;
            } else {

            }

        }.bind(this))
    };

    return Evaluate;

});
angular.module('ohapp').factory('payShop', function ($config, $http) {
    var payShop = function () {
        this.items = [];
        this.busy = false;
        this.after = '';
        this.page = 1;
        this.end = false;
        this.minDuration = 0;
        this.message = '正在加载...';
        this.backdrop = true;
        this.promise = null;
    };
    payShop.prototype.nextPage = function () {
        if (this.busy) return;
        if (this.end) return;
        this.busy = true;
        this.promise = $http({
            method: 'POST',
            url: $config.api_uri + '/Apishop/ApiSorder/index',
            data: {page:this.page,keyword:this.mobile},
        }).success(function (data) {
            if (data.success) {
                if(data.list==null||!data.list.length){
                    this.end = true;
                    return
                }
                var items = data.list;
                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }
                this.after = "t3_" + this.items[this.items.length - 1].id;
                this.busy = false;
                this.page++;
            } else {

            }

        }.bind(this))
    };

    return payShop;

});
angular.module('ohapp').factory('shopFans', function ($config, $http) {
    var shopFans = function () {
        this.items = [];
        this.busy = false;
        this.after = '';
        this.page = 1;
        this.end = false;
        this.minDuration = 0;
        this.message = '正在加载...';
        this.backdrop = true;
        this.promise = null;
    };
    shopFans.prototype.nextPage = function () {
        if (this.busy) return;
        if (this.end) return;
        this.busy = true;
        this.promise = $http({
            method: 'POST',
            url: $config.api_uri + '/Apishop/Fans',
            data: {page:this.page,keyword:this.mobile},
        }).success(function (data) {
            
            if (data.success) {
                if(data.list==null||!data.list.length){
                    this.end = true;
                    return
                }
                var items = data.list;
                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }
                this.after = "t3_" + this.items[this.items.length - 1].id;
                this.busy = false;
                this.page++;
            } else {

            }

        }.bind(this))
    };

    return shopFans;

});
angular.module('ohapp').factory('journalShop', function ($config, $http) {
    var journalShop = function () {
        this.items = [];
        this.busy = false;
        this.after = '';
        this.page = 1;
        this.end = false;
        this.minDuration = 0;
        this.message = '正在加载...';
        this.backdrop = true;
        this.promise = null;
    };
    journalShop.prototype.nextPage = function () {
        if (this.busy) return;
        if (this.end) return;
        this.busy = true;
        this.promise = $http({
            method: 'POST',
            url: $config.api_uri + '/Apishop/Money/cashlogs',
            data: {page:this.page},
        }).success(function (data) {
            console.log(this.page)
            if (data.success) {
                if(data.list==null||!data.list.length){
                    this.end = true;
                    return
                }
                var items = data.list;
                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }
                this.after = "t3_" + this.items[this.items.length - 1].id;
                this.busy = false;
                this.page++;
            } else {

            }

        }.bind(this))
    };

    return journalShop;

});
angular.module('ohapp').factory('xiubiShop', function ($config, $http) {
	var xiubiShop = function () {
		this.items = [];
		this.busy = false;
		this.after = '';
		this.page = 1;
		this.end = false
		this.lat = '';
		this.lng = '';
		this.area_code = '';
		this.cate_id='';
		this.order='';
		this.cate_name='';
		this.message = '正在加载...';
        this.backdrop = true;
        this.promise = null;
	};

	xiubiShop.prototype.nextPage = function () {
		if (this.busy) return;
		if (this.end) return;
		this.busy = true;
		this.promise = $http({
			method: 'POST',
			url: $config.api_uri + '/Apipublic/ApiPjf/goods_list',
			data: {page:this.page},
		}).success(function (data) {
			if (data.success) {
				if(data.goods_list==null||!data.goods_list.length){
					this.end = true;
					return
				}
				var items = data.goods_list;
				for (var i = 0; i < items.length; i++) {
					this.items.push(items[i]);
				}
				this.after = "t3_" + this.items[this.items.length - 1].id;
				this.busy = false;
				this.page++;
			} else {
				
			}

		}.bind(this))
	};

	return xiubiShop;

});
angular.module('ohapp').factory('Address', function ($config, $http) {
    var Address = function () {
        this.items = [];
        this.busy = false;
        this.after = '';
        this.page = 1;
        this.end = false;
        this.shop_id='';
        this.adrId='';
        this.minDuration = 0;
        this.message = '正在加载...';
        this.backdrop = true;
        this.promise = null;
    };
    Address.prototype.nextPage = function () {
        if (this.busy) return;
        if (this.end) return;
        this.busy = true;
        this.promise = $http({
            method: 'POST',
            url: $config.api_uri + '/Apiuser/Adr/index',
            data: {page:this.page},
        }).success(function (data) {
            if (data.success) {
                if(data.addr==null||!data.addr.length){
                    this.end = true;
                    return
                }
                var items = data.addr;
                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }
                this.after = "t3_" + this.items[this.items.length - 1].id;
                this.busy = false;
                this.page++;
            } else {

            }

        }.bind(this))
    };



    return Address;

});
angular.module('ohapp').factory('evaluatePr', function ($config, $http) {
    var evaluatePr = function () {
        this.items = [];
        this.busy = false;
        this.after = '';
        this.page = 1;
        this.end = false;
        this.goods_id='';
        this.orderby='';
        this.minDuration = 0;
        this.message = '正在加载...';
        this.backdrop = true;
        this.promise = null;
    };
    evaluatePr.prototype.nextPage = function () {
        if (this.busy) return;
        if (this.end) return;
        this.busy = true;
        this.promise = $http({
            method: 'POST',
            url: $config.api_uri + '/Apipublic/ApiPshop/goodsdianPing',
            data: {goods_id:this.goods_id,page:this.page,orderby:this.orderby},
        }).success(function (data) {
            if (data.success) {
                if(data.list==null||!data.list.length){
                    this.end = true;
                    return
                }
                var items = data.list;
                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }
                this.after = "t3_" + this.items[this.items.length - 1].id;
                this.busy = false;
                this.page++;
            } else {

            }

        }.bind(this))
    };

    return evaluatePr;

});
angular.module('ohapp').factory('xiubiCart', function ($config, $http) {
    var xiubiCart = function (a) {
        this.items = [];
        this.busy = false;
        this.after = '';
        this.page = 1;
        this.end = false;
        this.orderby='';
        this.status='';
        this.minDuration = 0;
        this.message = '正在加载...';
        this.backdrop = true;
        this.promise = null;
    };
    xiubiCart.prototype.nextPage = function () {
        if (this.busy) return;
        if (this.end) return;
        this.busy = true;
        this.promise = $http({
            method: 'POST',
            url: $config.api_uri + '/Apiuser/Apijf/order_list',
            data: {page:this.page,status:this.status},
        }).success(function (data) {
            if (data.success) {
                if(data.order_list==null||!data.order_list.length){
                    this.end = true;
                    return
                }
                var items = data.order_list;
                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }
                this.after = "t3_" + this.items[this.items.length - 1].id;
                this.busy = false;
                this.page++;
            } else {

            }

        }.bind(this))
    };

    return xiubiCart;

});
angular.module('ohapp').factory('CartIndent', function ($config, $http) {
    var CartIndent = function (a) {
        this.items = [];
        this.busy = false;
        this.after = '';
        this.page = 1;
        this.end = false;
        this.orderby='';
        this.aready='';
        this.minDuration = 0;
        this.message = '正在加载...';
        this.backdrop = true;
        this.promise = null;
    };
    CartIndent.prototype.nextPage = function () {
        if (this.busy) return;
        if (this.end) return;
        this.busy = true;
        this.promise = $http({
            method: 'POST',
            url: $config.api_uri + '/Apiuser/Orderinfo/orderlist',
            data: {page:this.page,aready:this.aready},
        }).success(function (data) {
            if (data.success) {
                if(data.order_list==null||!data.order_list.length){
                    this.end = true;
                    return
                }
                var items = data.order_list;
                var goods = data.goods;
                var arr=[];
                for (var i = 0; i < items.length; i++) {
                    for (var j = 0; j < goods.length; j++) {
                        if(items[i].order_id==goods[j].order_id){
                                arr.push(goods[j]);
                        }
                    }
                    this.items.push({orders:items[i],goods:arr});
                    arr=[];
                }
                this.after = "t3_" + this.items[this.items.length - 1].id;
                this.busy = false;
                this.page++;
            } else {

            }

        }.bind(this))
    };

    return CartIndent;

});
angular.module('ohapp').factory('money', function ($config, $http) {
    var money = function () {
        this.items = [];
        this.busy = false;
        this.page = 1;
        this.end = false;
        this.minDuration = 0;
        this.bg_date='';
        this.end_date='';
        this.message = '正在加载...';
        this.backdrop = true;
        this.promise = null;
    };
    money.prototype.nextPage = function () {
        if (this.busy) return;
        if (this.end) return;
        this.busy = true;
        this.promise = $http({
            method: 'POST',
            url: $config.api_uri + '/Apiuser/Money/detail',
            data: {page:this.page,bg_date:this.bg_date,end_date:this.end_date},
        }).success(function (data) {
            if (data.success) {
                if(data.list==null||!data.list.length){
                    this.end = true;
                    return
                }
                var items = data.list;
                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }
                this.after = "t3_" + this.items[this.items.length - 1].id;
                this.busy = false;
                this.page++;
            } else {

            }

        }.bind(this))
    };

    return money;

});
angular.module('ohapp').factory('shopMoney', function ($config, $http) {
    var shopMoney = function () {
        this.items = [];
        this.busy = false;
        this.page = 1;
        this.end = false;
        this.minDuration = 0;
        this.bg_date='';
        this.end_date='';
        this.message = '正在加载...';
        this.backdrop = true;
        this.promise = null;
    };
    shopMoney.prototype.nextPage = function () {
        if (this.busy) return;
        if (this.end) return;
        this.busy = true;
        this.promise = $http({
            method: 'POST',
            url: $config.api_uri + '/Apishop/Money/detail',
            data: {page:this.page,bg_date:this.bg_date,end_date:this.end_date},
        }).success(function (data) {
            if (data.success) {
                if(data.list==null||!data.list.length){
                    this.end = true;
                    return
                }
                var items = data.list;
                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }
                this.after = "t3_" + this.items[this.items.length - 1].id;
                this.busy = false;
                this.page++;
            } else {

            }

        }.bind(this))
    };

    return shopMoney;

});
angular.module('ohapp').factory('xiubi', function ($config, $http) {
    var xiubi = function () {
        this.items = [];
        this.busy = false;
        this.page = 1;
        this.end = false;
        this.minDuration = 0;
        this.bg_date='';
        this.end_date='';
        this.message = '正在加载...';
        this.backdrop = true;
        this.promise = null;
    };
    xiubi.prototype.nextPage = function () {
        if (this.busy) return;
        if (this.end) return;
        this.busy = true;
        this.promise = $http({
            method: 'POST',
            url: $config.api_uri + '/Apishop/Money/detail',
            data: {page:this.page,bg_date:this.bg_date,end_date:this.end_date},
        }).success(function (data) {
            if (data.success) {
                if(data.list==null||!data.list.length){
                    this.end = true;
                    return
                }
                var items = data.list;
                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }
                this.after = "t3_" + this.items[this.items.length - 1].id;
                this.busy = false;
                this.page++;
            } else {

            }

        }.bind(this))
    };

    return xiubi;

});
angular.module('ohapp').factory('loveShop', function ($config, $http) {
    var loveShop = function () {
        this.items = [];
        this.busy = false;
        this.after = '';
        this.page = 1;
        this.end = false;
        this.minDuration = 0;
        this.message = '正在加载...';
        this.backdrop = true;
        this.promise = null;
    };
    loveShop.prototype.nextPage = function () {
        if (this.busy) return;
        if (this.end) return;
        this.busy = true;
        this.promise = $http({
            method: 'POST',
            url: $config.api_uri + '/Apiuser/Sc/sc_fd_list',
            data: {page:this.page},
        }).success(function (data) {
            if (data.success) {
                if(data.list==null||!data.list.length){
                    this.end = true;
                    return
                }
                var items = data.list;
                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }
                this.after = "t3_" + this.items[this.items.length - 1].id;
                this.busy = false;
                this.page++;
            } else {

            }

        }.bind(this))
    };



    return loveShop;

});
angular.module('ohapp').factory('lovePro', function ($config, $http) {
    var lovePro = function () {
        this.items = [];
        this.busy = false;
        this.after = '';
        this.page = 1;
        this.end = false;
        this.minDuration = 0;
        this.message = '正在加载...';
        this.backdrop = true;
        this.promise = null;
    };
    lovePro.prototype.nextPage = function () {
        if (this.busy) return;
        if (this.end) return;
        this.busy = true;
        this.promise = $http({
            method: 'POST',
            url: $config.api_uri + '/Apiuser/Sc/sc_good_list',
            data: {page:this.page},
        }).success(function (data) {
            if (data.success) {
                if(data.list==null||!data.list.length){
                    this.end = true;
                    return
                }
                var items = data.list;
                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }
                this.after = "t3_" + this.items[this.items.length - 1].id;
                this.busy = false;
                this.page++;
            } else {

            }

        }.bind(this))
    };



    return lovePro;

});