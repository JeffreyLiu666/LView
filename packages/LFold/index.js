/*
 * @Date: 2020-03-26 09:45:44
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-26 10:17:43
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import LFold from './src/LFold.vue'
import { toHump } from '@/lib/util'

LFold.install = function (Vue) {
    Vue.component(LFold.name, LFold)
    Vue.component(toHump(LFold.name, true), LFold)
}

export default LFold