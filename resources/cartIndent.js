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