(function(){

  "use strict";

  angular.module('common').factory('common', common);

  common.$inject = ['$rootScope', '$q', '$http', '$resource', '$interpolate', '$templateCache', '$state', '$timeout'];

  function common($rootScope, $q, $http, $resource, $interpolate, $templateCache, $state, $timeout){

    var that = {
      $rootScope : $rootScope,
      $q : $q,
      $http : $http,
      $resource : $resource,
      $interpolate : $interpolate,
      $templateCache : $templateCache,
      $state : $state,
      $timeout : $timeout
    };

    return that;
  }

}());
