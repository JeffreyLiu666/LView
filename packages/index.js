/*
 * @Date: 2020-03-25 17:58:04
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-26 15:39:54
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import { isFunction } from '@/lib/check'
import LCell from 'packages/LCell'
import LDateRange from 'packages/LDateRange'
import LForm from 'packages/LForm'
import LFormItem from 'packages/LFormItem'
import LFormGroup from 'packages/LFormGroup'
import LFormEnca from 'packages/LFormEnca'
import LFold from 'packages/LFold'
import LNumberRange from 'packages/LNumberRange'
import LRender from 'packages/LRender'
import LShowImg from 'packages/LShowImg'
import LToTop from 'packages/LToTop'
import LTable from 'packages/LTable'

const components = [
    LCell,
    LDateRange,
    LForm,
    LFormItem,
    LFormGroup,
    LFormEnca,
    LFold,
    LNumberRange,
    LRender,
    LShowImg,
    LToTop,
    LTable
]

function install (Vue, opts = {}) {
    components.forEach(item => {
        item.install(Vue)
    })

    if (isFunction(opts.request)) {
        Vue.prototype.__lform_ajax__ = opts.request
    }
}

export default {
    version: '1.0.0',
    install,
    LCell,
    LDateRange,
    LForm,
    LFormItem,
    LFormGroup,
    LFormEnca,
    LFold,
    LNumberRange,
    LRender,
    LShowImg,
    LToTop,
    LTable
}
