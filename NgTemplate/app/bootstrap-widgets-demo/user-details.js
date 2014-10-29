(function () {

  "use strict";

  angular.module('bootstrap-widgets-demo').directive('userDetails', userDetails);

  function userDetails() {

    return {
      restrict: 'E',
      templateUrl: 'bootstrap-widgets-demo/user-details.html',
      scope: {
        ngModel: '='
      }
    };
  }

}());


