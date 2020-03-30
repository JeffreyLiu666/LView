<!--
 * @Date: 2020-03-26 09:43:59
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-30 14:04:13
 * @LastEditors: junfeng.liu
 * @Description: 列表项组件

    props
        title:          左侧文本
        content:        右侧文本
        titleBold:      左侧文本是否加粗

    slot
        title:          左侧文本，优先级大于props.title
        default:        右侧文本，优先级大于props.content
 -->
<template>
    <div class="l-cell">
        <div class="l-cell-title" :class="{ 'l-cell-title-bold': titleBold }">
            <slot name="title"></slot>
            <template v-if="!$slots.title">{{ title }}</template>
        </div>
        <div class="l-cell-content">
            <slot></slot>
            <template v-if="!$slots.defalut">{{ content }}</template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'l-cell',
    props: {
        title: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: ''
        },
        titleBold: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {

        }
    },
    mounted () {},
    methods: {}
}
</script>
