/*
 * @Date: 2020-03-26 09:45:44
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-26 10:06:26
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import LFormEnca from 'packages/LForm/src/LFormEnca.vue'
import { toHump } from '@/lib/util'

LFormEnca.install = function (Vue) {
    Vue.component(LFormEnca.name, LFormEnca)
    Vue.component(toHump(LFormEnca.name, true), LFormEnca)
}

export default LFormEnca