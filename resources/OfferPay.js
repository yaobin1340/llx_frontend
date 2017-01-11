angular.module('ohapp').factory('OfferPay', function ($config, $http) {
    var OfferPay = function () {
        this.items = [];
        this.busy = false;
        this.after = '';
        this.page = 1;
        this.end = false;
    };
    OfferPay.prototype.nextPage = function () {
        if (this.busy) return;
        if (this.end) return;
        this.busy = true;
        $http({
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
                console.log("11111")
            } else {

            }

        }.bind(this))
    };

    return OfferPay;

});