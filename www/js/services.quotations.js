angular.module('services.quotations', [])
  .factory('QuotationsService', function($rootScope, $log, $q, $http) {

    var self = this;
    var serviceBaseUrl = AppConfig.API_URL + "/quotation";

    self.getQuotation = function(itemId) {
      $log.info("QuotationsService.getQuotation", "-- start [ ", itemId, " ]");

      var itemPart = "/find";
      var httpMethod = "POST";
      if (AppConfig.DEBUG_MODE) {
        itemPart += "/" + itemId + ".json";
        httpMethod = "GET";
      }

      var d = $q.defer();
      var api = serviceBaseUrl + itemPart;

      var data = {};
      data.quoNo = itemId;

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
          'returnDesc': '查無報價單 !!'
        };
        d.reject(err);
      });

      $log.info("QuotationsService.getQuotation", "-- end --");
      return d.promise;
    }

        self.saveQuotation = function(quot) {
          $log.info("QuotationsService.saveQuotation", quot);

          var itemPart = "/save";
          var httpMethod = "POST";
          if (AppConfig.DEBUG_MODE) {
            itemPart += "/success.json";
            httpMethod = "GET";
          }

          var d = $q.defer();
          var api = serviceBaseUrl + itemPart;

          var config = {
            'method': httpMethod,
            'url': api,
            'data': {
              'token': $rootScope.user.accessToken,
              'inputData': quot
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
              'returnDesc': '新增報價單失敗 !!'
            };
            d.reject(err);
          });

          $log.info("QuotationsService.saveQuotation", "-- end --");
          return d.promise;
        }

    return self;
  })
