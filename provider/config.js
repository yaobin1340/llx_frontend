angular
	.module('ohConfig', [])
	.provider('$config', function $configProvider() {
		var config = {
			"api_uri": "http://106.14.57.99:8888",
			"default_lat": 40.7167,
			"default_long": -74
		}

		this.$get = function () {
			return config
		}
	})