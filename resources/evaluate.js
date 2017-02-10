angular.module('ohapp').factory('Evaluate', function ($config, $http) {
    var Evaluate = function (a) {
        this.items = [];
        this.busy = false;
        this.after = '';
        this.page = 1;
        this.end = false;
        this.shop_id='';
        this.orderby='';
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
            data: {shop_id:this.shop_id,page:this.page,orderby:this.orderby},
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

    return Evaluate;

});