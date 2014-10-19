(function(){

  "use strict";

  angular.module('config').value('virtualDirectory', function(){
    return window.location.href.split('/')[3];
  }());

}());
