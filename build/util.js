/*
 * @Date: 2020-04-17 16:30:52
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-30 11:15:54
 * @LastEditors: junfeng.liu
 * @Description: des
 */
const path = require('path')
const glob = require('glob')
const PATH_PACKAGES = 'packages'
const root_path = path.resolve('.')

exports.resolve = function (dir) {
    return path.resolve(root_path, dir)
}

exports.versionToInt =  function (ver) {
    if (!ver) return 0
    let arr = ver.split('.').map(item => {
        return item.padStart(3, '0')
    })
    return arr.join('')
}

exports.componentEntries = function () {
    const paths = glob.sync(PATH_PACKAGES + '/L*/index.js')
    let components = {}
    paths.forEach((item) => {
        const name = item.substring(item.indexOf('/L') + 1, item.indexOf('/index.js'))
        components[name] = item
    })
    return components
}
