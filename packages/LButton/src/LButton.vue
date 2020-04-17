<!--
 * @Date: 2020-04-17 09:04:30
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-17 10:39:35
 * @LastEditors: junfeng.liu
 * @Description: 基于iview的button进行扩展
 -->
<template>
    <Button
        :type="type"
        :ghost="ghost"
        :size="size"
        :shape="shape"
        :long="long"
        :html-type="htmlType"
        :disabled="disabled"
        :loading="loading"
        :icon="icon"
        :custom-icon="customIcon"
        :to="to"
        :replace="replace"
        :target="target"
        :append="append"
        @click="handleClick">
        <slot></slot>
    </Button>
</template>

<script>
import { throttle, debounce } from '@/lib/util.js'

export default {
    name: 'l-button',
    props: {
        type: String,
        ghost: Boolean,
        size: String,
        shape: String,
        long: Boolean,
        htmlType: String,
        disabled: Boolean,
        loading: Boolean,
        icon: String,
        customIcon: String,
        to: [String, Object],
        replace: Boolean,
        target: String,
        append: Boolean,
        throttle: { // 是否启用节流
            type: Boolean,
            default: false
        },
        debounce: { // 是否启用防抖
            type: Boolean,
            default: false
        },
        delay: { // 节流或防抖的cd
            type: Number,
            default: 300
        },
        earlyTrigger: { // 如果为true则会变成先触发，然后CD
            type: Boolean,
            default: false
        }
    },
    data () {
        return {

        }
    },
    created () {
        let delay = Number(this.delay)
        if (isNaN(delay)) return
        if (this.throttle) {
            this.handleClick = throttle(this.handleClick, delay, this.earlyTrigger)
        }
        else if (this.debounce) {
            this.handleClick = debounce(this.handleClick, delay, this.earlyTrigger)
        }
    },
    methods: {
        handleClick (e) {
            this.$emit('click', e)
        }
    }
}
</script>
