(function(){

  "use strict";

  angular.module('bootstrapWidgets').directive('bwNavbar', bwNavbar);

  bwNavbar.$inject = ['common', 'template'];

  function bwNavbar(common, template) {
    return {
      restrict : 'E',
      compile : function($e) {

        var states = '';

        angular.forEach($e.find('state'), function(stateElement) {
          var state = common.$state.get($(stateElement).attr('name'));

          states += '<li ng-class="{\'active\' : currentStateName === \'' + state.name + '\'}"><a ui-sref=\'' + state.name + '\'>' + $(stateElement).html() + '</a></li>';
        });

        var templateData = {
          states : states,
          brand : $e.find('brand').html()
        };

        $e.html(template.render(common.$templateCache.get('bootstrap-widgets/bw-navbar.html'), templateData));

        return function($s) {

          $s.currentStateName = common.$state.current.name;

          common.$rootScope.$on('$stateChangeSuccess', function (event, toState) {
            $s.currentStateName = toState.name;
          });

        };
      }
    };
  }
}());
