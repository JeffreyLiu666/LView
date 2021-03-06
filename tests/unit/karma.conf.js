/*
 * @Date: 2020-04-01 09:53:10
 * @Author: junfeng.liu
 * @LastEditTime: 2020-05-13 12:41:24
 * @LastEditors: junfeng.liu
 * @Description: des
 */
const webpackConf = require('../../build/webpack.config.js')

module.exports = function (config) {
    config.set({
        singleRun: true,
        browsers: ['Chrome'],
        frameworks: ['mocha'],
        reporters: ['spec', 'coverage'],
        files: ['./index.js'],
        preprocessors: {
            './index.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConf,
        webpackMiddleware: {
            noInfo: true
        },
        client: {
            mocha: {
                timeout: 4000,
                // grep: 'LNumberInput'
            }
        },
        coverageReporter: {
            dir: './coverage',
            reporters: [
                { type: 'lcov', subdir: '.' },
                { type: 'text-summary' }
            ]
        },
    })
}