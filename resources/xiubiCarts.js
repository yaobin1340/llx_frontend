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