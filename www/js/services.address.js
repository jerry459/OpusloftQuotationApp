angular.module('services.address', [])
  .factory('AddressService', function($rootScope, $log, $q, $http) {

    var self = this;
    var serviceBaseUrl = AppConfig.API_URL + "/address";

    self.getAddr1 = function() {
      var req = {};
      req.itemPart = "/addr1/find";
      req.httpMethod = "POST";
      if (AppConfig.DEBUG_MODE) {
        req.itemPart += "/addr1.json";
        req.httpMethod = "GET";
      }
      req.data = {};

      return self.getAddr(req);
    }

    self.getAddr2 = function(addr1) {
      var req = {};
      req.itemPart = "/addr2/find";
      req.httpMethod = "POST";
      if (AppConfig.DEBUG_MODE) {
        req.itemPart += "/" + addr1 + ".json";
        req.httpMethod = "GET";
      }
      req.data = {};
      req.data.addr1No = addr1;

      return self.getAddr(req);
    }

    self.getAddr3 = function(addr2) {
      var req = {};
      req.itemPart = "/addr3/find";
      req.httpMethod = "POST";
      if (AppConfig.DEBUG_MODE) {
        req.itemPart += "/" + addr2 + ".json";
        req.httpMethod = "GET";
      }
      req.data = {};
      req.data.addr2No = addr2;

      return self.getAddr(req);
    }

    self.getAddr4 = function(addr2, addr3) {
      var req = {};
      req.itemPart = "/addr3/find";
      req.httpMethod = "POST";
      if (AppConfig.DEBUG_MODE) {
        req.itemPart += "/" + addr2 + "." + addr3 + ".json";
        req.httpMethod = "GET";
      }
      req.data = {};
      req.data.addr2No = addr2;
      req.data.addr3No = addr3;

      return self.getAddr(req);
    }

    self.getAddr = function(item) {
      $log.info("AddressService.getAddr", "-- start --");
      $log.info("args", item);

      var itemPart = item.itemPart;
      var httpMethod = item.httpMethod;

      var d = $q.defer();
      var api = serviceBaseUrl + itemPart;

      var data = {}
      for (var k in item.data) {
        data[k] = item.data[k];
      }

      var config = {
        'method': httpMethod,
        'url': api,
        'data': {
          'token': $rootScope.user.accessToken,
          'inputData': data
        }
      }

      $http(config).success(function(data) {
        if (data.returnCode > -1) {
          d.resolve(data.returnData);
        } else {
          d.reject(data);
        }
      }).error(function(err) {
        err = {
          'errOrg': err,
          'returnDesc': '查無資料 !!'
        };
        d.reject(err);
      });

      $log.info("AddressService.getAddr", "-- end --");
      return d.promise;
    };

    return self;
  })
