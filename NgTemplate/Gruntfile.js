module.exports = function (grunt) {

  var vendor_body = [
    'bower/jquery/dist/jquery.min.js',
    'bower/lodash/dist/lodash.min.js',
    'bower/momentjs/min/moment.min.js',
    'bower/stringjs/lib/string.min.js',
    'bower/bootstrap/dist/js/bootstrap.min.js',
    'bower/angular/angular.js',
    'bower/angular-i18n/angular-locale_en-gb.js',
    'bower/angular-animate/angular-animate.min.js',
    'bower/angular-cookies/angular-cookies.min.js',
    'bower/angular-resource/angular-resource.min.js',
    'bower/angular-ui-utils/ui-utils.min.js',
    'bower/angular-ui-router/release/angular-ui-router.min.js',
    'bower/angular-bootstrap/ui-bootstrap-tpls.min.js',
    'bower/greensock/src/minified/TweenMax.min.js',
    'bower/ng-Fx/dist/ngFx.min.js',
    'bower/angular-loading-bar/build/loading-bar.min.js',
    'bower/angular-hotkeys/build/hotkeys.min.js',
    'bower/angular-local-storage/angular-local-storage.min.js',
    'bower/signalr/jquery.signalR.min.js',
    'bower/select2/select2.min.js',
    'bower/angular-ui-select2/src/select2.js',
    'bower/angular-block-ui/dist/angular-block-ui.min.js',
    'bower/angular-toastr/dist/angular-toastr.min.js'
  ];

    grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';\n',
        stripBanners: true
      },
      app: {
        files: {
          'public/js/app.concat.js': [
            'app/JSON/*.module.js',
            'app/JSON/*.js',
            'app/moment/*.module.js',
            'app/moment/*.js',
            'app/lodash/*.module.js',
            'app/lodash/*.js',
            'app/common/*.module.js',
            'app/common/*.js',
            'app/logger/*.module.js',
            'app/logger/*.js',
            'app/exception/*.module.js',
            'app/exception/*.js',
            'app/signalR/*.module.js',
            'app/signalR/*.js',
            'app/app-config/*.module.js',
            'app/app-config/*.js',
            'app/data/*.module.js',
            'app/data/*.js',
            'app/bootstrap-widgets/*.module.js',
            'app/bootstrap-widgets/*.js',
            'app/app.module.js',
            'app/*.js',
            'app/**/*.module.js',
            'app/**/*.js',
            'app/**/**/*.js',
            'app/**/**/**/*.js']
        }
      },
      // remember - use the MINIFIED versions of the files
      vendor_body: {
        files: {
          'public/js/vendor-body.js': vendor_body
        }
      },
      vendor_header: {
        files: {
          'public/js/vendor-header.js': [
            'bower/modernizr/modernizr.js'
          ]
        }
      }
    },
    ngtemplates: {
      app: {
        cwd: 'app',
        src: ['**/*.html', '**/**/*.html', '**/**/**/*.html', '**/**/**/**/*.html'],
        dest: 'public/js/app.templates.js',
        options: {
          htmlmin: { collapseWhitespace: true, collapseBooleanAttributes: true }
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'public/styles/style.min.css': [
            'bower/toastr/toastr.min.css',
            'bower/animate.css/animate.min.css',
            'bower/angular-hotkeys/build/hotkeys.min.css',
            'bower/angular-loading-bar/build/loading-bar.min.css',
            'bower/bootstrap/less/bootstrap.css',
            'bower/font-awesome/less/font-awesome.css',
            'bower/select2/select2.css',
            'bower/select2-bootstrap3-css/select2-bootstrap.css',
            'bower/angular-ui-select2/docs/styles.css',
            'bower/angular-block-ui/angular-block-ui.min.css',
            'bower/angular-toastr/dist/angular-toastr.min.css',
            'less/style.css'
          ]
        }
      }
    },
    copy: {
      fonts: {
        files: [
          {
            expand: true,
            cwd: 'bower/font-awesome/fonts/',
            src: ['**'],
            dest: 'public/fonts/',
            flatten: true,
            filter: 'isFile'
          },
          {
            expand: true,
            cwd: 'bower/bootstrap/dist/fonts/',
            src: ['**'],
            dest: 'public/fonts/',
            flatten: true,
            filter: 'isFile'
          }
        ]
      },
      select2_images: {
        files: [
          {
            expand: true,
            cwd: 'bower/select2',
            src: ['**/*.png', '**/*.gif'],
            dest: 'public/styles/',
            flatten: false,
            filter: 'isFile'
          }
        ]
      }
    },
    jshint: {
      // define the files to lint
      files: ['app/*.js', 'app/**/*.js', 'app/**/**/*.js', 'app/**/**/**/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },
    less: {
      app: {
        options: {
          paths: ['bower/bootstrap/less', 'less']
        },
        files: {
          "bower/bootstrap/less/bootstrap.css": "bower/bootstrap/less/bootstrap.less",
          "bower/font-awesome/less/font-awesome.css": "bower/font-awesome/less/font-awesome.less",
          "less/style.css": "less/style.less"
        }
      }
    },
    concurrent: {
      preFlight: {
        tasks: ['jshint', 'less:app'],
        options: {
          logConcurrentOutput: true
        }
      },
      liftOff: {
        tasks: ['copy', 'cssmin', 'concat:vendor_header', 'concat:vendor_body', 'concat:app', 'ngtemplates'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    fileExists : {
      scripts : vendor_body
    },
    watch: {
      grunt: {
        files: 'Gruntfile.js',
        tasks: ['concurrent:preFlight', 'concurrent:liftOff'],
        options: {
          interrupt: true,
          livereload: true
        }
      },
      app: {
        files: '<%= jshint.files %>',
        tasks: ['jshint', 'concat:app'],
        options: {
          interrupt: true,
          livereload: true
        }
      },
      html: {
        files: [
          'index.html', 'app/*.html', 'app/**/*.html', 'app/**/**/*.html', 'app/**/**/**/*.html'
        ],
        tasks: ['ngtemplates'],
        options: {
          interrupt: true,
          livereload: true
        }
      },
      vendor_header: {
        files: '<%= concat.vendor_header.files %>',
        tasks: ['concat:vendor_header'],
        options: {
          interrupt: true,
          livereload: true
        }
      },
      vendor_body: {
        files: '<%= concat.vendor_body.files %>',
        tasks: ['concat:vendor_body'],
        options: {
          interrupt: true,
          livereload: true
        }
      },
      less: {
        files: ['bower/bootstrap/less/*.less', 'less/*.less'],
        tasks: ['less:app', 'cssmin'],
        options: {
          interrupt: true,
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-file-exists');

  grunt.registerTask('default', ['fileExists', 'concurrent:preFlight', 'concurrent:liftOff', 'watch']);
  grunt.registerTask('defaultWatchless', ['fileExists', 'concurrent:preFlight', 'concurrent:liftOff']);
};