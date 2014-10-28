(function(){

  "use strict";

  angular.module('common').factory('template', template);

  /**
   * Renders a template using lodash templates
   * @returns {{render: render}}
   */
  function template() {

    var that = {
      render : render
    };

    return that;

    // implementation

    // See https://lodash.com/docs#template
    function render(templateStr, templateData, interpolationRegex){

      if (angular.isDefined(interpolationRegex)) {
        _.templateSettings.interpolate = interpolationRegex;
      }

      return _.template(templateStr)(templateData);
    }
  }

}());
