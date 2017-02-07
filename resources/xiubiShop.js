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
			data: {page:this.page,lat:this.lat,lng:this.lng,area_code:this.area_code,order:this.order,cate_id:this.cate_id,shop_name:this.cate_name},
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

	return xiubiShop;

});