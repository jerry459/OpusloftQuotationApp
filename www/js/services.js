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
      var api = serviceBaseUrl + "/find/" + itemId;
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

  self.logout = function() {
    $log.info("UsersService.logout", "-- start --");

    $rootScope.user = {};
    localStorage.removeItem("loginId");
    localStorage.removeItem("userName");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userStatus");
    localStorage.removeItem("storeName");

    $log.info("UsersService.logout", "-- end --");
  }

  self.save2LocalStorage = function(user) {
    $log.info("UsersService.save2LocalStorage", "-- start --");

    localStorage.setItem("loginId", user.loginId);
    localStorage.setItem("userName", user.userName);
    localStorage.setItem("accessToken", user.accessToken);
    localStorage.setItem("userStatus", user.userStatus);
    localStorage.setItem("storeName", user.storeName);
    $rootScope.user = user;

    $log.info("UsersService.save2LocalStorage", "-- end --");
  }

  self.getUserFromLocalStorage = function() {
    $log.info("UsersService.getUserFromLocalStorage", "-- start --");

    var user = {};
    user.loginId = localStorage.getItem("loginId");
    user.userName = localStorage.getItem("userName");
    user.accessToken = localStorage.getItem("accessToken");
    user.userStatus = localStorage.getItem("userStatus");
    user.storeName = localStorage.getItem("storeName");
    $rootScope.user = user;

    $log.info("UsersService.getUserFromLocalStorage", "-- end --");
  }

  return self;
})
