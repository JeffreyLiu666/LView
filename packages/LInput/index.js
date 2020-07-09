/*
 * @Date: 2020-03-26 09:45:44
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-30 11:21:41
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import LInput from './src/LInput.vue'
import { toHump } from '@/utils/util'

LInput.install = function (Vue) {
    Vue.component(LInput.name, LInput)
    Vue.component(toHump(LInput.name, true), LInput)
}

export default LInput
