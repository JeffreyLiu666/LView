<!--
 * @Date: 2020-03-26 09:43:59
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-27 09:46:22
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

<style lang="less">
@import '~@/style/theme.less';

.l-cell{
    width: 100%;
    display: flex;
    margin: 12px 0;
    font-size: @font-size-large;
}
.l-cell-title-bold{
    font-weight: 600;
}
.l-cell-title{
    flex: 1;
    padding-right: 6px;
}
.l-cell-content{
    flex: 4;
    padding: 0 6px;
}

</style>
