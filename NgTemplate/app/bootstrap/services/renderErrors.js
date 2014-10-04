(function(){

  "use strict";

  window.app.factory('renderErrors', [function (){

    var template = '<div class="panel panel-danger">' +
        '<header class="panel-heading"><h4><%= title %></h4></header>' +
        '<div class="panel-body">' +
          '<ul>' +
            '<%= errorsHtml %>' +
          '</ul>' +
        '</div>' +
      '</div>';


    return {
      render: function(title, errors){
        var errorsHtml = '';

        angular.forEach(errors, function(error) {
          errorsHtml += '<li class="text-danger">'+ error + '</li>';
        });

        return _.template(template)({
          title : title,
          errorsHtml : errorsHtml
        });
      }
    };
  }]);

}());
