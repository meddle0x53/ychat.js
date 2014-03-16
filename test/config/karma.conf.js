module.exports = function(karma) {
  karma.set({
    basePath: '../..',
    frameworks: ['jasmine'],

    files: [
      'bower_components/jquery/dist/jquery.min.js',
      'src/js/ychat_namespace.js',
      'src/js/ychat_cookies.js',
      'src/js/ychat_container.js',
      'src/js/ychat_content.js',
      'src/js/ychat_chat_container.js',
      'src/js/ychat_chat_controller.js',
      'src/js/ychat_application_view.js',
      'src/js/ychat_application_controller.js',
      'src/js/ychat_methods.js',
      'src/js/ychat.js',
      'src/js/ychat_constants.js',
      'src/js/ychat_local_adapter.js',
      'test/spec_helper.js',
      'test/unit/**/*.spec.js'
    ],

    browsers: ['PhantomJS'],
    captureTimeout: 5000,
    singleRun: true,
    reportSlowerThan: 500,

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher'
    ]
  });
};
