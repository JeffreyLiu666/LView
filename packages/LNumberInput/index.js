/*
 * @Date: 2020-03-26 09:45:44
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-27 16:32:52
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import LNumberInput from './src/LNumberInput.vue'
import { toHump } from '@/lib/util'

LNumberInput.install = function (Vue) {
    Vue.component(LNumberInput.name, LNumberInput)
    Vue.component(toHump(LNumberInput.name, true), LNumberInput)
}

export default LNumberInput