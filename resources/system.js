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