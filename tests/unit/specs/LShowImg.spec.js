/*
 * @Date: 2020-04-03 09:54:41
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-03 10:41:41
 * @LastEditors: junfeng.liu
 * @Description: des
 */
const { expect } = require('chai')
const { createTest, destroy } = require('../util')
import LShowImg from 'packages/LShowImg'

describe('LShowImg', () => {
    let wrapper

    afterEach(() => {
        destroy(wrapper)
    })

    it('component name', () => {
        wrapper = createTest(LShowImg, {}, true)
        expect(wrapper.name()).equal('l-show-img')
    })

    it('visible', async () => {
        wrapper = createTest(LShowImg, {
            propsData: {
                value: true
            }
        }, true)
        expect(wrapper.find('.l-show-img').isVisible()).to.true
        wrapper.setProps({ value: false })
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.l-show-img').isVisible()).to.false
    })

    it('src', () => {
        wrapper = createTest(LShowImg, {
            propsData: {
                src: 'http://www.baidu.com'
            }
        }, true)
        expect(wrapper.find('.l-show-img img').attributes('src')).equal('http://www.baidu.com')
    })

    it('alt', () => {
        wrapper = createTest(LShowImg, {
            propsData: {
                alt: '这是图片'
            }
        }, true)
        expect(wrapper.find('.l-show-img img').attributes('alt')).equal('这是图片')
    })

    it('imgStyle', () => {
        wrapper = createTest(LShowImg, {
            propsData: {
                imgStyle: 'width: 200px;'
            }
        }, true)
        expect(wrapper.find('.l-show-img img').attributes('style')).equal('width: 200px;')
    })

    it('transfer', () => {
        wrapper = createTest(LShowImg, {
            propsData: {
                transfer: true
            }
        }, true)
        expect(wrapper.find('.l-show-img').element.parentNode.nodeName === 'BODY').to.true
    })

    it('maskClose', async () => {
        wrapper = createTest(LShowImg, {
            propsData: {
                value: true,
                maskClose: false
            }
        }, true)
        const vm = wrapper.vm
        await vm.$nextTick()
        expect(wrapper.isVisible()).to.true
        wrapper.trigger('click')
        await vm.$nextTick()
        expect(wrapper.isVisible()).to.true
        wrapper.setProps({ maskClose: true })
        wrapper.trigger('click')
        await vm.$nextTick()
        expect(wrapper.isVisible()).to.false
    })

    it('iconClose', async () => {
        wrapper = createTest(LShowImg, {
            propsData: {
                value: true
            }
        }, true)
        wrapper.find('.l-show-img-close').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.isVisible()).to.false
    })
})
