/*
 * @Date: 2020-04-03 12:44:21
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-03 12:44:50
 * @LastEditors: junfeng.liu
 * @Description: des
 */
const { expect } = require('chai')
const { createTest, destroy } = require('../util')
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
})
