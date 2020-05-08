<!--
 * @Date: 2020-04-30 11:20:43
 * @Author: junfeng.liu
 * @LastEditTime: 2020-05-07 18:19:20
 * @LastEditors: junfeng.liu
 * @Description: loading组件
 -->
<template>
    <div :class="className" v-transfer-dom :data-transfer="transfer" v-if="visible">
        <ul class="l-loading-main">
            <li class="l-loading-item" v-for="item in 4" :key="item">
                <div class="l-loading-ball"></div>
                <div class="l-loading-shadow"></div>
            </li>
        </ul>
    </div>
</template>

<script>
import transferDom from '@/directives/transfer-dom.js'
const prefixCls = 'l-loading'

export default {
    name: 'l-loading',
    directives: { 'transfer-dom': transferDom },
    props: {
        transfer: {
            type: Boolean,
            default: false
        },
        mask: {
            type: Boolean,
            default: true
        },
        fix: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            visible: true
        }
    },
    computed: {
        className () {
            return {
                [prefixCls]: true,
                [`${prefixCls}-mask`]: this.mask,
                [`${prefixCls}-fix`]: this.fix
            }
        }
    },
    mounted () {},
    methods: {}
}
</script>
