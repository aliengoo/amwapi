(function(){
  "use strict";

  angular.module('common').filter('json', json);

  json.$inject = [];

  function json() {
    return function(data) {
      if (data) {
        return JSON.stringify(data, null, 2);
      }

      return "no data!";
    };
  }
}());
