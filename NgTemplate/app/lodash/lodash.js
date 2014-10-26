(function(){
  "use strict";

  angular.module('lodash').factory('_', _);

  function _() {
    return window._;
  }
}());
