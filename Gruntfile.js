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
      'wi-json-palette': {
         simpleRun: {
            options: {
               repos: [{
                  path: './test/fixtures/simpleRun/',
                  prefix: 'core'
               }],
               output: './tmp/simpleRun.json'
            }
         },
         oneControl: {
            options: {
               repos: [{
                  path: './test/fixtures/oneControl/',
                  prefix: 'core'
               }],
               output: './tmp/oneControl.json'
            }
         },
         oneControlAndNonControl: {
            options: {
               repos: [{
                  path: './test/fixtures/oneControlAndNonControl/',
                  prefix: 'core'
               }],
               output: './tmp/oneControlAndNonControl.json'
            }
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
   grunt.registerTask('test', ['clean', 'wi-json-palette', 'nodeunit']);

   // By default, lint and run all tests.
   grunt.registerTask('default', ['jshint', 'test']);

};