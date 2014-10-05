(function(){

  "use strict";

  window.app.directive('firstName', [function(){

    return {
      restrict : 'E',
      templateUrl : 'views/bootstrap-directives/sample-directives/first-name.html',
      scope : {
        ngModel : '='
      }
    };

  }]);

}());
