<!--
 * @Date: 2020-04-17 09:04:30
 * @Author: junfeng.liu
 * @LastEditTime: 2020-05-13 18:33:29
 * @LastEditors: junfeng.liu
 * @Description: button组件

    props
        type:           类型，可选值有primary、dashed、text、info、success、warning、error，其它都归为default（既默认样式）
        ghost:          幽灵按钮，使按钮背景透明
        size:           按钮大小，可选择为large、small，其它都归为default（既默认大小）
        shape:          按钮形状，可选择为circle，其它都归为default（既默认形状）
        long:           开启后按钮宽度为100%
        html-type:      按钮原生type属性
        disabled:       是否禁用
        loading:        是否加载中
        icon:           图标类型，基于iview
        to:             跳转的链接，支持 vue-router 对象
        replace:        路由跳转时，开启 replace 将不会向 history 添加新记录
        target:         相当于 a 链接的 target 属性
        append:         同 vue-router append
        throttle:       是否启用节流
        debounce:       是否启用防抖
        delay:          节流或防抖的cd
        earlyTrigger:   如果开启则会先触发再cd

    slot
        icon:           图标
        default:        任意
 -->
<template>
    <component :is="tagName" :class="classNames" :disabled="isDisabled" :style="{ width: width + 'px' }" v-bind="tagProps" @click="handleClick">
        <Icon class="l-view-load-loop" type="ios-loading" v-if="loading" />
        <slot name="icon">
            <Icon :type="icon" />
        </slot>
        <span v-if="showDefSlot"><slot></slot></span>
    </component>
</template>

<script>
import { throttle, debounce } from '@/lib/util.js'
import { isNull } from '@/lib/check.js'
import mixinsLink from '@/mixins/link.js'

export default {
    name: 'l-button',
    mixins: [mixinsLink],
    inject: {
        group: {
            default: {}
        }
    },
    props: {
        type: String,
        ghost: {
            type: Boolean,
            default: false
        },
        width: Number,
        size: String,
        shape: String,
        long: {
            type: Boolean,
            default: false
        },
        htmlType: {
            default: 'button',
            validator (value) {
                return ['button', 'submit', 'reset'].includes(value)
            }
        },
        disabled: Boolean,
        loading: Boolean,
        icon: String,
        // customIcon: String,
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
    computed: {
        classNames () {
            const prefixCls = 'l-btn'
            return {
                [prefixCls]: true,
                [`${prefixCls}-${this.type}`]: !!this.type,
                [`${prefixCls}-ghost`]: this.ghost,
                [`${prefixCls}-long`]: this.long,
                [`${prefixCls}-${this.shape}`]: !!this.shape,
                [`${prefixCls}-icon-only`]: this.isOnlyIcon,
                [`${prefixCls}-${this.size}`]: !!this.size,
                [`${prefixCls}-loading`]: this.loading
            }
        },
        isOnlyIcon () {
            return (
                (this.hasPropsIcon && !this.loading) ||
                (!this.hasPropsIcon && this.loading)
            ) && !this.$slots.default
        },
        hasPropsIcon () {
            return this.icon || this.$slots.icon
        },
        showDefSlot () {
            return !!this.$slots.default
        },
        isDisabled () {
            // 判断LButton组件是否有disabled传入
            // 由于props会把Boolean型的空值自动转为false，所以从$options里取
            // 以这里的disabled为主
            return isNull(this.$options?.propsData?.disabled) ? this.group.disabled : this.disabled
        },
        isHrefPattern () {
            return !!this.to
        },
        tagName () {
            const { isHrefPattern } = this
            return isHrefPattern ? 'a' : 'button'
        },
        tagProps () {
            const { isHrefPattern } = this
            if (isHrefPattern) {
                const { linkUrl, target } = this
                return { href: linkUrl, target }
            } else {
                const { htmlType } = this
                return { type: htmlType }
            }
        }
    },
    created () {
        let delay = Number(this.delay)
        if (isNaN(delay)) return
        if (this.throttle) {
            this.handleClick = throttle(this.handleClick, delay, this.earlyTrigger)
        } else if (this.debounce) {
            this.handleClick = debounce(this.handleClick, delay, this.earlyTrigger)
        }
    },
    methods: {
        handleClick (e) {
            this.$emit('click', e)
            const openInNewWindow = e.ctrlKey || e.metaKey

            this.handleCheckClick(e, openInNewWindow)
        }
    }
}
</script>
