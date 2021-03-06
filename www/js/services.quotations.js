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
      if ($rootScope.user && $rootScope.user.loginId) {
        data.salesId = $rootScope.user.loginId;
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
          'returnDesc': '查無報價單 !!'
        };
        d.reject(err);
      });

      $log.info("QuotationsService.getQuotation", "-- end --");
      return d.promise;
    }

    self.getCustomerQuotation = function(customerNo) {
      $log.info("QuotationsService.getCustomerQuotation", "-- start [ ", customerNo, " ]");

      var itemPart = "/findCustomer";
      var httpMethod = "POST";
      if (AppConfig.DEBUG_MODE) {
        itemPart += "/" + customerNo + ".json";
        httpMethod = "GET";
      }

      var d = $q.defer();
      var api = serviceBaseUrl + itemPart;

      var data = {};
      data.custNo = customerNo;

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
          'returnDesc': '查無客戶的報價單 !!'
        };
        d.reject(err);
      });

      $log.info("QuotationsService.getCustomerQuotation", "-- end --");
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

      if (!quot.hasOwnProperty('salesId')) {
        if ($rootScope.user && $rootScope.user.loginId) {
          quot.salesId = $rootScope.user.loginId;
        }
      } else {
        quot.salesId = '';
      }

      if (!quot.hasOwnProperty('dpNo')) {
        if ($rootScope.user && $rootScope.user.storeNo) {
          quot.dpNo = $rootScope.user.storeNo;
        }
      } else {
        quot.dpNo = '';
      }

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

    self.updateQuotation = function(quot) {
      $log.info("QuotationsService.updateQuotation", quot);

      var itemPart = "/update";
      var httpMethod = "POST";
      if (AppConfig.DEBUG_MODE) {
        itemPart += "/success.json";
        httpMethod = "GET";
      }

      var d = $q.defer();
      var api = serviceBaseUrl + itemPart;

      if (!quot.hasOwnProperty('salesId')) {
        if ($rootScope.user && $rootScope.user.loginId) {
          quot.salesId = $rootScope.user.loginId;
        }
      } else {
        quot.salesId = '';
      }

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
          'returnDesc': '修改報價單失敗 !!'
        };
        d.reject(err);
      });

      $log.info("QuotationsService.updateQuotation", "-- end --");
      return d.promise;
    }

    return self;
  })
