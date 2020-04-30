<!--
 * @Date: 2020-04-24 09:45:49
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-27 16:27:36
 * @LastEditors: junfeng.liu
 * @Description: 按钮组组件

    props
        size:           按钮大小，可选择为large、small，其它都归为default（既默认大小）
        shape:          按钮形状，可选择为circle，其它都归为default（既默认形状）
        disabled:       是否全部禁用，优先级低于子组件的disabled
        vertical:       是否纵向排列按钮组
 -->
<template>
    <div :class="classNames">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'l-button-group',
    provide () {
        return { group: this }
    },
    props: {
        shape: String,
        size: String,
        disabled: {
            type: Boolean,
            default: false
        },
        vertical: {
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
            const prefixCls = 'l-btn-group'
            return {
                [`${prefixCls}`]: true,
                [`${prefixCls}-${this.shape}`]: !!this.shape,
                [`${prefixCls}-vertical`]: this.vertical,
                [`${prefixCls}-${this.size}`]: !!this.size
            }
        }
    },
    mounted () {},
    methods: {}
}
</script>
