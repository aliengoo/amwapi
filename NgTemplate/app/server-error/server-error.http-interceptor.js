(function () {
  "use strict";

  angular.module('server-error').provider('serverErrorService', serverErrorServiceProvider);

  function serverErrorServiceProvider() {

    var that = {
    };

    that.$get = ['$location', '$log', 'flash', serverErrorService];

    function serverErrorService($location, $log, flash) {
      var service = {
        responseError: responseError
      };

      function responseError(rejection) {
        if (rejection.status === 500) {
          if (that.hasOwnProperty('path') && that.path) {
            flash.set(rejection);
            $location.path(that.path);
          } else {
            $log.warning('"path" not set, defaulting to /server-error');
            $location.path('/server-error');
          }
          return $q.reject(rejection);
        }
        return rejection;
      }

      return service;
    }

    return that;
  }
}());
