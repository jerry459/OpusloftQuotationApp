angular.module('services.goods', [])
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

      var itemPart = "/" + itemId;
      var httpMethod = "POST";
      if (AppConfig.DEBUG_MODE) {
        itemPart += ".json";
        httpMethod = "GET";
      }

      var d = $q.defer();
      var api = serviceBaseUrl + "/find" + itemPart;

      var config = {
        'method': httpMethod,
        'url': api,
        'data': {
          'Token': $rootScope.user.accessToken
        }
      }

      $http(config).success(function(data) {
        if (data.returnCode > -1) {
          d.resolve(data.returnData);
        } else {
          d.reject(data);
        }
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
