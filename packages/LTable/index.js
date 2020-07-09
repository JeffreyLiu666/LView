/*
 * @Date: 2020-03-26 09:45:44
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-26 10:02:45
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import LTable from './src/LTable.vue'
import { toHump } from '@/utils/util'

LTable.install = function (Vue) {
    Vue.component(LTable.name, LTable)
    Vue.component(toHump(LTable.name, true), LTable)
}

export default LTable
