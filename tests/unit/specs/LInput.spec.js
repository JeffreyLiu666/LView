/*
 * @Date: 2020-04-10 11:07:47
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-10 14:45:05
 * @LastEditors: junfeng.liu
 * @Description: des
 */
const { expect } = require('chai')
const { createTest, destroy } = require('../util')
import LInput from 'packages/LInput'

describe('LInput', () => {
    let wrapper

    afterEach(() => {
        destroy(wrapper)
    })

    it('component name', () => {
        wrapper = createTest(LInput, {})
        expect(wrapper.name()).equal('l-input')
    })

    it('type', async () => {
        wrapper = createTest(LInput, {
            propsData: {
                type: 'email'
            }
        })
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.l-input').attributes('type')).equal('email')
    })

    it('placeholder', async () => {
        wrapper = createTest(LInput, {
            propsData: {
                placeholder: 'hello'
            }
        })
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.l-input').attributes('placeholder')).equal('hello')
    })

    it('prefix', async () => {
        wrapper = createTest(LInput, {
            propsData: {
                prefix: 'md-cafe'
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.l-input-prefix>.ivu-icon').classes()).include('ivu-icon-md-cafe')
    })

    it('suffix', async () => {
        wrapper = createTest(LInput, {
            propsData: {
                suffix: 'md-cafe'
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.l-input-suffix>.ivu-icon').classes()).include('ivu-icon-md-cafe')
    })

    it('clearable', async () => {
        wrapper = createTest(LInput, {
            propsData: {
                value: 'aa',
                clearable: true
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.l-input-suffix').classes()).include('l-input-clearable')
    })

    it('showEye', async () => {
        wrapper = createTest(LInput, {
            propsData: {
                type: 'password',
                showEye: true
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.l-input-suffix').classes()).include('l-input-password')
    })

    it('disabled', async () => {
        wrapper = createTest(LInput, {
            propsData: {
                disabled: true
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.l-input').attributes('disabled')).to.exist
    })

    it('readonly', async () => {
        wrapper = createTest(LInput, {
            propsData: {
                readonly: true
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.l-input').attributes('readonly')).to.exist
    })

    it('maxlength', async () => {
        wrapper = createTest(LInput, {
            propsData: {
                maxlength: 5
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.l-input').attributes('maxlength')).equal('5')
    })

    it('autofocus', async () => {
        wrapper = createTest(LInput, {
            propsData: {
                autofocus: true
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.l-input').attributes('autofocus')).to.exist
    })

    it('autosize', async () => {
        wrapper = createTest(LInput, {
            propsData: {
                type: 'textarea',
                autosize: true
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.l-input').attributes('style')).include('overflow-y: hidden;')
    })

    it('rows', async () => {
        wrapper = createTest(LInput, {
            propsData: {
                type: 'textarea',
                rows: 3
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.l-input').attributes('rows')).equal('3')
    })

    it('max & min & step', async () => {
        wrapper = createTest(LInput, {
            propsData: {
                max: 10,
                min: 0,
                step: 2
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.l-input').attributes('max')).equal('10')
        expect(wrapper.find('.l-input').attributes('min')).equal('0')
        expect(wrapper.find('.l-input').attributes('step')).equal('2')
    })

    it('showWordLimit', async () => {
        wrapper = createTest(LInput, {
            propsData: {
                value: 'aaa',
                maxlength: 10,
                showWordLimit: true
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.l-input-count').text()).equal('3 / 10')
    })

    it('checkChinese', async () => {
        wrapper = createTest(LInput, {
            propsData: {
                value: '乾坤震巽坎离艮兑',
                maxlength: 10,
                checkChinese: true
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.l-input').element.value).equal('乾坤震巽坎')
    })

    it('floatLength', async () => {
        wrapper = createTest(LInput, {
            propsData: {
                value: 10,
                type: 'number',
                floatLength: 2
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.l-input').element.value).equal('10.00')
    })

    it('number', async () => {
        wrapper = createTest(LInput, {
            propsData: {
                value: '10.00',
                number: true
            }
        }, true)
        await wrapper.vm.$nextTick()
        wrapper.find('.l-input').trigger('blur')
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.l-input').element.value).equal('10')
    })

    it('size', async () => {
        wrapper = createTest(LInput, {
            propsData: {
                size: 'large'
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.l-input-wrapper').classes()).include('l-input-large')
    })

    it('isError', async () => {
        wrapper = createTest(LInput, {
            propsData: {
                isError: true
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.l-input').classes()).include('l-input-error')
    })

    it('autocomplete', async () => {
        wrapper = createTest(LInput, {
            propsData: {
                autocomplete: 'on'
            }
        }, true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.l-input').attributes('autocomplete')).equal('on')
    })
})
