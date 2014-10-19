(function(){

  "use strict";

  angular.module('config').factory('config', config);

  config.$inject = ['common'];

  function config(common) {
    var that = {
      getApiUrl : getApiUrl
    };

    function getApiUrl() {
      return  common.virtualDirectory + "/api/";
    }

    return that;
  }

}());
