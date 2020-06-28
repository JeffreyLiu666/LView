/*
 * @Date: 2020-03-25 09:49:34
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-28 15:03:29
 * @LastEditors: junfeng.liu
 * @Description: des
 */

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const NODE_ENV = process.env.NODE_ENV
const isDev = NODE_ENV === 'development'
const isPro = NODE_ENV === 'production'
const root_path = path.resolve('.')
const config = require('./config')
const webpackConfig = require('./webpack.base')
const merge = require('webpack-merge')

function resolve (dir) {
    return path.resolve(root_path, dir)
}

module.exports = merge(webpackConfig, {
    entry: {
        // 如果是生产则打包组件，否则运行vue实例
        LView: isDev ? resolve('./src/index.js') : resolve('./packages/index.js')
    },
    output: {
        path: resolve('./lib'),
        publicPath: '/dist/',
        filename: 'index.js',
        chunkFilename: '[id].js',
        libraryTarget: 'umd',
        // 使用默认导出
        libraryExport: 'default',
        // 在script引入中表示通过LView变量使用，其它同理
        library: 'LView',
        // 将UMD的构建过程中的 AMD 模块进行命名，否则就使用匿名的 define。
        umdNamedDefine: true,
        globalObject: isDev ? 'window' : 'typeof self !== \'undefined\' ? self : this'
    },
    devServer: {
        openPage: 'dist/index.html',
        hot: true,
        noInfo: true,
        overlay: true,
        open: false
    },
    module: {
        rules: [
            {
                test: /\.(c|le)ss$/,
                use: isPro ? [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isPro
                        }
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
                ] : ['vue-style-loader', 'css-loader', 'less-loader']
            },
        ]
    },
    plugins: isPro ? [
        new MiniCssExtractPlugin({
            filename: 'css/lView.css',
            chunkFilename: 'css/[name].css'
        }),
        new OptimizeCssnanoPlugin({
            sourceMap: config.sourceMap,
            cssnanoOptions: {
                preset: [
                    'default',
                    {
                        mergeLonghand: false,
                        cssDeclarationSorter: false
                    }
                ]
            }
        })
    ] : [
        new HtmlWebpackPlugin({
            title: 'l-view',
            template: resolve('./src/index.html')
        })
    ]
})