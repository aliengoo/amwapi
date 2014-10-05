(function(){

  "use strict";

  window.app.directive('userTitle', [function(){

    return {
      restrict : 'E',
      templateUrl : 'views/bootstrap-directives/sample-directives/user-title.html',
      scope : {
        ngModel : '='
      }
    };

  }]);

}());


