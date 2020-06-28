/*
 * @Date: 2020-03-25 09:49:34
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-23 12:50:20
 * @LastEditors: junfeng.liu
 * @Description: des
 */

const path = require('path')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HappyPackPlugin = require('happypack')
const NODE_ENV = process.env.NODE_ENV
const isDev = NODE_ENV === 'development'
const isPro = NODE_ENV === 'production'
const root_path = path.resolve('.')
const config = require('./config')

function resolve (dir) {
    return path.resolve(root_path, dir)
}

module.exports = {
    mode: process.env.NODE_ENV,
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            root: resolve('./'),
            packages: resolve('./packages'),
            '@': resolve('./src'),
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    // 不把vue打包，只在运行时引入
    externals: isPro ? {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        },
        'view-design': 'view-design'

    } : {},
    module: {
        noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                whitespace: 'condense'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: isPro ? 'happypack/loader' : 'babel-loader?cacheDirectory=true'
                    }
                ]
            },
            {
                test: /\.(svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: config.imgLimit,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: config.mediaLimit,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'media/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: config.fontsLimit,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'fonts/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        // moduleIds: 'hashed',
        // chunkIds: 'named',
        // splitChunks: {
        //     cacheGroups: {
        //         vendors: {
        //             name: 'chunk-vendors',
        //             test: /node_modules/,
        //             priority: -10,
        //             chunks: 'initial'
        //         },
        //         common: {
        //             name: 'chunk-common',
        //             minChunks: 2,
        //             priority: -20,
        //             chunks: 'initial',
        //             reuseExistingChunk: true
        //         }
        //     }
        // },
        minimize: isPro,
        minimizer: [
            // 用terser压缩js
            new TerserWebpackPlugin({
                terserOptions: {
                    output: {
                        comments: false
                    }
                },
                cache: true,
                parallel: true,
                sourceMap: config.sourceMap
            })
        ]
    },
    // performance: {
    //     hints: 'warning'
    // },
    plugins: [
        new ProgressBarPlugin(),
        new VueLoaderPlugin(),
        // 如果配置了mode则不用在配置process.env.NODE_ENV
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        //     }
        // })
    ].concat(isPro ? [
        new HappyPackPlugin({
            loaders: ['babel-loader?cacheDirectory=true']
        })
    ] : [])
}