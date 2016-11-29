var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        singleRun: true,
        frameworks: ['mocha'],
        //gloaubing pattern
        // ** - subdirectory
        files: ['app/tests/**/*.test.jsx'],
        //specifying what we want to do with our test files
        preprocessors: {
            'app/tests/**/*.test.jsx': ['webpack', 'sourcemap']
        },
        // Shows which test pass and fail
        reporters: ['mocha'],
        // Sending config to mocha
        client: {
            mocha: {
                // Tells mocha if the test doesnt finish in 5 sec finish the test
                timeout: '5000'
            }
        },
        webpack: {
            webpack: webpackConfig,
            webpackServer: {
                noInfo: true
            }
        }

    });
};