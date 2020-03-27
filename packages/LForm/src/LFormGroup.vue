<!--
	作者：1764635606@qq.com
	时间：2018-09-14
	描述：form表单

	props:
        labelWidth:         所有label的宽度
        labelPosition:      所有label所在的位置（支持left，right，top）
        labelTextAlign:     所有label的textalign
        contentWidth:       内容部分的宽度
        inline:             是否为行内元素

    methods:

    emit:

-->
<template>
    <form class="l-form-group" :class="formClass"><slot></slot></form>
</template>

<script>
    export default {
        name: 'l-form-group',
        props: {
            labelWidth: {
                type: [Number, String]
            },
            labelPosition: {
                type: String,
                default: 'top'
            },
            labelTextAlign: {
                type: String,
                default: 'left'
            },
            contentWidth: {
                type: [Number, String]
            },
            inline: {
                type: Boolean,
                default: false
            },
            itemWidth: {
                type: [Number, String]
            },
        },
        computed: {
            formClass () {
                if (this.inline) return ['l-form-inline']
                return [`l-form-label-${this.labelPosition}`]
            }
        },
        data () {
            return {
            }
        },
        provide () { //向子孙组件传递数据
            return { form: this }
        }
    }
</script>

<style lang="less">

</style>
