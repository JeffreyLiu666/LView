/*
 * @Date: 2020-04-01 10:20:01
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-01 14:59:54
 * @LastEditors: junfeng.liu
 * @Description: des
 */
const { expect } = require('chai')
const { createTest, destroy } = require('../util')
import LFold from 'packages/LFold'

describe('LFold', () => {
    let wrapper

    afterEach(() => {
        destroy(wrapper)
    })

    it('component name', () => {
        wrapper = createTest(LFold)
        expect(wrapper.name()).equal('l-fold')
    })

    it('height', () => {
        wrapper = createTest(LFold, {
            propsData: {
                height: 300
            },
            slots: {
                default: `<div style="height: 900px;"></div>`
            }
        })
        const vm = wrapper.vm
        expect(wrapper.find('.l-fold-btn').isVisible()).to.true
        expect(wrapper.find('.l-fold-wrapper').element.style.height).equal(`${ vm.height }px`)
    })

    it('showText', () => {
        wrapper = createTest(LFold, {
            propsData: {
                showText: '123'
            }
        })
        const vm = wrapper.vm
        vm.show = false
        expect(wrapper.find('.l-fold-btn').text()).equal('123')
    })

    it('hideText', async () => {
        wrapper = createTest(LFold, {
            propsData: {
                hideText: '123'
            }
        })
        const vm = wrapper.vm
        vm.show = true
        await vm.$nextTick()
        expect(wrapper.find('.l-fold-btn').text()).equal('123')
    })

    it('needHide', async () => {
        wrapper = createTest(LFold, {
            propsData: {
                needHide: false
            },
            slots: {
                default: `<div style="height: 900px;"></div>`
            }
        })
        const vm = wrapper.vm
        vm.show = true
        await vm.$nextTick()
        expect(vm.showBtn).to.false
        expect(wrapper.find('.l-fold-btn').isVisible()).to.false
    })

    it('animation', async () => {
        wrapper = createTest(LFold, {
            propsData: {
                animation: false
            }
        })
        const vm = wrapper.vm
        vm.show = true
        await vm.$nextTick()
        expect(wrapper.find('.l-fold-wrapper').element.style.height).equal(`auto`)
    })

    it('can’t operate', async () => {
        wrapper = createTest(LFold, {
            slots: {
                default: '<div id="slot"></div>'
            }
        })
        const vm = wrapper.vm
        const height = vm.height - 50
        const slot = wrapper.find('#slot').element
        expect(vm.needOperate).to.false
        expect(vm.wrapperHeight).equal(0)
        expect(vm.heightComp).equal('0px')
        slot.style.height = `${ height }px`
        await vm.$nextTick()
        expect(vm.needOperate).to.false
        expect(vm.wrapperHeight).equal(height)
        expect(vm.heightComp).equal(`${ height }px`)
    })

    it('can operate', async () => {
        wrapper = createTest(LFold, {
            slots: {
                default: '<div id="slot"></div>'
            }
        })
        const height = 900
        const vm = wrapper.vm
        const slot = wrapper.find('#slot').element
        slot.style.height = `${ height }px`
        await vm.$nextTick()
        expect(vm.needOperate).to.true
        expect(vm.wrapperHeight).equal(height)
        expect(vm.heightComp).equal(`${ vm.height }px`)
        expect(vm.show).to.false
        expect(vm.showBtn).to.true
        expect(vm.btnText).equal(vm.showText)
    })

    it('operate', async () => {
        const height = 900
        wrapper = createTest(LFold, {
            slots: {
                default: `<div style="height: ${ height }px;"></div>`
            }
        })
        const vm = wrapper.vm
        expect(vm.needOperate).to.true
        expect(vm.heightComp).equal(`${ vm.height }px`)
        expect(vm.show).to.false
        expect(vm.showBtn).to.true
        expect(vm.btnText).equal(vm.showText)
        wrapper.find('.l-fold-btn').trigger('click')
        expect(vm.heightComp).equal(`${ height }px`)
        expect(vm.show).to.true
        expect(vm.btnText).equal(vm.hideText)
    })
})
