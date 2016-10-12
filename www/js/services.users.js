angular.module('services.users', [])
  .factory('UsersService', function($rootScope, $log, $q, $http) {

    var self = this;
    var serviceBaseUrl = AppConfig.API_URL + "";

    self.login = function(loginData) {
      $log.info("UsersService.login", "-- start --");

      var d = $q.defer();
      var account = loginData.account.toUpperCase();
      var pwd = loginData.pwd;
      var auth = "Basic " + Base64.encode(account + ":" + pwd);

      var itemPart = "";
      var httpMethod = "POST";
      if (AppConfig.DEBUG_MODE) {
        itemPart = "/" + account + ".json";
        httpMethod = "GET";
      }
      var api = serviceBaseUrl + "/login/find" + itemPart;

      var config = {
        'method': httpMethod,
        'url': api,
        'data': {
          'Authorization': auth
        }
      }

      $http(config).success(function(data) {
        if (data.returnCode == 0) {
          d.resolve(data.returnData);
        } else {
          d.reject(data);
        }
      }).error(function(err) {
        d.reject(err);
      });
      return d.promise;

      $log.info("UsersService.login", "-- end --");
    }

    self.updatePwd = function(loginData) {
      $log.info("UsersService.updatePwd", "-- start --");
      debugger

      var d = $q.defer();
      var account = loginData.account.toUpperCase();
      var pwd = loginData.pwd;
      var token = loginData.token;
      var data = {
        'token': token,
        'inputData': {
          "emUserid": account,
          "emPassword": pwd
        }
      }

      var itemPart = "";
      var httpMethod = "POST";
      if (AppConfig.DEBUG_MODE) {
        itemPart = "/" + account + ".json";
        httpMethod = "GET";
      }
      var api = serviceBaseUrl + "/login/update" + itemPart;

      var config = {
        'method': httpMethod,
        'url': api,
        'data': data
      }

      $http(config).success(function(data) {
        if (data.returnCode > -1) {
          d.resolve(data);
        } else {
          d.reject(data);
        }
      }).error(function(err) {
        d.reject(err);
      });
      return d.promise;

      $log.info("UsersService.updatePwd", "-- end --");
    }

    self.clearLocalStorage = function() {
      $log.info("UsersService.clearLocalStorage", "-- start --");

      $rootScope.user = {};
      localStorage.removeItem("loginId");
      localStorage.removeItem("userName");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userStatus");
      localStorage.removeItem("storeNo");
      localStorage.removeItem("storeName");

      $log.info("UsersService.clearLocalStorage", "-- end --");
    }

    self.save2LocalStorage = function(user) {
      $log.info("UsersService.save2LocalStorage", "-- start --");

      localStorage.setItem("loginId", user.loginId);
      localStorage.setItem("userName", user.userName);
      localStorage.setItem("accessToken", user.accessToken);
      localStorage.setItem("userStatus", user.userStatus);
      localStorage.setItem("storeNo", user.storeNo);
      localStorage.setItem("storeName", user.storeName);
      $rootScope.user = user;

      $log.debug("save User :", user);
      $log.info("UsersService.save2LocalStorage", "-- end --");
    }

    self.getUserFromLocalStorage = function() {
      $log.info("UsersService.getUserFromLocalStorage", "-- start --");

      var user = {};
      user.loginId = localStorage.getItem("loginId");
      user.userName = localStorage.getItem("userName");
      user.accessToken = localStorage.getItem("accessToken");
      user.userStatus = localStorage.getItem("userStatus");
      user.storeNo = localStorage.getItem("storeNo");
      user.storeName = localStorage.getItem("storeName");
      $rootScope.user = user;

      $log.debug("get User :", user);
      $log.info("UsersService.getUserFromLocalStorage", "-- end --");
    }

    return self;
  })
