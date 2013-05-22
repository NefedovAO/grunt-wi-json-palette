# grunt-wi-json-palette

> JSON palette builder for wi controls

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-wi-json-palette --save-dev
```

Or you may want add it to dependencies:
```json
"devDependencies": {
 "grunt-wi-json-palette": "~0.1.0"
}
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-wi-json-palette');
```

## The "wi-json-palette" task

### Overview
In your project's Gruntfile, add a section named `wi-json-palette` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
   'wi-json-palette': {
      subTaskName: {
         options: {
            // Task-specific options go here.
         }
      }
   }
})
```

### Options

#### options.repos
Type: `Array`
Default value: `[]`

An array with objects with repositories info. Each object must contain 2 fields: `path` and `prefix`. `prefix` would be used in output file, `path` would be searched recusevly.

#### options.output
Type: `String`
Default value: `./palette.json`

File name with resulting json. All directories would be created automatically.

#### options.pretty
Type: `Boolean`
Default value: `true`

Use pretty print for json.

#### options.indent
Type: `Number`
Default value: `3`

Number of spaces for pretty print.

#### options.defaultGroup
Type: `String`
Default value: `general`

Default controls group. If control doesn't specify it, would be used `defaultGroup` for it.

### Usage Examples

#### Simple run
Building palette with one control.

```js
grunt.initConfig({
  'wi-json-palette': {
      simpleRun: {
         options: {
            repos: [{
               path: '/path/to/your/controls/folder/',
               prefix: 'prefix/for/that/controls'
            }],
            output: './palette.json'
         }
      }
   }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
