// Gruntfile

module.exports = function(grunt) {
  'use strict'
  require('load-grunt-tasks')(grunt);

  var baseJsSourcePath = 'src/js/',
      fileToBuild = 'dist/js/' + 'jquery.ychat.js';

  grunt.initConfig({
    bower: {
      install: {
        options: {
          targetDir: './dist/js/lib',
          layout: 'byType',
          install: true,
          verbose: true,
          copy: true
        }
      }
    },
    concat: {
      dist: {
        src: '<%= customBuild.files %>',
        dest: fileToBuild
      },
      css: {
        src: ['dist/css/ychat.css', 'dist/css/ychat_buttons_sprite.css', 'dist/css/yemoticons_sprite.css'],
        dest: 'dist/css/ychat.css'
      }
    },
    wrap: {
      modules: {
        src: [fileToBuild],
        options: {
          wrapper: [';(function($, undefined) {\n', '\n}(jQuery));'],
          indent: '  ',
          separator: ''
        }
      }
    },
    uglify: {
      main: {
        files: {
          'dist/js/jquery.ychat.min.js': ['dist/js/jquery.ychat.js']
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ['src/css']
        },
        files: {
          'dist/css/ychat.css': 'src/css/ychat.less'
        }
      }
    },

    montage: {
      buttons: {
        files: {
          "dist/images": [
            "src/images/buttons/*.png"
          ]
        },
        options: {
          size: 16,
          prefix: ".ychat-button",
          outputImage: "../images/ychat_buttons_sprite.png",
          outputStylesheet: "../css/ychat_buttons_sprite.css",
          magick: {
            background: 'none'
          }
        }
      },
      yemoticons: {
        files: {
          "dist/images": [
            "src/images/yemoticons/*.png"
          ]
        },
        options: {
          size: 16,
          prefix: ".yemoticon",
          outputImage: "../images/yemoticons_sprite.png",
          outputStylesheet: "../css/yemoticons_sprite.css",
          magick: {
            background: 'none'
          }
        }
      }
    },

    copy: {
      main: {
        files: [
          {
            src: ['src/index.html'], 
            dest: 'dist/index.html'
          },
          {
            src: ['src/js/ychat_local_adapter.js'], 
            dest: 'dist/js/ychat_local_adapter.js'
          },
          {
            expand: true,
            cwd: 'src/images/dummy/',
            src: '*.png',
            dest: 'dist/images/dummy/'
          }
        ]
      }
    },
    clean: {
      dist: ['tmp', 'dist']
    },

    jshint: {
      dev: {
        files: [
          [
            'src/js/ychat_namespace.js',
            'src/js/ychat_cookies.js',
            'src/js/ychat_container.js',
            'src/js/ychat_content.js',
            'src/js/ychat_chat_container.js',
            'src/js/ychat_chat_controller.js',
            'src/js/ychat_application_view.js',
            'src/js/ychat_application_controller.js',
            'src/js/ychat_constants.js'
          ]
        ],
        options: {
          curly: true,
          multistr: true,
          quotmark: 'single',
          camelcase: true,
          bitwise: false,
          unused: true,
          eqeqeq: true,
          indent: 2,
          immed: true,
          latedef: true,
          newcap: true,
          noarg: true,
          sub: true,
          boss: true,
          es5: true,
          eqnull: true,
          evil: true,
          scripturl: true,
          smarttabs: true,
          maxparams: 5,
          maxdepth: 3,
          maxlen: 100,
          globals: {}
        }
      },
    },

    jsdoc : {
      dist : {
        src: ['src/js/**/*.js'],
        options: {
          destination: 'doc'
        }
      }
    },

    todo: {
      options: {
        verbose: true,
        marks: [
          {
            name: 'TODO',
            pattern: /TODO|\@todo/,
            color: "magenta"
          }
        ]
      },
      src : [
        'src/js/ychat_namespace.js',
        'src/js/ychat_cookies.js',
        'src/js/ychat_container.js',
        'src/js/ychat_content.js',
        'src/js/ychat_chat_container.js',
        'src/js/ychat_chat_controller.js',
        'src/js/ychat_application_controller.js',
        'src/js/ychat_application_view.js',
        'src/js/ychat_constants.js',
        'test/**/*.js'
      ]
    },

    karma: {
      unit: {
        configFile: 'test/config/karma.conf.js',
        keepalive: true
      }
    }
  });

  grunt.registerTask('setup', 'build task', function() {

    var defaultFiles = [
          'ychat_namespace',
          'ychat_cookies',
          'ychat_container',
          'ychat_content',
          'ychat_chat_container',
          'ychat_chat_controller',
          'ychat_application_view',
          'ychat_application_controller',
          'ychat_methods',
          'ychat',
          'ychat_constants'
        ],
        args = this.args, customFiles = [], index, i = -1;

    if (args.length) {
      while (++i < args.length) {
        index = defaultFiles.indexOf(args[i]);
        if (index !== -1) {
          defaultFiles.splice(index, 1);
        }
      }
    }

    customFiles = defaultFiles.map(function(currentFile) {
      return baseJsSourcePath + currentFile + '.js';
    });

    grunt.config.set('customBuild.files', customFiles);
    grunt.task.run('bower:install');
  });

  grunt.registerTask('build', ['clean:dist', 'setup', 'montage', 'less', 'concat', 'wrap', 'copy', 'uglify']);
  grunt.registerTask('lint', ['setup', 'jshint:dev']);
  grunt.registerTask('spec', ['karma:unit']);
  grunt.registerTask('all', ['lint', 'todo', 'spec', 'jsdoc', 'build']);

  grunt.registerTask('default', ['build']);

};
