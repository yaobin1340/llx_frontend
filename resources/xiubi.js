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