(function () {

  "use strict";

  angular.module('common').factory('obj', obj);

  function obj() {

    var that = {
      clearEmptyProps: clearEmptyProps,
      hasOwnPropertyWithValue: hasOwnPropertyWithValue
    };

    return that;

    // implementation

    function clearEmptyProps(value) {
      if (angular.isObject(value) && !angular.isArray(value)) {
        angular.forEach(Object.keys(value), function (key) {
          if (!value[key]) {
            delete value[key];
          } else {
            clearEmptyProps(value[key]);
          }
        });
      }
    }

    function hasOwnPropertyWithValue(val, prop) {
      if (angular.isUndefined(val)) {
        return false;
      }

      if (val.hasOwnProperty(prop) && angular.isDefined(val[prop])) {
        return true;
      }

      return false;
    }
  }

}());
