(function(){
  "use strict";

  angular.module('moment').factory('moment', moment);

  function moment() {
    return window.moment;
  }
}());
