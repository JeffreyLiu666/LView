/*
 * @Date: 2020-03-25 11:43:01
 * @Author: junfeng.liu
 * @LastEditTime: 2020-07-09 18:33:56
 * @LastEditors: junfeng.liu
 * @Description: des
 */
const fs = require('fs')
const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')
const { resolve, componentEntries } = require('./util')

const utilsList = fs.readdirSync(resolve('./src/utils'))
const mixinsList = fs.readdirSync(resolve('./src/mixins'))
const directivesList = fs.readdirSync(resolve('./src/directives'))
const constantList = fs.readdirSync(resolve('./src/constant'))
const appName = 'l-view-vue'
let externals = {}
let baseExternals = {
    vue: 'vue',
    'view-design': 'view-design'
}

Object.keys(componentEntries).forEach(k => {
    externals[`packages/${ k }`] = `${ appName }/lib/${ k }`
})

utilsList.forEach(file => {
    const basename = path.basename(file, '.js')
    externals[`@/utils/${ file }`] = `${ appName }/lib/utils/${ basename }`
    externals[`@/utils/${ basename }`] = `${ appName }/lib/utils/${ basename }`
})

mixinsList.forEach(file => {
    const basename = path.basename(file, '.js')
    externals[`@/mixins/${ file }`] = `${ appName }/lib/mixins/${ basename }`
    externals[`@/mixins/${ basename }`] = `${ appName }/lib/mixins/${ basename }`
})

directivesList.forEach(file => {
    const basename = path.basename(file, '.js')
    externals[`@/directives/${ file }`] = `${ appName }/lib/directives/${ basename }`
    externals[`@/directives/${ basename }`] = `${ appName }/lib/directives/${ basename }`
})

constantList.forEach(file => {
    const basename = path.basename(file, '.js')
    externals[`@/constant/${ file }`] = `${ appName }/lib/constant/${ basename }`
    externals[`@/constant/${ basename }`] = `${ appName }/lib/constant/${ basename }`
})

externals = [Object.assign({}, externals, baseExternals), webpackNodeExternals()]

module.exports = {
    baseExternals,
    externals,
    publicPath: '',
    sourceMap: false,
    imgLimit: 4096,
    mediaLimit: 4096,
    fontsLimit: 4096
}
