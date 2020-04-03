/*
 * @Date: 2020-04-01 10:28:31
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-02 09:56:08
 * @LastEditors: junfeng.liu
 * @Description: des
 */
const { mount, createLocalVue } = require('@vue/test-utils')
import iView from 'view-design'

/**
 * 回收 wrapper
 * @param  {Object} wrapper
 */
export function destroy (wrapper) {
    if (!wrapper) return
    wrapper.destroy && wrapper.destroy()
};

/**
 * 创建一个测试组件实例
 * @link http://vuejs.org/guide/unit-testing.html#Writing-Testable-Components
 * @param  {Object}  Compo          - 组件对象
 * @param  {Object}  opts           - mount 函数选项
 * @return {Object}  vm
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
 * @description: 创建一个localVue
 * @return: {Vue} localVue
 */
export function getLocalVue () {
    const localVue = createLocalVue()

    localVue.use(iView)

    return localVue
}
