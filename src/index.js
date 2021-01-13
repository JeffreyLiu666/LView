/*
 * @Date: 2020-03-25 17:02:44
 * @Author: junfeng.liu
 * @LastEditTime: 2021-01-13 16:36:21
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import Vue from 'vue'
import App from './App.vue'
import iview from 'view-design'
import LView from 'packages'

Vue.use(iview)
Vue.use(LView, {
    checkPermission (permissions) {
        console.log(permissions)
        return false
    }
})

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})
