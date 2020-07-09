/*
 * @Date: 2020-05-11 11:41:06
 * @Author: junfeng.liu
 * @LastEditTime: 2020-07-08 18:17:01
 * @LastEditors: junfeng.liu
 * @Description: des
 */
function broadcast (componentName, eventName, params) {
    this.$children.forEach(child => {
        const name = child.$options.name

        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params))
        }
        else {
            // todo 如果 params 是空数组，接收到的会是 undefined
            broadcast.apply(child, [componentName, eventName].concat([params]))
        }
    })
}
export default {
    methods: {
        dispatch (componentName, eventName, params) {
            let parent = this.$parent || this.$root
            let name = parent.$options.name

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent

                if (parent) {
                    name = parent.$options.name
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params))
            }
        },
        broadcast (componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params)
        }
    }
}
