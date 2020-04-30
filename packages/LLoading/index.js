/*
 * @Date: 2020-04-30 11:20:30
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-30 11:22:13
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import LLoading from './src/LLoading.vue'
import { toHump } from '@/lib/util'

LLoading.install = function (Vue) {
    Vue.component(LLoading.name, LLoading)
    Vue.component(toHump(LLoading.name, true), LLoading)
}

export default LLoading
