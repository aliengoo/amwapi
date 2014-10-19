(function () {
  "use strict";
  angular.module('common', []).factory('logger', Logger);

  Logger.$inject = ['$log'];

  function Logger($log){
    var logger = {};

    logger.error = $log.error;
    logger.warn = $log.warn;
    logger.info = $log.info;

    return logger;
  }

}());

