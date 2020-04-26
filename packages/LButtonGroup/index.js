/*
 * @Date: 2020-04-24 09:56:19
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-24 09:57:51
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import LButtonGroup from 'packages/LButton/src/LButtonGroup.vue'
import { toHump } from '@/lib/util'

LButtonGroup.install = function (Vue) {
    Vue.component(LButtonGroup.name, LButtonGroup)
    Vue.component(toHump(LButtonGroup.name, true), LButtonGroup)
}

export default LButtonGroup

