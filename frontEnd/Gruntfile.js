module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'js/script.js'],
      options:{
        esversion : 6
      }
    },
    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: ['css/*.css']
      },
      lax: {
        options: {
          import: false
        },
        src: ['css/*.css']
      }
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'css/style.css': 'sass/style.scss',       // 'destination': 'source'
        }
      }
    },
    watch: {
    scripts: {
      files: ['Gruntfile.js','js/script.js'],
      tasks: ['sass','jshint','csslint'],
      options: {
        spawn: false,
        },
      },
    },
  });

  // Load the plugin that provides the "uglify" task.
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('ugly', ['uglify']);

};
