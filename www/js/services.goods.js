angular.module('services.goods', [])
  .factory('GoodsService', function($rootScope, $log, $q, $http) {

    var self = this;
    var serviceBaseUrl = AppConfig.API_URL + "/stock";

    self.getGoods = function(itemId) {
      $log.info("GoodsService.getGoods", "-- start [ ", itemId, " ]");

      var itemPart = "/find/" + itemId;
      var httpMethod = "POST";
      if (AppConfig.DEBUG_MODE) {
        itemPart += ".json";
        httpMethod = "GET";
      }

      var d = $q.defer();
      var api = serviceBaseUrl + itemPart;

      var config = {
        'method': httpMethod,
        'url': api,
        'data': {
          'token': $rootScope.user.accessToken,
          'inputData': {}
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
          'returnDesc': '查無商品 !!'
        };
        d.reject(err);
      });

      $log.info("GoodsService.getGoods", "-- end --");
      return d.promise;
    }

    self.delGoods = function(itemId) {
      $log.info("GoodsService.delGoods", "-- start [ ", itemId, " ]");
      debugger

      $log.info("GoodsService.delGoods", "-- end --");
    }

    return self;
  })
