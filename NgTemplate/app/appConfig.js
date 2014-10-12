(function(){
  app.config([
    '$provide',
    '$stateProvider',
    '$urlRouterProvider',
    'cfpLoadingBarProvider',
    'localStorageServiceProvider',
    'blockUIConfigProvider', function (
      $provide,
      $stateProvider,
      $urlRouterProvider,
      cfpLoadingBarProvider,
      localStorageServiceProvider,
      blockUIConfigProvider) {

    // TODO : Uncomment to disable the spinner
    //cfpLoadingBarProvider.includeSpinner = false;


    // TODO : Set the prefix for local storage
    // localStorageServiceProvider.setPrefix('newPrefix');

    blockUIConfigProvider.message('working...');

    // TODO : Handle uncaught exceptions here
    $provide.decorator("$exceptionHandler", ['$delegate', '$injector', function ($delegate, $injector) {
      return function (exception, cause) {
        $delegate(exception, cause);

        var rootScope = $injector.get('$rootScope');

        rootScope.$broadcast('uncaughtException', {
          exception: exception,
          cause: cause
        });

        // TODO : Add logic here to process uncaught exceptions, or wire up a listener
      };
    }]);

    // TODO : Specify some routes
    $urlRouterProvider.otherwise('/home');

    

    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'views/home/home.html',
      controller: 'homeCtrl'
    }).state('bootstrap-directives', {
      url: '/bootstrap-directives',
      templateUrl: 'views/bootstrap-directives/bootstrap-directives.html',
      controller: 'bootstrapDirectivesCtrl'
    }).state('mongo-demo', {
      url: '/mongo-demo',
      templateUrl: 'views/mongo-demo/mongo-demo.html',
      controller: 'mongoDemoCtrl'
    });
  }]);
}());





