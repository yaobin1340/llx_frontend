angular.module('ohapp').factory('Shops', function ($config, $http) {

	var Shops = function () {
		this.items = [];
		this.busy = false;
		this.after = '';
		this.page = 1;
		this.end = false;
	};

	Shops.prototype.nextPage = function () {
		if (this.busy) return;
		if (this.end) return;
		this.busy = true;

		$http({
			method: 'POST',
			url: $config.api_uri + '/Apipublic/ApiPmall/getshops',
			data: {page:this.page},
		}).success(function (data) {
			console.log(data);
			this.page++;
			if (data.success) {
				if(!data.shop_list.length){
					this.end = true;
					return
				}
				var items = data.shop_list;
				for (var i = 0; i < items.length; i++) {
					this.items.push(items[i]);
				}
				this.after = "t3_" + this.items[this.items.length - 1].id;
				this.busy = false;
				this.page += 1;
			} else {

			}

		}.bind(this))
	};

	return Shops;

});