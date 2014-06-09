# NgTemplate

## Getting Started

### Pre-requisites

**Check _Project_ > _Properties_ > _Web_ > _Servers_ to make sure the IIS settings are correct for your machine.** 

* [NodeJS](http://nodejs.org/download/)
* [NPM](https://www.npmjs.org/)
* [Bower](http://bower.io/)

Once you have NodeJS/NPM installed, install Bower
	
	npm install -g bower

### Installing Dependencies

Before you can run the application, you need to get the JavaScript dependencies.

Dependencies are stored in _bower.json_ and _packages.json_.  Take a look at each and edit appropriately.  

If you do make changes, e.g. add a new bower dependencies, make sure [_Gruntfile.js_](http://gruntjs.com/) gets updated so the correct dependencies get [uglified](https://github.com/gruntjs/grunt-contrib-uglify).

From the project directory, execute the following

	bower install

Once, the client-side JavaScript dependencies have been installed, run

	npm install

This will install [Grunt](http://gruntjs.com/) dependencies.

### Grunt

Before running the project, run _grunt_ from the command line.

	grunt

The _Gruntfile.js_ does the following

* Concatenates application *.js files from _app_, and puts the result into _public/js_
* Compiles .less files from _less_.
* Concatenates and minifies the result of compiling and .less files and any vendor .css files into _public/styles/style.min.css_



 

