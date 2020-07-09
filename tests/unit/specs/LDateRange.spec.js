/*
 * @Date: 2020-04-01 15:00:44
 * @Author: junfeng.liu
 * @LastEditTime: 2020-07-09 17:32:51
 * @LastEditors: junfeng.liu
 * @Description: des
 */
const { expect } = require('chai')
const { createTest, destroy } = require('../util')
const { formatDate, moveDate } = require('packages/../src/utils/date')
import LDateRange from 'packages/LDateRange'

describe('LDateRange', () => {
    let wrapper

    afterEach(() => {
        destroy(wrapper)
    })

    it('component name', () => {
        wrapper = createTest(LDateRange, {}, true)
        expect(wrapper.name()).equal('l-date-range')
    })

    it('default', async () => {
        wrapper = createTest(LDateRange, {
            propsData: {
                default: '1month'
            }
        }, true)
        const start = formatDate(moveDate(new Date(), { M: -1 }))
        const end = formatDate(new Date())
        expect(wrapper.emitted('input')[0][0]).eql([start, end])
    })

    it('placeholder', async () => {
        wrapper = createTest(LDateRange, {
            propsData: {
                placeholder: '123321'
            }
        }, true)
        expect(wrapper.find('.ivu-input').attributes().placeholder).equal('123321')
    })

    it('choose range', async () => {
        wrapper = createTest(LDateRange, {}, true)
        const vm = wrapper.vm
        // 这里需要nextTick，否则trigger无效
        await vm.$nextTick()
        const dom = wrapper.findAll('.ivu-picker-panel-shortcut').at(0)
        expect(dom.text()).equal('今天')
        dom.trigger('click')
        // 这里需要等待input事件触发
        await vm.$nextTick()
        const start = formatDate(new Date())
        const end = formatDate(new Date())
        expect(wrapper.emitted('input')[1][0]).eql([start, end])
    })
})
