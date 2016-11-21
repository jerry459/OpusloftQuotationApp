angular.module('starter')
  .directive('goBack', function() {
    return {
      restrict: 'E',
      template: '<button class="btn">{{back}}</button><!-- img src="images/back_01.png" width="66" height="61" class="pic_01" / -->',
      scope: {
        back: '@back'
      },
      link: function(scope, element, attrs) {
        $(element[0]).on('click', function() {
          alert(scope);
          history.back();
          scope.$apply();
        });
      }
    };
  })

.directive('commonHeader', function() {
  return {
    restrict: 'E',
    template: "<ion-header-bar class='page-header'><div class='row'><div class='col col-50 text-left'><i ui-sref='home' class='icon ion-navicon-round header-icon white'></i></div><div class='col col-50 text-right'><label class='version'>{{version}}</label></div></div></ion-header-bar>",
    scope: {
      version: "="
    },
    link: function(scope, element, attrs) {}
  };
});
