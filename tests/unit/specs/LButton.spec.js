/*
 * @Date: 2020-04-17 14:25:55
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-17 14:52:40
 * @LastEditors: junfeng.liu
 * @Description: des
 */
const { expect } = require('chai')
const { createTest, destroy } = require('../util')
import LButton from 'packages/LButton'

describe('LButton', () => {
    let wrapper

    afterEach(() => {
        destroy(wrapper)
    })

    it('component name', () => {
        wrapper = createTest(LButton, {})
        expect(wrapper.name()).equal('l-button')
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