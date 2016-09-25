angular.module('starter.services', [])
  .factory('GoodsService', function($rootScope, $log, $q, $http) {

    var self = this;
    var serviceBaseUrl = AppConfig.API_URL + "/stock";

    self.getGoodsList = function() {
      $log.info("GoodsService.getGoodsList", "-- start --");
      debugger

      var d = $q.defer();
      var api = serviceBaseUrl + "/allGoods.json";
      $http.get(api).success(function(data) {
        d.resolve(data);
      }).error(function(err) {
        d.reject(err);
      });
      return d.promise;

      $log.info("GoodsService.getGoodsList", "-- end --");
    }

    self.getGoods = function(itemId) {
      $log.info("GoodsService.getGoods", "-- start [ ", itemId, " ]");
      debugger

      var d = $q.defer();
      var api = serviceBaseUrl + "/" + itemId + ".json";
      $http.get(api).success(function(data) {
        d.resolve(data);
      }).error(function(err) {
        d.reject(err);
      });
      return d.promise;

      $log.info("GoodsService.getGoods", "-- end --");
    }

    self.delGoods = function(itemId) {
      $log.info("GoodsService.delGoods", "-- start [ ", itemId, " ]");
      debugger

      $log.info("GoodsService.delGoods", "-- end --");
    }

    return self;
  })

.factory('UsersService', function($rootScope, $log, $q, $http) {

  var self = this;
  var serviceBaseUrl = AppConfig.API_URL + "/users";

  self.login = function(loginData) {
    $log.info("UsersService.login", "-- start --");
    debugger

    var d = $q.defer();
    var api = serviceBaseUrl + "/login.json";
    var account = loginData.account;
    var pwd = loginData.pwd;

    $http.get(api).success(function(data) {
      d.resolve(data);
    }).error(function(err) {
      d.reject(err);
    });
    return d.promise;

    $log.info("UsersService.login", "-- end --");
  }

  self.logout = function(loginData) {
    $log.info("UsersService.logout", "-- start --");

    $rootScope.user = {};
    localStorage.removeItem("loginId");
    localStorage.removeItem("userName");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userStatus");

    $log.info("UsersService.logout", "-- end --");
  }

  return self;
})
