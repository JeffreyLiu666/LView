/*
 * @Date: 2020-04-17 09:04:08
 * @Author: junfeng.liu
 * @LastEditTime: 2020-05-09 10:02:27
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import LMenuItem from 'packages/LMenu/src/LMenuItem.vue'
import { toHump } from '@/utils/util'

LMenuItem.install = function (Vue) {
    Vue.component(LMenuItem.name, LMenuItem)
    Vue.component(toHump(LMenuItem.name, true), LMenuItem)
}

export default LMenuItem
