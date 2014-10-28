(function(){
  "use strict";

  angular.module('common').factory('logger', logger);

  logger.$inject = ['$log'];

  function logger($log){
    var that = {};

    that.error = $log.error;
    that.warn = $log.warn;
    that.info = $log.info;

    // https://developer.mozilla.org/en-US/docs/Web/API/Console.dir
    if (console.dir) {
      that.dir = console.dir;
    } else {
      that.dir = $log.info;
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Console.table
    if (console.table) {
      that.table = console.table;
    } else {
      that.table = $log.info;
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Console.trace
    if (console.trace) {
      that.trace = console.trace;
    } else {
      that.trace = $log.info;
    }

    return that;
  }

}());
