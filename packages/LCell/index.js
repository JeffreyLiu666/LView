/*
 * @Date: 2020-03-26 09:45:44
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-26 09:45:44
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import LCell from './src/LCell.vue'
import { toHump } from '@/lib/util'

LCell.install = function (Vue) {
    Vue.component(LCell.name, LCell)
    Vue.component(toHump(LCell.name, true), LCell)
}

export default LCell