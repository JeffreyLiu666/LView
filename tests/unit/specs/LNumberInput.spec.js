/*
 * @Date: 2020-04-01 16:45:43
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-10 11:01:10
 * @LastEditors: junfeng.liu
 * @Description: des
 */
const { expect } = require('chai')
const { createTest, destroy } = require('../util')
import LNumberInput from 'packages/LNumberInput'

describe('LNumberInput', () => {
    let wrapper

    afterEach(() => {
        destroy(wrapper)
    })

    it('component name', () => {
        wrapper = createTest(LNumberInput, {}, true)
        expect(wrapper.name()).equal('l-number-input')
    })

    it('max', async () => {
        wrapper = createTest(LNumberInput, {
            propsData: { value: 10, max: 10 }
        }, true)
        const vm = wrapper.vm
        const input = wrapper.find('input')
        await vm.$nextTick()
        expect(wrapper.find('.l-number-input_add').attributes('disabled')).to.exist
        input.setValue(20)
        await vm.$nextTick()
        expect(input.element.value == 20).to.true
        input.trigger('blur')
        await vm.$nextTick()
        expect(input.element.value == 10).to.true
    })

    it('min', async () => {
        wrapper = createTest(LNumberInput, {
            propsData: { value: 10, min: 10 }
        }, true)
        const vm = wrapper.vm
        const input = wrapper.find('.l-input')
        await vm.$nextTick()
        expect(wrapper.find('.l-number-input_subtract').attributes('disabled')).to.exist
        input.setValue(2)
        await vm.$nextTick()
        expect(input.element.value == 2).to.true
        input.trigger('blur')
        await vm.$nextTick()
        expect(input.element.value == 10).to.true
    })

    it('step', async () => {
        wrapper = createTest(LNumberInput, {
            propsData: { value: 1, step: 10 }
        }, true)
        const vm = wrapper.vm
        const input = wrapper.find('.l-input')
        const btn = wrapper.find('.l-number-input_add')
        btn.trigger('click')
        await vm.$nextTick()
        expect(input.element.value == 11).to.true
    })

    it('disabled', async () => {
        wrapper = createTest(LNumberInput, {
            propsData: { value: 1, step: 10, disabled: true }
        }, true)
        const vm = wrapper.vm
        const input = wrapper.find('.l-input')
        const btn = wrapper.find('.l-number-input_add')
        btn.trigger('click')
        await vm.$nextTick()
        expect(input.element.value == 1).to.true
        expect(input.attributes('disabled')).to.exist
    })

    it('placeholder', async () => {
        wrapper = createTest(LNumberInput, {
            propsData: { placeholder: '123321' }
        }, true)
        const input = wrapper.find('.l-input')
        expect(input.attributes('placeholder')).equal('123321')
    })

    it('textAlign', async () => {
        wrapper = createTest(LNumberInput, {
            propsData: { textAlign: 'left' }
        }, true)
        const input = wrapper.find('.l-number-input_input')
        expect(input.classes()).include('l-number-input_input-text-left')
    })

    it('controlsPosition', async () => {
        wrapper = createTest(LNumberInput, {
            propsData: { controlsPosition: 'right' }
        }, true)
        expect(wrapper.find('.l-input-prepend').exists()).to.false
        expect(wrapper.find('.l-number-input_right').exists()).to.true
        expect(wrapper.find('.ivu-icon-ios-arrow-up').exists()).to.true
    })

    it('textAlign', async () => {
        wrapper = createTest(LNumberInput, {
            propsData: { size: 'large' }
        }, true)
        expect(wrapper.find('.l-number-input_large').exists()).to.true
    })

    it('NaN', async () => {
        wrapper = createTest(LNumberInput, {
            propsData: { value: 'aaaaa' }
        }, true)
        const vm = wrapper.vm
        const input = wrapper.find('.l-input')
        await vm.$nextTick()
        expect(input.element.value == '').to.true
        input.setValue('bbb')
        await vm.$nextTick()
        input.setValue('ccc')
        await vm.$nextTick()
        expect(input.element.value == '').to.true
    })

    it('floatLength', async () => {
        wrapper = createTest(LNumberInput, {
            propsData: { value: 10, floatLength: 2, step: 1 }
        }, true)
        const vm = wrapper.vm
        const input = wrapper.find('.l-input')
        await vm.$nextTick()
        expect(input.element.value === '10.00').to.true
        wrapper.find('.l-number-input_add').trigger('click')
        await vm.$nextTick()
        expect(input.element.value === '11.00').to.true
    })

    it('blur', async () => {
        wrapper = createTest(LNumberInput, {
            propsData: { value: 10 }
        }, true)
        const vm = wrapper.vm
        const input = wrapper.find('.l-input')
        await vm.$nextTick()
        expect(input.element.value == 10).to.true
        input.setValue('10.00')
        await vm.$nextTick()
        expect(input.element.value === '10.00').to.true
        expect(vm.currentValue === '10.00').to.true
        input.trigger('blur')
        await vm.$nextTick()
        expect(input.element.value == 10).to.true
        expect(vm.currentValue === 10).to.true
    })
})
