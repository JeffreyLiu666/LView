/*
 * @Date: 2020-03-25 17:02:44
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-26 11:23:50
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import Vue from 'vue'
import App from './App.vue'
import iview from 'view-design'
import LView from 'packages'

Vue.use(iview)
Vue.use(LView)

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})
