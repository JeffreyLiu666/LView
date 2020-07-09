/*
 * @Date: 2020-03-26 09:46:16
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-26 09:58:38
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import LDateRange from './src/LDateRange.vue'
import { toHump } from '@/utils/util'

LDateRange.install = function (Vue) {
    Vue.component(LDateRange.name, LDateRange)
    Vue.component(toHump(LDateRange.name, true), LDateRange)
}

export default LDateRange
