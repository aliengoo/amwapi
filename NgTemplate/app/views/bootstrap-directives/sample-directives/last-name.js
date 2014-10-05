(function(){

  "use strict";

  window.app.directive('lastName', [function(){

    return {
      restrict : 'E',
      templateUrl : 'views/bootstrap-directives/sample-directives/last-name.html',
      scope : {
        ngModel : '='
      }
    };

  }]);

}());

