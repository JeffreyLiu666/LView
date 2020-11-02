/*
 * @Date: 2020-03-26 09:56:19
 * @Author: junfeng.liu
 * @LastEditTime: 2020-10-30 22:42:49
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import Vue from 'vue'
import { isNull, isObject, isArray, isFunction, isString } from './check'

/**
 * @description: 将横线和下划线转为驼峰
 * @param {String}  str
 * @return:
 */
export function toHump (str = '', first2Up = false) {
    let result = str.replace(/(_|-)(\w)/g, function (all, s1, s2 = '') {
        return s2.toUpperCase()
    })
    if (!first2Up) return result
    return result.substring(0, 1).toUpperCase() + result.substring(1)
}

/**
 * @description: 自定义JSON.stringify()，可解决对象中循环引用造成的问题
 * @param {Object}  obj 需要stringify的对象
 * @return:
 */
export function jsonToString (obj) {
    let copyObj = deepCopy(obj)
    let cache = []
    // 可解决对象中循环引用造成的问题
    // JSON.stringify的第二个参数可以预处理
    // JSON.stringify的第二个参数会影响原对象，需要深拷贝在使用
    let str = JSON.stringify(copyObj, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                return // 如果返回undefined则JSON.stringify会忽略该key
            }
            cache.push(value)
        }
        return value
    })
    cache = null
    return str
}

/**
 * @description: 深拷贝
 * @param {Any} 要深拷贝的变量
 * @return: 深拷贝后的变量
 */
export function deepCopy (data) {
    let cacheList = []
    let result = doDeepCopy(data, cacheList)
    cacheList = null
    return result
}

function doDeepCopy (data, cacheList) {
    const t = (typeof data)
    let o

    // 考虑性能问题，不拷贝vue实例
    if (data instanceof Vue) return

    if (data && t === 'object') {
        // 避免循环引用造成的问题
        if (cacheList.indexOf(data) !== -1) {
            return
        }
        cacheList.push(data)
        o = isObject(data) ? {} : []
    }
    else {
        return data
    }

    if (isArray(data)) {
        for (let i = 0, j = data.length; i < j; i++) {
            let res = doDeepCopy(data[i], cacheList)
            // 去掉空值
            if (isNull(res)) continue
            o.push(res)
        }
    }
    else if (isObject(data)) {
        for (let k in data) {
            let res = doDeepCopy(data[k], cacheList)
            // 去掉空值
            if (isNull(res)) continue
            o[k] = res
        }
    }
    return o
}

/**
 * @description: 包装成节流函数
 * @param {Function}    func        需要节流的函数
 * @param {Number}      cd          cd时间
 * @param {Boolean}     reverse     是否变成先触发，后在一段时间内不能触发
 * @return: {Function} 返回有节流功能的函数
 */
export function throttle (func, cd = 300, reverse = false) {
    let timeId
    if (!isFunction(func)) return false
    return function (...args) {
        if (!isNull(timeId)) return
        // 如果开启reverse，则会直接调用，而在一段时间内进入CD
        if (reverse) func(...args)
        timeId = setTimeout(function () {
            if (!reverse) func(...args)
            timeId = null
        }, cd)
    }
}

/**
 * @description: 包装成防抖函数
 * @param {Function}    func        需要防抖的函数
 * @param {Number}      cd          cd时间
 * @param {Boolean}     reverse     是否变成先触发，后在一段时间内不能触发
 * @return: {function} 返回有防抖功能的函数
 */
export function debounce (func, cd = 300, reverse = false) {
    let timeId
    if (!isFunction(func)) return false
    return function (...args) {
        if (!isNull(timeId)) {
            clearTimeout(timeId)
        }
        else if (reverse) {
            func(...args)
        }
        timeId = setTimeout(function () {
            if (!reverse) func(...args)
            timeId = null
        }, cd)
    }
}

/**
 * @description: 向上寻找最近的匹配组件
 * @param {Object}      context         上下文
 * @param {String}      componentName   单个匹配项
 * @param {Array}       componentNames  多个匹配项
 * @return: {Object}    匹配的组件上下文
 */
export function findComponentUpward (context, componentName, componentNames) {
    if (typeof componentName === 'string') {
        componentNames = [componentName]
    }
    else {
        componentNames = componentName
    }

    let parent = context.$parent
    let name = parent.$options.name
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.$parent
        if (parent) name = parent.$options.name
    }
    return parent
}

/**
 * @description: 向上寻找所有匹配组件
 * @param {Object}      context         上下文
 * @param {String}      componentName   单个匹配项
 * @return: {Object}    匹配的组件上下文
 */
export function findComponentsUpward (context, componentName) {
    let componentNames = typeof componentName === 'string' ? [componentName] : componentName
    let parents = []
    const parent = context.$parent
    if (parent) {
        if (componentNames.includes(parent.$options.name)) parents.push(parent)
        return parents.concat(findComponentsUpward(parent, componentName))
    }
    else {
        return []
    }
}

/**
 * @description: 获取滚动条宽度
 * @return: {Number}    滚动条宽度
 */
export function getScrollBarWidth () {
    const el = document.createElement('p')
    const styles = {
        width: '100px',
        height: '100px',
        overflowY: 'scroll'
    }

    for (let i in styles) {
        el.style[i] = styles[i]
    }

    // 将元素加到body里面
    document.body.appendChild(el)

    const scrollBarWidth = el.offsetWidth - el.clientWidth
    // 将添加的元素删除
    el.remove()
    return scrollBarWidth
}

/**
 * @description: 保留指定位数且不进位
 * @param {Number}      num         数组或字符串
 * @param {Number}      len         保留位数
 * @return: {String}    匹配的组件上下文
 */
export function toFixed (num, len) {
    if (isNaN(len) || len < 0) throw new Error('位数需要为数字且不能为负数')
    if (isNaN(num)) return NaN
    const arr = num.toString().split('.')
    if (len === 0) {
        return arr[0]
    }
    if (arr.length === 1) {
        return arr[0] + '.' + '0'.padEnd(len, '0')
    } else {
        return arr[0] + '.' + arr[1].slice(0, len).padEnd(len, '0')
    }
}
