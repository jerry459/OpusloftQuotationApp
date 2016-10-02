angular.module('starter')
  .controller('LoginCtrl', function($rootScope, $scope, $log, $q, $http, $state, UsersService) {
    $log.info("LoginCtrl", "-- start --");

    var ctrl = $scope;
    var loginData = {};
    var user = {};

    ctrl.init = function() {
      loginData.account = "";
      loginData.pwd = "";

      UsersService.getUserFromLocalStorage();
      user = $rootScope.user;

      // 暫時停用這個判斷是
      if (user.accessToken != undefined && user.accessToken != "" && false) {
        $state.go("home");
      } else {}
    }

    ctrl.login = function(loginData) {

      UsersService.login(loginData).then(function(res) {
        user.loginId = res.loginId;
        user.userName = res.userName;
        user.accessToken = res.accessToken;
        user.userStatus = res.status;
        user.storeName = res.storeName;

        if (user.userStatus) {
          UsersService.save2LocalStorage(user);

          $state.go("home");
        } else {
          loginData.account = "";
          loginData.pwd = "";
          user = {};
          UsersService.logout();
        }

      }, function(err) {
        $log.debug("LoginCtrl.login", "error", err);
        debugger;

      }).catch(function(ex) {
        $log.debug("LoginCtrl.login", "exception", ex);
        debugger;

      });
    }

    ctrl.init();

    $log.info("LoginCtrl", "-- end --");
  })

.controller('HomeCtrl', function($rootScope, $scope, $log, $q, $http) {
  $log.info("HomeCtrl", "-- start --");

  var ctrl = $scope;

  ctrl.init = function() {
    $rootScope.checkAuthState();
  }

  ctrl.init();

  $log.info("HomeCtrl", "-- end --");
})

.controller('GoodsCtrl', function($rootScope, $scope, $log, $q, $http, $cordovaBarcodeScanner, GoodsService) {
  $log.info("GoodsCtrl", "-- start --");

  var ctrl = $scope;

  ctrl.init = function() {
    $scope.queryCode = '';
    $rootScope.checkAuthState();
  }

  ctrl.scanBarcode = function() {
    $cordovaBarcodeScanner.scan().then(function(result) {
      $scope.queryCode = result.text;
      $scope.barcodeFormat = result.format;

      if ($scope.queryCode != undefined && $scope.queryCode != "") {
        ctrl.queryGoods($scope.queryCode);
      }
    }, function(error) {
      console.warn("An error happened -> " + error);
    });
  };

  ctrl.queryGoods = function(itemId) {
    GoodsService.getGoods(itemId).then(function(res) {
      $log.debug("GoodsCtrl.queryGoods", "success", res);
      debugger;

      //

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

.controller('CustomerCtrl', function($rootScope, $scope, $log, $q, $http) {
  $log.info("CustomerCtrl", "-- start --");
  debugger;

  $log.info("CustomerCtrl", "-- end --");
})

.controller('QuotationCtrl', function($rootScope, $scope, $log, $q, $http) {
  $log.info("QuotationCtrl", "-- start --");
  debugger;

  $log.info("QuotationCtrl", "-- end --");
})
