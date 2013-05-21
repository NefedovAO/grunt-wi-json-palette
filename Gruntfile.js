/*
 * grunt-wi-json-palette
 * https://github.com/NefedovAO/grunt-wi-json-palette
 *
 * Copyright (c) 2013 NefedovAO
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

   // Project configuration.
   grunt.initConfig({
      jshint: {
         all: ['Gruntfile.js', 'tasks/*.js', '<%= nodeunit.tests %>', ],
         options: {
            jshintrc: '.jshintrc',
         },
      },

      // Before generating any new files, remove any previously-created files.
      clean: {
         tests: ['tmp'],
      },

      // Configuration to be run (and then tested).
      wi_json_palette: {
         /*default_options: {
            options: {
               "repos": [],
               "output": "./palette.json",
               "pretty": true,
               "indent": 3,
               "defaultGroup": "general"
            },
         },*/
         custom_options: {
         }
      },

      // Unit tests.
      nodeunit: {
         tests: ['test/*_test.js'],
      },

   });

   // Actually load this plugin's task(s).
   grunt.loadTasks('tasks');

   // These plugins provide necessary tasks.
   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-nodeunit');

   // Whenever the "test" task is run, first clean the "tmp" dir, then run this
   // plugin's task(s), then test the result.
   grunt.registerTask('test', ['clean', 'wi_json_palette', 'nodeunit']);

   // By default, lint and run all tests.
   grunt.registerTask('default', ['jshint' /*, 'test'*/ , "wi_json_palette"]);

};