/*
 * @Date: 2020-03-26 09:56:19
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-09 15:58:28
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import Vue from 'vue'
import { isNull, isObject, isArray, isFunction } from './check'

/**
 * @description: 将横线和下划线转为驼峰
 * @param {String}  str 
 * @return: 
 */
export function toHump(str = '', first2Up = false) {
    let result = str.replace(/(\_|\-)(\w)/g, function (all, s1, s2 = '') {
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
    } else {
        return data
    }

    if (isArray(data)) {
        for (let i = 0, j = data.length; i < j; i++) {
            let res = doDeepCopy(data[i], cacheList)
            // 去掉空值
            if (isNull(res)) continue
            o.push(res)
        }
    } else if (isObject(data)) {
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
 * @param {function} func 需要节流的函数 
 * @return: {function} 返回有节流功能的函数
 */
export function throttle (func, cd) {
    let timeId
    if (!isFunction(func)) return false
    return function () {
        if (timeId) return
        timeId = setTimeout(function () {
            func()
            timeId = null
        }, cd)
    }
}

/**
 * @description: 包装成防抖函数
 * @param {function} func 需要防抖的函数 
 * @return: {function} 返回有防抖功能的函数
 */
export function debounce (func, cd) {
    let timeId
    if (!isFunction(func)) return false
    return function () {
        if (!isNull(timeId)) {
            clearTimeout(timeId)
        }
        timeId = setTimeout(function () {
            func()
            timeId = null
        }, cd)
    }
}
