angular.module('starter')
	.controller('HomeCtrl', function($scope) {})
	.controller('GoodsCtrl', function($scope) {})
	.controller("BarcodeCtrl", function ($scope, $cordovaBarcodeScanner, $http) {
		$scope.scanBarcode = function () {
			$cordovaBarcodeScanner.scan().then(function (result) {                   
				$scope.barcode = result.text;
				$scope.format = result.format;

				if ( result.text ) {
					$http
						.get("http://tw.yahoo.com", { params: { "key1": "value1", "key2": "value2" } })
						.success(function(data) {
							$scope.result = data.result;
						})
						.error(function(data) {
							alert("ERROR");
						});
				}
			}, function (error) {
				console.warn("An error happened -> " + error);
			});
		};
	})
	.controller('CustomerCtrl', function($scope) {})
	.controller('QuotationCtrl', function($scope) {});
