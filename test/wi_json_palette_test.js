'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.wi_json_palette = {
   setUp: function(done){
      // setup here if necessary
      done();
   },
   simpleRun: function(test){
      test.expect(1);

      var actual = grunt.file.read('tmp/simpleRun.json');
      var expected = grunt.file.read('test/expected/simpleRun.json');
      test.equal(actual, expected, 'Result file must be empty object "{}"');

      test.done();
   },
   oneControl: function(test){
      test.expect(1);

      var actual = grunt.file.read('tmp/oneControl.json');
      var expected = grunt.file.read('test/expected/oneControl.json');
      test.equal(actual, expected, 'Result file must contain the same control file with prefix');

      test.done();
   },
   oneControlAndNonControl: function(test){
      test.expect(1);

      var actual = grunt.file.read('tmp/oneControlAndNonControl.json');
      var expected = grunt.file.read('test/expected/oneControlAndNonControl.json');
      test.equal(actual, expected, 'Result file must contain exactly one control, without mismatched data');

      test.done();
   }
};