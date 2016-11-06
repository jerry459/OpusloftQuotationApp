angular.module('services.customers', [])
  .factory('CustomersService', function($rootScope, $log, $q, $http) {

    var self = this;
    var serviceBaseUrl = AppConfig.API_URL + "/customer";

    self.findCustomer = function(cond) {
      $log.info("CustomersService.findCustomer", "-- start --");

      var customerNo = cond.customerNo;
      var itemPart = "/findAll";
      var httpMethod = "POST";
      if (AppConfig.DEBUG_MODE) {
        itemPart += "/" + customerNo + ".json";
        httpMethod = "GET";
      }

      var d = $q.defer();
      var api = serviceBaseUrl + itemPart;

      var data = {}
      for (var k in cond) {
        data[k] = cond[k];
      }

      var config = {
        'method': httpMethod,
        'url': api,
        'data': {
          'token': $rootScope.user.accessToken,
          'inputData': data
        }
      }

      $log.debug("CustomersService.findCustomer", "-- config --", config);
      $http(config).success(function(data) {
        if (data.returnCode > -1) {
          d.resolve(data.returnData);
        } else {
          d.reject(data);
        }
      }).error(function(err) {
        err = {
          'errOrg': err,
          'returnDesc': '查無客戶 !!'
        };
        d.reject(err);
      });

      $log.info("CustomersService.findCustomer", "-- end --");
      return d.promise;
    };

    self.addCustomer = function(customer) {
      $log.info("CustomersService.addCustomer", "-- start --");

      var itemPart = "/save";
      var httpMethod = "POST";
      if (AppConfig.DEBUG_MODE) {
        itemPart += "/success.json";
        httpMethod = "GET";
      }

      var d = $q.defer();
      var api = serviceBaseUrl + itemPart;

      var data = customer;
      data.addr1 = data.addr3;
      data.addr2 = data.addr3;

      var config = {
        'method': httpMethod,
        'url': api,
        'data': {
          'token': $rootScope.user.accessToken,
          'inputData': data
        }
      }

      $log.debug("CustomersService.addCustomer", "-- config --", config);
      $http(config).success(function(data) {
        if (data.returnCode > -1) {
          d.resolve(data.returnData);
        } else {
          d.reject(data);
        }
      }).error(function(err) {
        err = {
          'errOrg': err,
          'returnDesc': '新增失敗 !!'
        };
        d.reject(err);
      });

      $log.info("CustomersService.addCustomer", "-- end --");
      return d.promise;
    }

    self.getCustomer = function(customerNo) {
      $log.info("CustomersService.getCustomer", "-- start --");

      var itemPart = "/findNo";
      var httpMethod = "POST";
      if (AppConfig.DEBUG_MODE) {
        itemPart += "/" + customerNo + ".json";
        httpMethod = "GET";
      }

      var d = $q.defer();
      var api = serviceBaseUrl + itemPart;

      var data = {};
      data.customerNo = customerNo;

      var config = {
        'method': httpMethod,
        'url': api,
        'data': {
          'token': $rootScope.user.accessToken,
          'inputData': data
        }
      }

      $log.debug("CustomersService.getCustomer", "-- config --", config);
      $http(config).success(function(data) {
        if (data.returnCode > -1) {
          d.resolve(data.returnData);
        } else {
          d.reject(data);
        }
      }).error(function(err) {
        err = {
          'errOrg': err,
          'returnDesc': '查無客戶 !!'
        };
        d.reject(err);
      });

      $log.info("CustomersService.getCustomer", "-- end --");
      return d.promise;
    };

    self.queryCustomerQuotation = function(cond) {
      $log.info("CustomersService.queryCustomerQuotation", "-- start --");

      var customerNo = cond.customerNo;
      var itemPart = "/findAll";
      var httpMethod = "POST";
      if (AppConfig.DEBUG_MODE) {
        itemPart += "/" + customerNo + ".json";
        httpMethod = "GET";
      }

      var d = $q.defer();
      var api = serviceBaseUrl + itemPart;

      var data = {}
      for (var k in cond) {
        data[k] = cond[k];
      }

      var config = {
        'method': httpMethod,
        'url': api,
        'data': {
          'token': $rootScope.user.accessToken,
          'inputData': data
        }
      }

      $log.debug("CustomersService.queryCustomerQuotation", "-- config --", config);
      $http(config).success(function(data) {
        if (data.returnCode > -1) {
          d.resolve(data.returnData);
        } else {
          d.reject(data);
        }
      }).error(function(err) {
        err = {
          'errOrg': err,
          'returnDesc': '查無客戶 !!'
        };
        d.reject(err);
      });

      $log.info("CustomersService.queryCustomerQuotation", "-- end --");
      return d.promise;
    };

    return self;
  })
