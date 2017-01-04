angular
	.module('ohConfig2', [])
	.provider('$config2', function $configProvider() {
		var config2 = {
			"api_uri": "http://139.224.222.18:8080",
			"default_lat": 40.7167,
			"default_long": -74
		}

		this.$get = function () {
			return config2
		}
	})