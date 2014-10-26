(function(){
  "use strict";

  /**
   * Parser/Formatter for ngModel that provides a ISODate -> string -> ISODate conversion
   */
  angular.module('data').directive('bsonDate', bsonDate);

  bsonDate.$inject = ['moment'];

  function bsonDate(moment) {
    return {
      restrict : 'A',
      require : 'ngModel',
      link : function($s, $e, $a, ngModel) {

        ngModel.$formatters.push(function(modelValue) {
          if (modelValue && modelValue.hasOwnProperty('$date')){
            if (angular.isNumber(modelValue.$date)){
              var result = moment(modelValue.$date).format($a.bsonDate || 'YYYY-MM-DD');
              return result;
            }
          }

          return modelValue;
        });

        ngModel.$parsers.push(function (viewValue) {
          var d = moment(viewValue, $a.bsonDate || 'YYYY-MM-DD');

          if (d.isValid()) {
            return {
              $date : parseInt(d.format("X")) * 1000
            };
          }

          return undefined;
        });
      }
    };
  }
}());
