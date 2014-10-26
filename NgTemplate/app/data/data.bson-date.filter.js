(function(){
  "use strict";

  angular.module('data').filter('bsonDateFilter', bsonDateFilter);

  bsonDateFilter.$inject = ['moment'];

  function bsonDateFilter(moment, format) {
    return function(bsonDateValue) {
      if (bsonDateValue) {
        if (bsonDateValue.hasOwnProperty('$date')){
          var d = moment(bsonDateValue.$date);

          if (d.isValid()) {
            return d.format(format || 'DD/MM/YYYY');
          }
        }
      }

      return bsonDateValue;
    };
  }
}());
