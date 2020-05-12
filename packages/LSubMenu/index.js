/*
 * @Date: 2020-04-17 09:04:08
 * @Author: junfeng.liu
 * @LastEditTime: 2020-05-09 10:02:54
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import LSubMenu from 'packages/LMenu/src/LSubMenu.vue'
import { toHump } from '@/lib/util'

LSubMenu.install = function (Vue) {
    Vue.component(LSubMenu.name, LSubMenu)
    Vue.component(toHump(LSubMenu.name, true), LSubMenu)
}

export default LSubMenu
