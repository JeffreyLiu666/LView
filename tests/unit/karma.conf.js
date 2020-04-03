/*
 * @Date: 2020-04-01 09:53:10
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-03 09:11:04
 * @LastEditors: junfeng.liu
 * @Description: des
 */
const webpackConf = require('../../build/webpack.config.js')

module.exports = function (config) {
    config.set({
        singleRun: false,
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
                grep: 'LShowImg'
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