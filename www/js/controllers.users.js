angular.module('starter')
  .controller('UsersCtrl', function($rootScope, $scope, $state, $log, $q, $http, $state, UsersService) {
    $log.info("UsersCtrl", "-- start --");

    $scope.loginData = {};
    var ctrl = $scope;
    var user = {};
    var params = $state.params;
    ctrl.message = '';

    ctrl.init = function() {
      if (params != undefined && params.obj != undefined) {
        $scope.loginData = params.obj;
      } else {
        $scope.loginData.account = $scope.loginData.pwd = "";
      }

      $rootScope.checkAuthState();
      //UsersService.getUserFromLocalStorage();
      UsersService.clearLocalStorage();
      user = {}; //$rootScope.user;

      // 暫時停用這個判斷是
      if (user != undefined && user.accessToken != undefined && user.accessToken != "") {
        $state.go("home");
      } else {}
    }

    ctrl.login = function(loginData) {

      UsersService.login(loginData).then(function(res) {

        user.loginId = res.emUserid; //res.loginId;
        user.userName = res.emName; //res.userName;
        user.accessToken = res.token; //res.accessToken;
        user.accessTokenExpire = (new Date()).getTime() + (1000 * 60 * 60 * 12);
        user.userStatus = res.emUserid ? 1 : 0; //res.status;
        user.storeNo = res.emDpno;
        user.storeName = res.emDpname; //res.storeName;

        if (user.userStatus) {
          UsersService.save2LocalStorage(user);

          $state.go("home");
        } else {
          //$scope.loginData.account = "";
          $scope.loginData.pwd = "";
          user = {};
          UsersService.clearLocalStorage();
        }

      }, function(err) {
        $log.debug("UsersCtrl.login", "error", err);
        debugger;

        $scope.loginData.pwd = "";

        if (err && err.returnDesc) {
          ctrl.message = err.returnDesc;
        }else{
          ctrl.message = '登入失敗!!';
        }
        /*
                if (err.returnCode == 1) {
                  alert(err.returnDesc);
                  $scope.loginData = {};
                  $scope.loginData.account = err.returnData.emUserid;
                  $scope.loginData.token = err.returnData.token;
                  $state.go('user.updatePwd', {
                    'obj': $scope.loginData
                  }, {
                    reload: false
                  });
                } else {

                }
        */
      }).catch(function(ex) {
        $log.debug("UsersCtrl.login", "exception", ex);
        debugger;

        $scope.loginData.pwd = "";
      });
    }

    ctrl.updatePwd = function(loginData) {

      UsersService.updatePwd(loginData).then(function(res) {

        alert(res.returnDesc + "\n請重新登入!!");
        $state.go("user.login");

      }, function(err) {
        $log.debug("UsersCtrl.login", "error", err);
        debugger;

      }).catch(function(ex) {
        $log.debug("UsersCtrl.login", "exception", ex);
        debugger;

      });
    }

    ctrl.init();

    $log.info("UsersCtrl", "-- end --");
  })
