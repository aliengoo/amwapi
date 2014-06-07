(function () {

  "use strict";

  app.service('signalRSvc', function ($, $rootScope) {
    var proxy = null;

    var initialize = function () {
      //Getting the connection object
      window.connection = $.hubConnection();

      //Creating proxy
      this.proxy = connection.createHubProxy('helloWorldHub');

      //Starting connection
      connection.start();

      //Publishing an event when server pushes a greeting message
      this.proxy.on('acceptGreet', function (message) {
        $rootScope.$emit("acceptGreet",message);
      });
    };

    var greetAll = function () {
      //Invoking greetAll method defined in hub
      this.proxy.invoke('greetAll');
    };

    return {
      initialize: initialize,
      greetAll: greetAll
    };
  });

}());
