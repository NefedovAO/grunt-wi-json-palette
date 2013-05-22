/*
 * grunt-wi-json-palette
 * https://github.com/NefedovAO/grunt-wi-json-palette
 *
 * Copyright (c) 2013 NefedovAO
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

   // Please see the Grunt documentation for more information regarding task
   // creation: http://gruntjs.com/creating-tasks
   grunt.registerMultiTask('wi-json-palette', 'Creates json palette with wi controls.', function() {
      // Merge task-specific and/or target-specific options with these defaults.
      var options = this.options({
         "repos": [],
         "output": "./palette.json",
         "pretty": true,
         "indent": 3,
         "defaultGroup": "general"
      });

      var done = this.async();

      var fs = require('fs'),
         path = require('path'),
         configs = {},
         controlsCount = 0,
         repos = options.repos,
         output = options.output,
         pretty = options.pretty,
         indent = options.indent,
         defaultGroup = options.defaultGroup;

      function Parallel(count) {
         this.count = count;
         this.ready = 0;
      }

      Parallel.prototype = {
         oneReady: function() {
            ++this.ready;
            if(this.count === this.ready && this.callback) {
               this.callback(this.result);
            }
         }
      };

      function readDir(dirPath, callback) {
         fs.readdir(dirPath, function(err, files) {
            if(err) {
               grunt.log.error('Read dir error', err);
               done(err);
            } else {
               callback(files);
            }
         });
      }

      function fileStat(filePath, parallel) {
         fs.stat(filePath, function(err, stat) {
            if(!err) {
               if(stat.isDirectory()) {
                  fileList(filePath, function(files) {
                     parallel.result = parallel.result.concat(files);
                     parallel.oneReady();
                  });
               } else if(stat.isFile()) {
                  if(filePath.indexOf('.json') === filePath.length - 5) {
                     parallel.result.push(filePath);
                  }
                  parallel.oneReady();
               }
            } else {
               console.log('file stat error', err);
               parallel.oneReady();
            }
         });
      }

      function fileList(dirPath, callback) {
         var res = [];
         readDir(dirPath, function(files) {
            if(files && files.length) {
               var parallel = new Parallel(files.length);
               parallel.result = res;
               parallel.callback = callback;
               files.forEach(function(file) {
                  var filePath = path.join(dirPath, file);
                  fileStat(filePath, parallel);
               });
            } else {
               callback();
            }
         });
      }

      function isCompontent(object) {
         return object['name'] !== undefined && object['title'] !== undefined && object['version'] !== undefined && object['spec'] !== undefined;
      }

      function appendComponent(prefix, object) {
         var group = object.group,
            root = configs[prefix];
         if(typeof(group) !== 'string') {
            group = defaultGroup;
         }
         if(!root[group]) {
            root[group] = [];
         }
         root[group].push(object);
         ++controlsCount;
      }

      function readFile(file, prefix, parallel) {
         fs.readFile(file, function(err, data) {
            if(err) {
               console.log('readFile error', err);
            } else {
               var object;
               try {
                  object = JSON.parse(data);
                  if(isCompontent(object)) {
                     appendComponent(prefix, object);
                  }
               } catch(e) {
                  console.log('File ' + file + ' has incorrect json data');
               }
            }
            parallel.oneReady();
         });
      }

      function readFiles(prefix, files, callback) {
         if( files && files.length ){
            var parallel = new Parallel(files.length);
            parallel.callback = callback;
            configs[prefix] = {};
            files.forEach(function(file) {
               readFile(file, prefix, parallel);
            });
         }
         else{
            callback();
         }
      }

      function buildRepo(repo, callback) {
         fileList(repo.path, function(files) {
            readFiles(repo.prefix, files, callback);
         });
      }

      function buildRepos(repos, callback) {
         if( repos.length ){
            var parallel = new Parallel(repos.length);
            parallel.callback = callback;
            repos.forEach(function(repo) {
               buildRepo(repo, parallel.oneReady.bind(parallel));
            });
         }
         else{
            callback();
         }
      }

      function writeResult() {
         var data;
         if(pretty) {
            data = JSON.stringify(configs, null, indent);
         } else {
            data = JSON.stringify(configs);
         }
         grunt.file.write(output, data);
         grunt.log.ok(controlsCount + ' control' + (controlsCount === 1 ? '' : 's') + ' appended to palette at ' + output);
         done();
      }

      buildRepos(repos, writeResult);

      // Iterate over all specified file groups.
      /*this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });*/
   });

};