(function(){

  "use strict";

  window.app.factory('renderHelpBlocks', ['$interpolate', function($interpolate) {

    var helpBlockTemplate = '<span class="help-block {{classes}}" {{attrs}}>{{text}}</span>';

    return {
      render : function($e) {

        var helpBlocks = '';

        angular.forEach($e.find('help-block'), function (helpBlock) {

          var helpBlockAttrs = '';
          var helpBlockClasses = '';

          angular.forEach(helpBlock.attributes, function (attr) {

            if (attr.localName === 'class') {
              helpBlockClasses += attr.value;
            } else {
              helpBlockAttrs += attr.localName + "='" + attr.value + "'";
            }

          });

          helpBlocks += $interpolate(helpBlockTemplate)({
            text: helpBlock.innerText,
            attrs: helpBlockAttrs,
            classes: helpBlockClasses
          });

          $(helpBlock).remove();
        });

        return helpBlocks;
      }
    };
  }]);

}());
