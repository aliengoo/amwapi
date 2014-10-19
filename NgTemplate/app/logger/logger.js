(function(){

  "use strict";

  angular.module('logger').factory('logger', logger);

  logger.$inject = ['$log'];

  function logger($log){
    var that = {};

    that.error = $log.error;
    that.warn = $log.warn;
    that.info = $log.info;

    return that;
  }

}());
