<!--
 * @Date: 2020-03-26 09:43:59
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-07 10:01:48
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
            <slot name="title">{{ title }}</slot>
        </div>
        <div class="l-cell-content">
            <slot>{{ content }}</slot>
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
