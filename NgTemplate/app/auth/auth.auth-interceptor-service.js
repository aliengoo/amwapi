(function () {
  "use strict";

  angular.module('auth').provider('authInterceptorService', authInterceptorServiceProvider);

  function authInterceptorServiceProvider() {
    var that = {};

    that.statusLocationMap = {};

    /**
     *
     * @param location - the location path
     * @param status - the status code
     */
    that.setLocationOnStatus = function (location, status) {

      if (angular.isUndefined(location)){
        throw new Error('authInterceptorService requires a location path');
      }

      if (!angular.isNumber(status)) {
        throw new Error('authInterceptorService requires a status code to be numeric');
      }

      that.statusLocationMap[status] = location;
    };

    that.$get = ['$location', '$q', '$log', auth];

    function auth($q, $log) {

      var service = {
        responseError: responseError
      };

      return service;

      function responseError(rejection) {
        if (that.statusLocationMap.hasOwnProperty(rejection.status)){
          $location.path(that.statusLocationMap[rejection.status]);
        } else {
          $log.error('authentication failed with status ' + rejection.status);
          $log.error(rejection);
        }

        return $q.reject(rejection);
      }
    }

    return that;
  }
}());

