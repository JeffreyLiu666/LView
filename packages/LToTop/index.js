/*
 * @Date: 2020-03-26 09:45:44
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-28 14:28:16
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import LToTop from './src/LToTop.vue'
import { toHump } from '@/utils/util'

LToTop.install = function (Vue) {
    Vue.component(LToTop.name, LToTop)
    Vue.component(toHump(LToTop.name, true), LToTop)
}

export default LToTop
