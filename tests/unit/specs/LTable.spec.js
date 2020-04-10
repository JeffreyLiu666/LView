/*
 * @Date: 2020-04-07 11:56:51
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-10 10:03:18
 * @LastEditors: junfeng.liu
 * @Description: des
 */
const { expect } = require('chai')
const { createTest, destroy } = require('../util')
import LTable from 'packages/LTable'

describe('LTable', () => {
    let wrapper

    afterEach(() => {
        destroy(wrapper)
    })

    it('component name', () => {
        wrapper = createTest(LTable, {}, true)
        expect(wrapper.name()).equal('l-table')
    })

    it('dataFunc', async () => {
        wrapper = createTest(LTable, {
            propsData: {
                data: [{num: 10}],
                columns: [
                    {title: '测试', key: 'num', dataFunc: (val) => {
                        return val + 1
                    }}
                ]
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('td .ivu-table-cell').find('span').html()).equal('<span>11</span>')
    })

    it('buttons', async () => {
        wrapper = createTest(LTable, {
            propsData: {
                data: [{}],
                columns: [
                    {title: '测试', key: 'btns', buttons: [
                        { label: '按钮', action: 'test' }
                    ], onClick ({ action }) {
                        // 这里算组件内的判断
                        expect(action === 'test').to.true
                    }}
                ]
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('td .l-table-td-btns').contains('button')).to.true
        expect(wrapper.find('button').text()).equal('按钮')
        wrapper.find('button').trigger('click')
    })

    it('links', async () => {
        wrapper = createTest(LTable, {
            propsData: {
                data: [{}],
                columns: [
                    {title: '测试', key: 'links', links: [
                        { label: 'link', action: 'test' }
                    ], onClick ({ action }) {
                        // 这里算组件内的判断
                        expect(action === 'test').to.true
                    }}
                ]
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('td .l-table-td-links').contains('a')).to.true
        expect(wrapper.find('a').text()).equal('link')
        wrapper.find('a').trigger('click')
    })

    it('dataFunc', async () => {
        wrapper = createTest(LTable, {
            propsData: {
                data: [{text: 'this is a test text'}],
                columns: [
                    {title: '测试', key: 'text', width: 10, ellipsis: true}
                ]
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('td .l-view-text-ellipsis').attributes('title')).equal('this is a test text')
    })

    it('type: inputNumber', async () => {
        wrapper = createTest(LTable, {
            propsData: {
                data: [{num: 10}],
                columns: [
                    {title: '测试', key: 'num', type: 'inputNumber', config: { step: 2 }, onChange (val) {
                        // 这里算组件内的判断
                        expect(val).to.exist
                    }}
                ]
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.l-input').element.value == 10).to.true
        wrapper.find('.l-number-input_add').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.l-input').element.value == 12).to.true
    })
})
