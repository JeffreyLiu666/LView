/*
 * @Date: 2020-03-26 09:45:44
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-26 10:01:02
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import LForm from './src/LForm.vue'
import { toHump } from '@/utils/util'

LForm.install = function (Vue) {
    Vue.component(LForm.name, LForm)
    Vue.component(toHump(LForm.name, true), LForm)
}

export default LForm
