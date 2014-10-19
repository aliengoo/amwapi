(function(){

  "use strict";

  angular.module('app.bootstrap-widgets-demo').directive('userTitle', userTitle);

  function userTitle() {
    return {
      restrict : 'E',
      templateUrl : 'bootstrap-widgets-demo/user-title.html',
      scope : {
        ngModel : '='
      }
    };
  }
}());


