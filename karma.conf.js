module.exports = function(config){
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // list of files / patterns to load in the browser
    files : [
	 // 	JASMINE,
  	 // 	JASMINE_ADAPTER,
  		'misc/demo/components/jquery/jquery.js',
	  	'misc/demo/components/angular/angular.js',
	  	'misc/demo/components/angular-mocks/angular-mocks.js',
	  	'src/**/*.js',
		//  'template/**/*.js',
	 	'test/*.js'
	],

    // list of files to exclude
    exclude: [

    ],

    preprocessors: {

    },

    proxies: {

    },

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: true,

    // frameworks to use
    frameworks: ['jasmine'],

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
              'PhantomJS'
              ],

    plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-script-launcher',
            'karma-jasmine',
            'karma-phantomjs-launcher'
            ],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};