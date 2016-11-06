angular.module('starter')
  .controller('CustomerCtrl', function($rootScope, $scope, $state, $log, $q, $http, CustomersService, AddressService) {
    $log.info("CustomerCtrl", "-- start --");

    $scope.customerData = {};
    $scope.addr1 = {};
    $scope.addr1Selected = {};
    $scope.addr2 = {};
    $scope.addr2Selected = {};
    $scope.addr3 = {};
    $scope.addr3Selected = {};
    $scope.customers = {};
    $scope.customer = {};
    $scope.quotations = {};
    var ctrl = $scope;

    ctrl.init = function() {
      $rootScope.checkAuthState();
      debugger

      if ($state.params != undefined && $state.params.obj != undefined) {
        if ($state.$current.name == "customer.search")
          ctrl.customers = $state.params.obj;
        if ($state.$current.name == "customer.quotation")
          ctrl.customer = $state.params.obj;
      }
      $log.info("CustomerCtrl", "-- customers --", ctrl.customers);

      ctrl.getAddr1();
    }

    ctrl.selCustomer = function(cust) {
      if (cust) {
        $state.go('customer.quotation', {
          'obj': cust
        }, {
          reload: false
        });
      }
    }

    ctrl.getAddr1 = function() {
      AddressService.getAddr1().then(function(data) {
        $log.debug("CustomerCtrl.getAddr1", "success", data);

        ctrl.addr1 = data;
      }, function(err) {
        $log.debug("CustomerCtrl.getAddr1", "error", err);
        debugger;

      }).catch(function(ex) {
        $log.debug("CustomerCtrl.getAddr1", "exception", ex);
        debugger;

      });
    }

    ctrl.getAddr2 = function(addr1No) {
      AddressService.getAddr2(addr1No).then(function(data) {
        $log.debug("CustomerCtrl.getAddr2", "success", data);

        ctrl.addr2 = data;
      }, function(err) {
        $log.debug("CustomerCtrl.getAddr2", "error", err);
        debugger;

      }).catch(function(ex) {
        $log.debug("CustomerCtrl.getAddr2", "exception", ex);
        debugger;

      });
    }

    ctrl.getAddr3 = function(addr2No) {
      AddressService.getAddr3(addr2No).then(function(data) {
        $log.debug("CustomerCtrl.getAddr3", "success", data);

        ctrl.addr3 = data;
      }, function(err) {
        $log.debug("CustomerCtrl.getAddr3", "error", err);
        debugger;

      }).catch(function(ex) {
        $log.debug("CustomerCtrl.getAddr3", "exception", ex);
        debugger;

      });
    }

    ctrl.addr1Change = function(item) {
      ctrl.addr1Selected = (item != undefined && item.addr1nm != undefined) ? item : {};

      if (ctrl.addr1Selected != undefined && ctrl.addr1Selected.addr1nm != undefined) {
        ctrl.customerData.addr = ctrl.addr1Selected.addr1nm;
      } else {
        ctrl.addr1Selected = {};
        ctrl.customerData.addr = "";
      }

      ctrl.getAddr2(item.addr1no);
    }

    ctrl.addr2Change = function(item) {
      ctrl.addr2Selected = (item != undefined && item.addr2nm != undefined) ? item : {};

      if (ctrl.addr1Selected != undefined && ctrl.addr1Selected.addr1nm != undefined) {
        ctrl.customerData.addr = ctrl.addr1Selected.addr1nm;
      } else {
        ctrl.addr1Selected = {};
        ctrl.customerData.addr = "";
      }

      if (ctrl.addr2Selected != undefined && ctrl.addr2Selected.addr2nm != undefined) {
        ctrl.customerData.addr = ctrl.addr2Selected.mailno + ctrl.customerData.addr + ctrl.addr2Selected.addr2nm;
        ctrl.customerData.addrZip = ctrl.addr2Selected.mailno;
      }

      ctrl.getAddr3(item.addr2no);
    }

    ctrl.addr3Change = function(item) {
      debugger;

      ctrl.addr3Selected = (item != undefined && item.addr3nm != undefined) ? item : {};

      if (ctrl.addr1Selected != undefined && ctrl.addr1Selected.addr1nm != undefined) {
        ctrl.customerData.addr = ctrl.addr1Selected.addr1nm;
      } else {
        ctrl.addr1Selected = {};
        ctrl.customerData.addr = "";
      }

      if (ctrl.addr2Selected != undefined && ctrl.addr2Selected.addr2nm != undefined) {
        ctrl.customerData.addr = ctrl.addr2Selected.mailno + ctrl.customerData.addr + ctrl.addr2Selected.addr2nm;
      }

      if (ctrl.addr3Selected != undefined && ctrl.addr3Selected.addr3nm != undefined) {
        ctrl.customerData.addr += ctrl.addr3Selected.addr3nm;
      }

    }

    ctrl.clickQuery = function(itemId) {
      if (itemId) {
        $state.go('goods.query', {
          'obj': itemId
        }, {
          reload: false
        });
      }
    };

    ctrl.queryCustomer = function(item) {
      CustomersService.findCustomer(item).then(function(data) {
        $log.debug("CustomerCtrl.queryCustomer", "success", data);

        $state.go('customer.search', {
          'obj': data
        }, {
          reload: false
        });

      }, function(err) {
        $log.debug("CustomerCtrl.queryCustomer", "error", err);
        debugger;

      }).catch(function(ex) {
        $log.debug("CustomerCtrl.queryCustomer", "exception", ex);
        debugger;

      });
    }

    ctrl.queryCustomerQuotation = function(item) {
      CustomersService.queryCustomerQuotation(item).then(function(data) {
        $log.debug("CustomerCtrl.queryCustomerQuotation", "success", data);

      }, function(err) {
        $log.debug("CustomerCtrl.queryCustomerQuotation", "error", err);
        debugger;

      }).catch(function(ex) {
        $log.debug("CustomerCtrl.queryCustomerQuotation", "exception", ex);
        debugger;

      });
    }

    ctrl.addCustomer = function(item) {
      CustomersService.addCustomer(item).then(function(data) {
        $log.debug("CustomerCtrl.queryCustomerQuotation", "success", data);

        $state.go("customer.success");

      }, function(err) {
        $log.debug("CustomerCtrl.queryCustomerQuotation", "error", err);
        debugger;

        $state.go("fail");
      }).catch(function(ex) {
        $log.debug("CustomerCtrl.queryCustomerQuotation", "exception", ex);
        debugger;

      });
    }

    ctrl.init();

    $log.info("CustomerCtrl", "-- end --");
  })
