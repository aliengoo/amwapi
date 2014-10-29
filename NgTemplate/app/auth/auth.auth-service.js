(function () {
  "use strict";

  angular.module('auth').provider('authService', authServiceProvider);

  function authServiceProvider() {
    var that = {};

    that.authServiceUrl = '';

    that.setAuthServiceUrl = function (authServiceUrl) {
      that.authServiceUrl = authServiceUrl;
    };

    that.$get = ['$http', function ($http) {
      var authService = {
        authenticate: authenticate,
        authorize : authorize
      };

      return authService;

      function authenticate(credentials) {
        return $http({
          method: 'POST',
          url: that.authServiceUrl,
          data: credentials
        });
      }

      function authorize() {
        return $http({
          method : 'GET',
          url : that.authServiceUrl
        });
      }
    }];

    return that;
  }
}());
