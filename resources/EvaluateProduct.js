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