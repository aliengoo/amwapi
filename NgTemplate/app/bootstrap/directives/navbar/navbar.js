(function(){

  "use strict";

  window.app.directive('navbar', ['$state', '$rootScope', '$templateCache', function($state, $rootScope, $templateCache){

    return {
      restrict : 'E',
      compile : function($e, $a) {

        var states = '';

        angular.forEach($e.find('state'), function(stateElement) {
          var state = $state.get($(stateElement).attr('name'));

          states += '<li ng-class="{\'active\' : currentStateName === \'' + state.name + '\'}"><a ui-sref=\'' + state.name + '\'>' + $(stateElement).html() + '</a></li>';
        });

        var template = _.template($templateCache.get('bootstrap/directives/navbar/navbar.html'))({
          states : states,
          brand : $a.brand
        });

        $e.html(template);

        return function($s, $e, $a, form) {

          $s.currentStateName = $state.current.name;

          $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            $s.currentStateName = toState.name;
          });

        };
      }
    };

  }]);

}());
