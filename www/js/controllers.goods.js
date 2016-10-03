angular.module('starter')
  .controller('GoodsCtrl', function($rootScope, $scope, $state, $stateParams, $log, $q, $http, $cordovaBarcodeScanner, GoodsService) {
    $log.info("GoodsCtrl", "-- start --");

    var ctrl = $scope;
    var params = $state.params;
    var goods = {};

    ctrl.init = function() {
      $rootScope.checkAuthState();
      $scope.queryCode = '';

      if (params.itemId) ctrl.queryGoods(params.itemId);
    }

    ctrl.scanBarcode = function() {
      $cordovaBarcodeScanner.scan().then(function(result) {
        $scope.queryCode = result.text;
        $scope.barcodeFormat = result.format;

        if ($scope.queryCode != undefined && $scope.queryCode != "") {
          ctrl.clickQuery($scope.queryCode);
        }
      }, function(error) {
        console.warn("An error happened -> " + error);
      });
    };

    ctrl.clickQuery = function(itemId) {
      if (itemId) {
        $state.go('goods.query', {
          'itemId': itemId
        }, {
          reload: false
        });
      }
    };

    ctrl.queryGoods = function(itemId) {
      ctrl.goods = {};

      GoodsService.getGoods(itemId).then(function(res) {
        $log.debug("GoodsCtrl.queryGoods", "success", res);
        debugger;

        ctrl.goods.total = res.total;
        ctrl.goods.stockNo = res.stockNo;
        ctrl.goods.stockName = res.stockName;
        ctrl.goods.price = res.price;
        ctrl.goods.warehouseList = res.warehouseList;

      }, function(err) {
        $log.debug("GoodsCtrl.queryGoods", "error", err);
        debugger;

      }).catch(function(ex) {
        $log.debug("GoodsCtrl.queryGoods", "exception", ex);
        debugger;

      });
    };

    ctrl.init();

    $log.info("GoodsCtrl", "-- end --");
  })

.controller("BarcodeCtrl", function($rootScope, $scope, $log, $q, $http, $cordovaBarcodeScanner) {
  $log.info("BarcodeCtrl", "-- start --");
  /*
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
  */
  $log.info("BarcodeCtrl", "-- end --");
})
