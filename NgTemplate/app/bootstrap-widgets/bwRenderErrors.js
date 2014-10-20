(function(){

  "use strict";

  angular.module('bootstrapWidgets').factory('bwRenderErrors', bwRenderErrors);

  bwRenderErrors.$inject = ['template'];

  function bwRenderErrors(template) {

    var that = {
      render : render
    };

    var templateStr = '<div class="panel panel-danger">' +
      '<header class="panel-heading"><h4><%= title %></h4></header>' +
      '<div class="panel-body">' +
      '<ul>' +
      '<%= errorsHtml %>' +
      '</ul>' +
      '</div>' +
      '</div>';

    function render(title, errors) {
      var errorsHtml = '';

      angular.forEach(errors, function(error) {
        errorsHtml += '<li class="text-danger">'+ error + '</li>';
      });

      return template.render(templateStr, {
        title : title,
        errorsHtml : errorsHtml
      });
    }


    return that;
  }


}());
