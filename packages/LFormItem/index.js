/*
 * @Date: 2020-03-26 09:45:44
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-26 10:05:04
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import LFormItem from 'packages/LForm/src/LFormItem.vue'
import { toHump } from '@/lib/util'

LFormItem.install = function (Vue) {
    Vue.component(LFormItem.name, LFormItem)
    Vue.component(toHump(LFormItem.name, true), LFormItem)
}

export default LFormItem