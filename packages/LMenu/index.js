/*
 * @Date: 2020-04-17 09:04:08
 * @Author: junfeng.liu
 * @LastEditTime: 2020-05-08 10:44:18
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import LMenu from './src/LMenu.vue'
import { toHump } from '@/lib/util'

LMenu.install = function (Vue) {
    Vue.component(LMenu.name, LMenu)
    Vue.component(toHump(LMenu.name, true), LMenu)
}

export default LMenu
