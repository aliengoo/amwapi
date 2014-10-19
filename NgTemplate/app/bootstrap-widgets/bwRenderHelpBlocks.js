(function(){

  "use strict";

  angular.module('bootstrapWidgets').factory('bwRenderHelpBlocks', bwRenderHelpBlocks);

  bwRenderHelpBlocks.$inject = ['common', 'template'];

  function bwRenderHelpBlocks(common, template) {
    var that = {
      render : render
    };


    function render($e) {

      var helpBlocks = '';
      var helpBlockTemplate = '<span class="help-block <%= classes %>" <%= attrs %>><%= text %></span>';

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

        helpBlocks += template.render(helpBlockTemplate, {
          text: $(helpBlock).html(),
          attrs: helpBlockAttrs,
          classes: helpBlockClasses
        });

        $(helpBlock).remove();
      });

      return helpBlocks;
    }

    return that;
  }
}());
