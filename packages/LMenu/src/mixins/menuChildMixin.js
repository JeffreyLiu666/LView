/*
 * @Date: 2020-05-11 09:51:09
 * @Author: junfeng.liu
 * @LastEditTime: 2020-05-12 17:38:05
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import { findComponentsUpward } from '@/lib/util'

export default {
    inject: {
        menu: {
            default: {}
        }
    },
    props: {
        name: [String, Number],
        icon: String,
        title: String
    },
    computed: {
        collapsed () {
            // 只有mode为vertical时collapsed生效
            return this.menu.mode === 'vertical' ? this.menu.insideCollapsed : false
        },
        hideTitle () {
            // 通过判断父组件的name是否为Menu确定是否为第一级
            return this.collapsed && findComponentsUpward(this, ['l-menu-item', 'l-sub-menu']).length === 0
        }
    }
}
