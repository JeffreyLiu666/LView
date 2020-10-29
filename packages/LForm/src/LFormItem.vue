<!--
	作者：1764635606@qq.com
	时间：2018-09-14
	描述：l-form-item需要与l-form-group一起使用

	props:
        label:              label的内容
        labelRender:        label的render函数
        labelWidth:         label的宽度，优先级大于l-form-group的labelWidth
        labelTextAlign:     label的文本对齐方式
        itemWidth:          该item的宽度
        contentWidth:       内容部分的宽度
        isTitle:            是否为标题类型，主要起分类、分割的作用

    methods:

    emit:
-->

<template>
    <div :class="itemClass" :style="[itemStyle, styleObj]">
        <div class="l-form-item-title" v-if="isTitle">{{ label }}</div>
        <template v-else>
            <label class="l-form-item-label clearfix" :class="labelClass" :style="labelStyle" v-if="label !== '' || labelRender || $slots.label">
                <slot name="label"></slot>
                <template v-if="label">{{ label }}</template>
                <LRender v-else-if="labelRender" :render="labelRender"></LRender>
            </label>
            <div class="l-form-item-content clearfix" :style="contentStyle">
                <slot></slot>
                <div class="l-form-item-error-tip" v-show="isError">{{ errMsg }}</div>
            </div>
        </template>
    </div>
</template>

<script>
import { check } from '@/utils'

const preCls = 'l-form-item'

export default {
    name: 'l-form-item',
    props: {
        label: {
            type: [String, Number],
            default: ''
        },
        labelRender: Function,
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
        },
        isTitle: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        itemClass () {
            return [
                preCls,
                'clearfix',
                this.className,
                {
                    'ivu-form-item-error': this.isError,
                    [`${ preCls }-has-title`]: this.isTitle
                }
            ]
        },
        labelClass () {
            return {
                [`l-form-item-label-${this.labelPosition}`]: this.labelPosition
            }
        },
        labelW () { // 获取label的宽度
            let labelWidth = this.labelWidth ?? this.form.labelWidth
            // 即使没有设为行内元素，也可通过设置labelPosition为left或right来使label和content在同一行
            if (
                ( // 以item的labelPosition优先
                    (this.form.labelPosition !== 'top' && check.isNull(this.labelPosition)) ||
                        (!check.isNull(this.labelPosition) && this.labelPosition !== 'top')
                ) &&
                    !this.form.inline &&
                    (this.label !== '' || this.$slots.label)
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
