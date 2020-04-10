/*
 * @Date: 2020-03-26 09:45:44
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-07 17:03:22
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import LInput from './src/LInput.vue'
import { toHump } from '@/lib/util'

LInput.install = function (Vue) {
    Vue.component(LInput.name, LInput)
    Vue.component(toHump(LInput.name, true), LInput)
}

export default LInput