/*
 * @Date: 2020-05-13 10:09:59
 * @Author: junfeng.liu
 * @LastEditTime: 2020-05-13 11:02:08
 * @LastEditors: junfeng.liu
 * @Description: des
 */
const { expect } = require('chai')
const { createTest, destroy } = require('../util')
import LLoading from 'packages/LLoading'
import LButton from 'packages/LButton'
const prefixCls = 'l-loading'

describe('LLoading', () => {
    let wrapper

    afterEach(() => {
        destroy(wrapper)
    })

    it('component name', () => {
        wrapper = createTest(LLoading, {}, true)
        expect(wrapper.name()).equal('l-loading')
    })

    it('transfer', async () => {
        wrapper = createTest(LLoading, {
            propsData: {
                transfer: true
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.' + prefixCls).element.parentElement.tagName).equal('BODY')
    })

    it('mask', async () => {
        wrapper = createTest(LLoading, {
            propsData: {
                mask: true
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.' + prefixCls).classes(`${prefixCls}-mask`)).to.true
    })

    it('fix', async () => {
        wrapper = createTest(LLoading, {
            propsData: {
                fix: true
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.' + prefixCls).classes(`${prefixCls}-fix`)).to.true
    })

    it('show & hide', async () => {
        wrapper = createTest(LButton, {}, true)
        const vm = wrapper.vm
        await vm.$nextTick()
        vm.$loading.show()
        await vm.$nextTick()
        expect(document.querySelector('.' + prefixCls)).exist
        vm.$loading.hide()
        await vm.$nextTick()
        expect(document.querySelector('.' + prefixCls)).not.exist
    })
})
