/*
 * @Date: 2020-04-02 14:43:10
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-10 11:06:34
 * @LastEditors: junfeng.liu
 * @Description: des
 */
const { expect } = require('chai')
const { createTest, destroy } = require('../util')
import LNumberRange from 'packages/LNumberRange'

describe('LNumberRange', () => {
    let wrapper

    afterEach(() => {
        destroy(wrapper)
    })

    it('component name', () => {
        wrapper = createTest(LNumberRange, {}, true)
        expect(wrapper.name()).equal('l-number-range')
    })

    it('disabled', () => {
        wrapper = createTest(LNumberRange, {
            propsData: {
                disabled: true
            }
        }, true)
        const inputs = wrapper.findAll('.l-input')
        expect(inputs).lengthOf(2)
        expect(inputs.at(0).attributes('disabled')).to.exist
        expect(inputs.at(1).attributes('disabled')).to.exist
    })

    it('readonly', () => {
        wrapper = createTest(LNumberRange, {
            propsData: {
                readonly: true
            }
        }, true)
        const inputs = wrapper.findAll('.l-input')
        expect(inputs).lengthOf(2)
        expect(inputs.at(0).attributes('readonly')).to.exist
        expect(inputs.at(1).attributes('readonly')).to.exist
    })

    it('placeholder', () => {
        wrapper = createTest(LNumberRange, {
            propsData: {
                placeholderLeft: 'aaaaa',
                placeholderRight: 'bbbbb'
            }
        }, true)
        const inputs = wrapper.findAll('.l-input')
        expect(inputs.at(0).attributes('placeholder')).equal('aaaaa')
        expect(inputs.at(1).attributes('placeholder')).equal('bbbbb')
    })

    it('max & min', async () => {
        wrapper = createTest(LNumberRange, {
            propsData: {
                value: [3, 30],
                min: 10,
                max: 20
            }
        }, true)
        const vm = wrapper.vm
        const inputs = wrapper.findAll('.l-input')
        await vm.$nextTick()
        expect(inputs.at(0).element.value == 10).to.true
        expect(inputs.at(1).element.value == 20).to.true
        inputs.at(0).setValue(30)
        inputs.at(1).setValue(3)
        inputs.at(0).trigger('blur')
        inputs.at(1).trigger('blur')
        await vm.$nextTick()
        expect(inputs.at(0).element.value == 20).to.true
        expect(inputs.at(1).element.value == 10).to.true
    })

    it('floatLength', async () => {
        wrapper = createTest(LNumberRange, {
            propsData: {
                value: [10, 20],
                floatLength: 2
            }
        }, true)
        const vm = wrapper.vm
        const inputs = wrapper.findAll('.l-input')
        await vm.$nextTick()
        expect(inputs.at(0).element.value === '10.00').to.true
        expect(inputs.at(1).element.value === '20.00').to.true
    })

    it('NaN', async () => {
        wrapper = createTest(LNumberRange, {
            propsData: {
                value: ['aa', 'bb']
            }
        }, true)
        const vm = wrapper.vm
        const inputs = wrapper.findAll('.l-input')
        await vm.$nextTick()
        expect(inputs.at(0).element.value == '').to.true
        expect(inputs.at(1).element.value == '').to.true
        inputs.at(0).setValue('cc')
        inputs.at(1).setValue('dd')
        await vm.$nextTick()
        expect(inputs.at(0).element.value == '').to.true
        expect(inputs.at(1).element.value == '').to.true
    })
})
