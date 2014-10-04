(function(){

  "use strict";

  window.app.factory('validateAttrsSvc', ['$interpolate', function($interpolate) {
    return {
      validate : function($a, requiredAttrs, errors) {
        var checkAttr = function(requiredAttr) {
          if (!$a.hasOwnProperty(requiredAttr) || angular.isUndefined($a[requiredAttr])) {
            errors.push($interpolate("'{{requiredAttr}}' attribute is required")({
              requiredAttr : requiredAttr
            }));
          }
        };

        if (angular.isArray(requiredAttrs)){
          angular.forEach(requiredAttrs, checkAttr);
        }

        if (angular.isString(requiredAttrs)){
          checkAttr(requiredAttrs);
        }
      }
    };

  }]);

}());
