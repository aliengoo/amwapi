(function(){

  "use strict";

  window.app.directive('userDetails', [function(){

    return {
      restrict : 'E',
      templateUrl : 'views/bootstrap-directives/sample-directives/user-details.html',
      scope : {
        ngModel : '='
      }
    };

  }]);

}());


