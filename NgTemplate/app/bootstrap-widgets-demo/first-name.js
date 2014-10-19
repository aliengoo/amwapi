(function(){

  "use strict";

  angular.module('app.bootstrap-widgets-demo').directive('firstName', firstName);

  function firstName() {
    return {
      restrict : 'E',
      templateUrl : 'bootstrap-widgets-demo/first-name.html',
      scope : {
        ngModel : '='
      }
    };
  }

}());
