<!--
	作者：1764635606@qq.com
	时间：2018-09-14
	描述：l-form-item需要与l-form-group一起使用

	props:
        label:              label的内容
        labelWidth:         label的宽度，优先级大于l-form-group的labelWidth
        contentWidth:       内容部分的宽度


    methods:

    emit:
-->

<template>
    <div class="l-form-item clearfix" :class="[{'ivu-form-item-error': isError}, className]" :style="[itemStyle, styleObj]" v-if="visible">
        <label class="l-form-item-label clearfix" :class="labelClass" :style="labelStyle" v-if="label !== '' || $slots.label">
            <slot name="label"></slot>
            {{ label }}
        </label>
        <div class="l-form-item-content clearfix" :style="contentStyle">
            <slot></slot>
            <div class="l-form-item-error-tip" v-show="isError">{{ errMsg }}</div>
        </div>
    </div>
</template>

<script>
    import { check } from '@/lib'

    export default {
        name: 'l-form-item',
        props: {
            label: {
                type: [String, Number],
                default: ''
            },
            labelWidth: {
                type: [Number, String]
            },
            labelTextAlign: {
                type: String
            },
            contentWidth: {
                type: [Number, String]
            },
            itemWidth: {
                type: [Number, String]
            },
            labelPosition: String,
            judgeConfig: { // 用于show判断的条件
                type: Object,
                default: () => {
                    return {}
                }
            },
            show: { // 自定义逻辑配合judgeConfig判断item的显隐
                type: String,
                default: ''
            },
            inline: { // 如果想单项不为inline则可设置itemWidth为100%
                type: Boolean,
                default: false
            },
            className: {
                type: String,
                default: ''
            },
            styleObj: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        computed: {
            labelClass () {
                return [`l-form-item-label-${this.labelPosition}`]
            },
            labelW () { // 获取label的宽度
                let labelWidth = this.labelWidth ?? this.form.labelWidth
                // 即使没有设为行内元素，也可通过设置labelPosition为left或right来使label和content在同一行
                if (
                    (   // 以item的labelPosition优先
                        (this.form.labelPosition !== 'top' && check.isNull(this.labelPosition))
                        || (!check.isNull(this.labelPosition) && this.labelPosition !== 'top')
                    )
                    && !this.form.inline
                    && (this.label !== '' || this.$slots.label)
                ) {
                    labelWidth = labelWidth ?? 100
                }
                if (!isNaN(Number(labelWidth))) {
                    labelWidth += 'px'
                }
                return labelWidth
            },
            labelStyle () {
                let style = {}
                style.width = this.labelW
                let textAlign = this.labelTextAlign || this.form.labelTextAlign
                style['text-align'] = textAlign
                return style
            },
            contentStyle () {
                let style = {}
                let itemWidth = this.itemWidth ?? this.form.itemWidth
                let contentWidth = this.contentWidth ?? this.form.contentWidth
                switch (this.labelPosition || this.form.labelPosition) {
                    case 'left':
                        style['margin-left'] = this.labelW
                        break
                    case 'right':
                        style['margin-right'] = this.labelW
                        break
                }
                // 如果有itemWidth且labelWidth且是行内元素则将contentWidth设为自动补满,以设置的contentWidth优先
                if (!check.isNull(itemWidth) && !check.isNull(this.labelW) && (this.form.inline || this.inline) && check.isNull(contentWidth)) {
                    if (this.label === '' && !this.$slots.label) {
                        contentWidth = '100%'
                    } else {
                        contentWidth = `calc(100% - ${ this.labelW })`
                    }
                }
                if (check.isNull(contentWidth)) return style
                if (isNaN(Number(contentWidth))) {
                    style['width'] = contentWidth
                } else {
                    style['width'] = contentWidth + 'px'
                }
                return style
            },
            itemStyle () {
                let style = {}
                if (this.inline) {
                    style.display = 'inline-block'
                }
                let itemWidth = this.itemWidth ?? this.form.itemWidth
                if (check.isNull(itemWidth)) return style
                if (isNaN(Number(itemWidth))) {
                    style['width'] = itemWidth
                } else {
                    style['width'] = itemWidth + 'px'
                }
                return style
            },
            visible () {
                if (this.show === '') return true
                try {
                    let that = this.judgeConfig
                    let show = eval(this.show)
                    return show
                } catch (error) { // 如果逻辑不对直接隐藏
                    console.error(error)
                    return false
                }
            }
        },
        data () {
            return {
                errMsg: '',
                isError: false
            }
        },
        inject: ['form'] // 从祖先组件获取provide中的内容
    }
</script>
