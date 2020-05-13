/*
 * @Date: 2020-04-17 14:25:55
 * @Author: junfeng.liu
 * @LastEditTime: 2020-05-13 10:08:22
 * @LastEditors: junfeng.liu
 * @Description: des
 */
const { expect } = require('chai')
const { createTest, destroy } = require('../util')
import LButton from 'packages/LButton'
const prefixCls = 'l-btn'

describe('LButton', () => {
    let wrapper

    afterEach(() => {
        destroy(wrapper)
    })

    it('component name', () => {
        wrapper = createTest(LButton, {}, true)
        expect(wrapper.name()).equal('l-button')
    })

    it('type', async () => {
        wrapper = createTest(LButton, {
            propsData: {
                type: 'primary'
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('button').classes(`${prefixCls}-primary`)).to.true
    })

    it('ghost', async () => {
        wrapper = createTest(LButton, {
            propsData: {
                ghost: true
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('button').classes(`${prefixCls}-ghost`)).to.true
    })

    it('width', async () => {
        wrapper = createTest(LButton, {
            propsData: {
                width: 80
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('button').element.style.width).equal('80px')
    })

    it('size', async () => {
        wrapper = createTest(LButton, {
            propsData: {
                size: 'large'
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('button').classes(`${prefixCls}-large`)).to.true
    })

    it('shape', async () => {
        wrapper = createTest(LButton, {
            propsData: {
                shape: 'circle'
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('button').classes(`${prefixCls}-circle`)).to.true
    })

    it('long', async () => {
        wrapper = createTest(LButton, {
            propsData: {
                long: true
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('button').classes(`${prefixCls}-long`)).to.true
    })

    it('htmlType', async () => {
        wrapper = createTest(LButton, {
            propsData: {
                htmlType: 'submit'
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('button').attributes('type')).equal('submit')
    })

    it('disabled', async () => {
        wrapper = createTest(LButton, {
            propsData: {
                disabled: true
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('button').attributes('disabled')).equal('disabled')
    })

    it('loading', async () => {
        wrapper = createTest(LButton, {
            propsData: {
                loading: true
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('button').classes(`${prefixCls}-loading`)).to.true
        expect(wrapper.find('.ivu-icon.ivu-icon-ios-loading').exists()).to.true
    })

    it('icon', async () => {
        wrapper = createTest(LButton, {
            propsData: {
                icon: 'ios-search'
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.ivu-icon.ivu-icon-ios-search').exists()).to.true
    })

    it('throttle', async () => {
        let startDate
        wrapper = createTest(LButton, {
            propsData: {
                throttle: true,
                delay: 500
            },
            listeners: {
                click () {
                    let endDate = new Date()
                    expect(endDate - startDate).within(500, 600)
                }
            }
        }, true)
        await wrapper.vm.$nextTick()
        startDate = new Date()
        wrapper.find('button').trigger('click')
        setTimeout(() => { wrapper.find('button').trigger('click') }, 200)
    })

    it('debounce', async () => {
        let startDate
        wrapper = createTest(LButton, {
            propsData: {
                debounce: true,
                delay: 500
            },
            listeners: {
                click () {
                    let endDate = new Date()
                    expect(endDate - startDate).above(700)
                }
            }
        }, true)
        await wrapper.vm.$nextTick()
        startDate = new Date()
        wrapper.find('button').trigger('click')
        setTimeout(() => { wrapper.find('button').trigger('click') }, 200)
    })

    it('earlyTrigger', async () => {
        let startDate
        wrapper = createTest(LButton, {
            propsData: {
                earlyTrigger: true,
                debounce: true,
                delay: 500
            },
            listeners: {
                click () {
                    let endDate = new Date()
                    expect(endDate - startDate).below(100)
                }
            }
        }, true)
        await wrapper.vm.$nextTick()
        startDate = new Date()
        wrapper.find('button').trigger('click')
        setTimeout(() => { wrapper.find('button').trigger('click') }, 200)
    })
})