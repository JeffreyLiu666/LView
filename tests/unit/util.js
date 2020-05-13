/*
 * @Date: 2020-04-01 10:28:31
 * @Author: junfeng.liu
 * @LastEditTime: 2020-05-13 11:00:56
 * @LastEditors: junfeng.liu
 * @Description: des
 */
const { mount, createLocalVue } = require('@vue/test-utils')
import iView from 'view-design'
import lView from 'packages'

/**
 * 回收 wrapper
 * @param  {Object} wrapper
 */
export function destroy (wrapper) {
    wrapper?.destroy && wrapper.destroy()
};

/**
 * 创建一个测试组件包裹器
 * @link http://vuejs.org/guide/unit-testing.html#Writing-Testable-Components
 * @param  {Component}  Compo          - 组件对象
 * @param  {Object}  opts           - mount 函数选项
 * @return {Wrapper}  wrapper
 */
export function createTest (Compo, opts = {}, setLocalVue = false) {
    const wrapper = mount(
        Compo, 
        Object.assign({
            attachToDocument: true, 
            localVue: setLocalVue ? getLocalVue() : undefined
        }, opts))

    return wrapper
}

/**
 * 使用template创建一个Vue实例
 * @link http://vuejs.org/guide/unit-testing.html#Writing-Testable-Components
 * @param  {Object, String}  Compo          - 组件对象
 * @param  {Object}  opts           - mount 函数选项
 * @return {Wrapper}  wrapper
 */
export function createVue (Compo, opts = {}, setLocalVue = false) {
    if (typeof Compo === 'string') {
        Compo = { template: Compo }
    }
    const wrapper = mount(
        Compo, 
        Object.assign({
            attachToDocument: true, 
            localVue: setLocalVue ? getLocalVue() : undefined
        }, opts))
    
    return wrapper
}

/**
 * @description: 创建一个localVue
 * @return: {Vue} localVue
 */
export function getLocalVue () {
    const localVue = createLocalVue()

    localVue.use(iView)
    localVue.use(lView)

    return localVue
}

/**
 * 等待 ms 毫秒，返回 Promise
 * @param {Number} ms
 */
export function wait (ms = 100) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}
