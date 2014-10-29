(function () {

  "use strict";

  angular.module('bootstrap-widgets-demo').directive('lastName', lastName);

  function lastName() {
    return {
      restrict: 'E',
      templateUrl: 'bootstrap-widgets-demo/last-name.html',
      scope: {
        ngModel: '='
      }
    };
  }

}());

