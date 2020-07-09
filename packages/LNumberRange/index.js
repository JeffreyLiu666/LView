/*
 * @Date: 2020-03-26 09:45:44
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-26 10:03:18
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import LNumberRange from './src/LNumberRange.vue'
import { toHump } from '@/utils/util'

LNumberRange.install = function (Vue) {
    Vue.component(LNumberRange.name, LNumberRange)
    Vue.component(toHump(LNumberRange.name, true), LNumberRange)
}

export default LNumberRange
