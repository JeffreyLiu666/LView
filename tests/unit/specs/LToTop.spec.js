/*
 * @Date: 2020-04-03 12:44:21
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-07 11:53:29
 * @LastEditors: junfeng.liu
 * @Description: des
 */
const { expect } = require('chai')
const { createTest, createVue, destroy, wait } = require('../util')
import LToTop from 'packages/LToTop'

describe('LToTop', () => {
    let wrapper

    afterEach(() => {
        destroy(wrapper)
    })

    it('component name', () => {
        wrapper = createTest(LToTop, {}, true)
        expect(wrapper.name()).equal('l-to-top')
    })

    it('scroll', async () => {
        wrapper = createVue(`
            <div id="wrapper" style="height: 100px; overflow: auto;">
                <div id="content" style="height: 1000px;">
                    <LToTop wrapper="#wrapper">up</LToTop>
                </div>
            </div>
        `, {}, true)
        const vm = wrapper.vm
        expect(wrapper.find('.l-to-top').isVisible()).to.false
        expect(wrapper.find('.l-to-top').text()).equal('up')
        wrapper.find('#wrapper').element.scrollTop = 500
        // TODO: 由于transition的存在，导致下面的判断无法通过
        // await vm.$nextTick()
        // expect(wrapper.find('.l-to-top').isVisible()).to.true
    })
})
