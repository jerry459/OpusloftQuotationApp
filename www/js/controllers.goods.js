angular.module('starter')
  .controller('GoodsCtrl', function($rootScope, $scope, $state, $log, $q, $http, $cordovaBarcodeScanner, ngDialog, GoodsService) {
    $log.info("GoodsCtrl", "-- start --");

    var ctrl = $scope;
    var params = $state.params;
    var goods = {};
    ctrl.typeFlag = (params && params.flag) ? params.flag : 'new';
    ctrl.quotNo = (params && params.quotNo) ? params.quotNo : '';
    ctrl.isKeyboardShow = false;
    ctrl.waitKeyboardClose = false;
    ctrl.waitQueryItemId = '';

    window.addEventListener('native.keyboardshow', function(e) {
      console.log("keyboard show : height=" + e.keyboardHeight);
      ctrl.isKeyboardShow = true;
    })

    window.addEventListener('native.keyboardhide', function(e) {
      console.log("keyboard hide : height=" + e.keyboardHeight);

      if (ctrl.waitKeyboardClose) {
        window.removeEventListener('native.keyboardhide', function() {}, false);
        ctrl.isKeyboardShow = false;
        ctrl.waitKeyboardClose = false;

        if (ctrl.waitQueryItemId != '') {
          ctrl.clickQuery2(ctrl.waitQueryItemId);
        } else {
          ctrl.scanBarcode2();
        }
      }
    })

    ctrl.init = function() {
      $rootScope.checkAuthState();
      $scope.queryCode = '';

      if (params.itemId) ctrl.queryGoods(params.itemId);
    }

    ctrl.scanBarcode = function() {
      ctrl.waitQueryItemId = '';

      if (ctrl.isKeyboardShow) {
        ctrl.waitKeyboardClose = true;
      } else {
        ctrl.scanBarcode2();
      }
    };

    ctrl.scanBarcode2 = function() {
      $cordovaBarcodeScanner.scan().then(function(result) {
        $scope.queryCode = '';

        if (result.text) {
          if (result.text.indexOf('qcode=') > -1) {
            $scope.queryCode = result.text.split('qcode=')[1];
          } else {
            $scope.queryCode = result.text;
          }
        }

        $scope.barcodeFormat = result.format;

        if ($scope.queryCode != undefined && $scope.queryCode != "") {
          ctrl.clickQuery2($scope.queryCode);
        }
      }, function(error) {
        console.warn("An error happened -> " + error);
      });
    };

    ctrl.clickQuery = function(itemId) {
      if (ctrl.isKeyboardShow) {
        ctrl.waitQueryItemId = itemId;
        ctrl.waitKeyboardClose = true;
      } else {
        ctrl.clickQuery2(itemId);
      }
    };

    ctrl.clickQuery2 = function(itemId) {
      $log.debug("GoodsCtrl.clickQuery", "flag=", ctrl.typeFlag, ", quotNo=", params.quotNo);

      $scope.queryCode = '';
      ctrl.waitQueryItemId = '';
      if (ctrl.typeFlag == 'add2quot.edit' && params.quotNo != '') {
        if (itemId) {
          $state.go('goods.query', {
            'itemId': itemId,
            'flag': ctrl.typeFlag,
            'quotNo': ctrl.quotNo
          }, {
            reload: false
          });
        }
      } else {
        if (itemId) {
          $state.go('goods.query', {
            'itemId': itemId
          }, {
            reload: false
          });
        }
      }
    };

    ctrl.queryGoods = function(itemId) {
      ctrl.goods = {};

      GoodsService.getGoods(itemId).then(function(res) {
        $log.debug("GoodsCtrl.queryGoods", "success", res);

        if (res.stockNo) {
          ctrl.goods.total = res.total;
          ctrl.goods.stockNo = res.stockNo;
          ctrl.goods.stockName = res.stockName;
          ctrl.goods.stockPrice = res.stockPrice;
          ctrl.goods.stockNum = 0;
          ctrl.goods.warehouseList = res.warehouseList;

          if (res.hasOwnProperty('stockSpec')) {
            ctrl.goods.stockSpec = res.stockSpec;
          } else {
            ctrl.goods.stockSpec = '';
          }

          if (res.hasOwnProperty('stockCode')) {
            ctrl.goods.stockCode = res.stockCode;
          } else {
            ctrl.goods.stockCode = '';
          }

          for (var k in ctrl.goods.warehouseList) {
            ctrl.goods.stockNum += ctrl.goods.warehouseList[k].num;
          }
        } else {
          alert('查無商品 !!');
          if (ctrl.typeFlag == 'add2quot.edit') {
            $state.go('quotation.edit', {
              'obj': undefined,
              'flag': ctrl.typeFlag,
              'quotNo': ctrl.quotNo
            }, {
              reload: false
            });
          } else if (ctrl.typeFlag == 'add2quot') {
            $state.go('quotation.new', {
              'obj': undefined,
              'flag': ctrl.typeFlag
            }, {
              reload: false
            });
          } else {
            $state.go('goods', {}, {
              reload: false
            });
          }
        }

      }, function(err) {
        $log.debug("GoodsCtrl.queryGoods", "error", err);

        //ngDialog.open({ template: 'sysDialog.html' });
        alert(err.returnDesc);
        $state.go('goods', {}, {
          reload: false
        });
      }).catch(function(ex) {
        $log.debug("GoodsCtrl.queryGoods", "exception", ex);

        alert('發生異常!!');
        $state.go('goods', {}, {
          reload: false
        });
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
