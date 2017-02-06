angular
	.module('ohConfig', [])
	.provider('$config', function $configProvider() {
		var config = {
			"api_uri": "139.224.61.180:8080",
			"default_lat": 40.7167,
			"default_long": -74
		}

		this.$get = function () {
			return config
		}
	})