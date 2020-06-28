/*
 * @Date: 2020-06-28 14:27:44
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-28 14:28:33
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import LUpload from './src/LUpload.vue'
import { toHump } from '@/lib/util'

LUpload.install = function (Vue) {
    Vue.component(LUpload.name, LUpload)
    Vue.component(toHump(LUpload.name, true), LUpload)
}

export default LUpload
