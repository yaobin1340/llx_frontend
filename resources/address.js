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