/*
 * @Date: 2020-04-30 11:20:30
 * @Author: junfeng.liu
 * @LastEditTime: 2020-05-07 18:27:55
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import Vue from 'vue'
import LLoading from './src/LLoading.vue'
import { toHump } from '@/lib/util'

let instance

function getInstance (props = {}) {
    if (instance) return instance
    const Instance = new Vue({
        data: Object.assign({}, props),
        render (h) {
            return h(LLoading, {
                props: {
                    fix: true
                }
            })
        }
    })

    let component = Instance.$mount()
    document.body.appendChild(component.$el)
    let loading = Instance.$children[0]

    return {
        show () {
            loading.visible = true
        },
        hide () {
            loading.visible = false
            document.body.removeChild(component.$el)
            Instance.$destroy()
            instance = null
            component = null
            loading = null
        }
    }
}

LLoading.show = function () {
    instance = getInstance()
    instance.show()
}

LLoading.hide = function () {
    instance = getInstance()
    instance.hide()
}

LLoading.install = function (Vue) {
    Vue.component(LLoading.name, LLoading)
    Vue.component(toHump(LLoading.name, true), LLoading)
    Vue.prototype.$loading = LLoading
}

export default LLoading
