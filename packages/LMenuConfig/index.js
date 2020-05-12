/*
 * @Date: 2020-04-17 09:04:08
 * @Author: junfeng.liu
 * @LastEditTime: 2020-05-11 17:55:11
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import LMenuConfig from 'packages/LMenu/src/LMenuConfig.vue'
import { toHump } from '@/lib/util'

LMenuConfig.install = function (Vue) {
    Vue.component(LMenuConfig.name, LMenuConfig)
    Vue.component(toHump(LMenuConfig.name, true), LMenuConfig)
}

export default LMenuConfig
