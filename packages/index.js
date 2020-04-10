/*
 * @Date: 2020-03-25 17:58:04
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-10 15:34:29
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
import LNumberInput from 'packages/LNumberInput'
import LNumberRange from 'packages/LNumberRange'
import LRender from 'packages/LRender'
import LShowImg from 'packages/LShowImg'
import LToTop from 'packages/LToTop'
import LTable from 'packages/LTable'
import LInput from 'packages/LInput'

const components = [
    LCell,
    LDateRange,
    LForm,
    LFormItem,
    LFormGroup,
    LFormEnca,
    LFold,
    LNumberInput,
    LNumberRange,
    LRender,
    LShowImg,
    LToTop,
    LTable,
    LInput
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
    version: '1.3.0',
    install,
    LCell,
    LDateRange,
    LForm,
    LFormItem,
    LFormGroup,
    LFormEnca,
    LFold,
    LNumberInput,
    LNumberRange,
    LRender,
    LShowImg,
    LToTop,
    LTable,
    LInput
}
