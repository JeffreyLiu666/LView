/*
 * @Date: 2020-03-26 22:34:55
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-27 09:46:38
 * @LastEditors: junfeng.liu
 * @Description: des
 */
const path = require('path')
const merge = require('webpack-merge')
const webpackConfig = require('./webpack.base')
const components = require('../components')
const root_path = path.resolve('.')
const config = require('./config')

function resolve (dir) {
    return path.resolve(root_path, dir)
}

module.exports = merge(webpackConfig, {
    entry: components,
    output: {
        path: resolve('./dist'),
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[id].js',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.(c|le)ss$/,
                use: [
                    {
                        loader: 'vue-style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: config.sourceMap,
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: config.sourceMap,
                            plugins: [require('autoprefixer')]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: config.sourceMap,
                            javascriptEnabled: true
                        }
                    }
                ]
            },
        ]
    }
})