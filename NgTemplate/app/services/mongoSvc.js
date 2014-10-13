(function () {

  "use strict";

  window.app.factory('mongoSvc', ['$http', '$q', 'apiUrl', function ($http, $q, apiUrl) {

    var clearEmpty = function (value) {
      if (angular.isObject(value) && !angular.isArray(value)) {
        angular.forEach(Object.keys(value), function (key) {
          if (!value[key]) {
            delete value[key];
          } else {
            clearEmpty(value[key]);
          }
        });
      }
    };

    return {
      find: function (request, canceller) {
        clearEmpty(request);
        var d = $q.defer();

        $http({
            method: 'POST',
            url: apiUrl + "/collection/" + request.collection + "/find",
            //https://github.com/angular/angular.js/issues/1463
            data: JSON.stringify(request),
            timeout: canceller
          }
        ).success(function (result) {
            d.resolve(result);
          }).error(function (error) {
            d.reject(error);
          });

        return d.promise;
      },
      save : function(request, canceller) {

        clearEmpty(request);

        var d = $q.defer();

        $http({
            method: 'POST',
            url: apiUrl + "/collection/" + request.collection + "/save",
            //https://github.com/angular/angular.js/issues/1463
            data: JSON.stringify(request),
            timeout: canceller
          }
        ).success(function (result) {
            d.resolve(result);
          }).error(function (error) {
            d.reject(error);
          });

        return d.promise;
      }
    };

  }]);

}());
