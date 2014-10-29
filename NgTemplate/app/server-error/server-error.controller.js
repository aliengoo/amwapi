(function(){
  "use strict";

  angular.module('server-error').controller('ServerError', ServerError);

  ServerError.$inject = ['flash'];

  function ServerError(flash) {
    var vm = this;
    vm.message = flash.get();
  }
}());
