(function(){
  "use strict";

  angular.module('exception').config(exceptionConfig);

  exceptionConfig.$inject = ['$provide'];

  function exceptionConfig($provide) {
    $provide.decorator('$exceptionHandler', exceptionHandler);
  }

  exceptionHandler.$inject = ['$delegate', '$injector'];

  function exceptionHandler($delegate, $injector) {
    return function(exception, cause) {
      $delegate(exception, cause);

      var errorData = {
        exception: exception,
        cause: cause
      };

      /**
       * Could add the error to a service's collection,
       * add errors to $rootScope, log errors to remote web server,
       * or log locally. Or throw hard. It is entirely up to you.
       * throw exception;
       */

      $injector.get('toastr').error(exception.msg, errorData);
    };
  }

}());
