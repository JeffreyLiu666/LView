/*
 * @Date: 2020-04-01 14:42:46
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-07 10:04:46
 * @LastEditors: junfeng.liu
 * @Description: des
 */
const { expect } = require('chai')
const { createTest, destroy } = require('../util')
import LCell from 'packages/LCell'

describe('LCell', () => {
    let wrapper

    afterEach(() => {
        destroy(wrapper)
    })
    
    it('component name', () => {
        wrapper = createTest(LCell)
        expect(wrapper.name()).equal('l-cell')
    })
    
    it('title', () => {
        wrapper = createTest(LCell, {
            propsData: {
                title: '<div></div>'
            }
        })
        expect(wrapper.find('.l-cell-title').text()).equal('<div></div>')
    })
    
    it('content', () => {
        wrapper = createTest(LCell, {
            propsData: {
                content: '<div></div>'
            }
        })
        expect(wrapper.find('.l-cell-content').text()).equal('<div></div>')

    })
    
    it('titleBold', () => {
        wrapper = createTest(LCell, {
            propsData: {
                titleBold: true
            }
        })
        expect(wrapper.find('.l-cell-title').classes('l-cell-title-bold')).to.true
    })
    
    it('title slot', () => {
        wrapper = createTest(LCell, {
            slots: {
                title: '<p></p>'
            },
            propsData: {
                title: '<div></div>'
            }
        })
        expect(wrapper.find('.l-cell-title').contains('p')).to.true
    })
    
    it('content slot', () => {
        wrapper = createTest(LCell, {
            slots: {
                default: '<p></p>'
            },
            propsData: {
                content: '<div></div>'
            }
        })
        expect(wrapper.find('.l-cell-content').contains('p')).to.true
    })
})