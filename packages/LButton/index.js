/*
 * @Date: 2020-04-17 09:04:08
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-17 09:07:15
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import LButton from './src/LButton.vue'
import { toHump } from '@/lib/util'

LButton.install = function (Vue) {
    Vue.component(LButton.name, LButton)
    Vue.component(toHump(LButton.name, true), LButton)
}

export default LButton
