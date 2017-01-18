angular.module('ohapp').factory('Shops', function ($config, $http) {
	var Shops = function () {
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
		this.shop_name='';
	};

	Shops.prototype.nextPage = function () {
		if (this.busy) return;
		if (this.end) return;
		this.busy = true;

		$http({
			method: 'POST',
			url: $config.api_uri + '/Apipublic/ApiPmall/getshops',
			data: {page:this.page,lat:31.23,lng:121.49,area_code:this.area_code,order:this.order,cate_id:this.cate_id,shop_name:this.shop_name},
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

	return Shops;

});