(function(){

  "use strict";

  (function () {
    window.virtualDirectory = window.location.href.split('/')[3];

    console.log(window.virtualDirectory);
  }());

  window.app.value('apiUrl', "/" + window.virtualDirectory +'/api/');

}());
