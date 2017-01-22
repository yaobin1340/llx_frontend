angular.module('ohapp').factory('payShop', function ($config, $http) {
    var payShop = function () {
        this.items = [];
        this.busy = false;
        this.after = '';
        this.page = 1;
        this.end = false;
    };
    payShop.prototype.nextPage = function () {
        if (this.busy) return;
        if (this.end) return;
        this.busy = true;
        $http({
            method: 'POST',
            url: $config.api_uri + '/Apishop/ApiSorder/index',
            data: {page:this.page,keyword:this.mobile},
        }).success(function (data) {
            console.log(data);
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