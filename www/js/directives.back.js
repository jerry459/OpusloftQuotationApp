angular.module('starter')
.directive('goBack', function () {
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
});
