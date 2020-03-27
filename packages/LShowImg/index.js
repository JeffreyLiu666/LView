/*
 * @Date: 2020-03-26 09:45:44
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-26 10:02:25
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import LShowImg from './src/LShowImg.vue'
import { toHump } from '@/lib/util'

LShowImg.install = function (Vue) {
    Vue.component(LShowImg.name, LShowImg)
    Vue.component(toHump(LShowImg.name, true), LShowImg)
}

export default LShowImg