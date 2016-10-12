angular.module('services.quotations', [])
  .factory('QuotationsService', function($rootScope, $log, $q, $http) {

    var self = this;
    var serviceBaseUrl = AppConfig.API_URL + "/quotations";

    self.getQuotation = function(itemId) {
      $log.info("QuotationsService.getQuotation", "-- start [ ", itemId, " ]");

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
        err = {
          'errOrg': err,
          'returnDesc': '查無商品 !!'
        };
        d.reject(err);
      });
      return d.promise;

      $log.info("QuotationsService.getQuotation", "-- end --");
    }

    return self;
  })
