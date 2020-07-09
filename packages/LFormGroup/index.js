/*
 * @Date: 2020-03-26 09:45:44
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-26 10:07:10
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import LFormGroup from 'packages/LForm/src/LFormGroup.vue'
import { toHump } from '@/utils/util'

LFormGroup.install = function (Vue) {
    Vue.component(LFormGroup.name, LFormGroup)
    Vue.component(toHump(LFormGroup.name, true), LFormGroup)
}

export default LFormGroup
