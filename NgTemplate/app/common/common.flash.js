(function(){
  "use strict";

  angular.module('common').factory('flash', flash);

  flash.$inject = ['localStorageService'];

  function flash(localStorageService) {
    var that = {
      set : set,
      get : get,
      peek : peek
    };

    return that;

    // implementation

    function set(message) {
      localStorageService.set('flash', message);

      return message;
    }

    function get() {

      var message = localStorageService.get('flash');

      localStorageService.set('flash', undefined);

      return message;
    }

    function peek() {
      return localStorageService.get('flash');
    }
  }
}());
