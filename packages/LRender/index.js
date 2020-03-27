/*
 * @Date: 2020-03-26 09:45:44
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-26 10:19:59
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import LRender from './src/LRender.js'
import { toHump } from '@/lib/util'

LRender.install = function (Vue) {
    Vue.component(LRender.name, LRender)
    Vue.component(toHump(LRender.name, true), LRender)
}

export default LRender