<!--
 * @Date: 2020-03-27 16:33:07
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-28 21:52:42
 * @LastEditors: junfeng.liu
 * @Description: 数字输入框

    props
        value:              --
        max:                最大值，默认无穷大
        min:                最小值，默认无穷小
        step:               点击按钮增加/减少的值，默认1
        disabled:           是否禁用
        placeholder:        同input的placeholder
        readonly:           是否只读
        prefix:             头部图标
        suffix:             尾部图标
        textAlign:          input的文本对齐方式
        controlsPosition:   按钮的位置，默认右边加好，左边减号；设为right将都在右边，加号变为上号，减号变减号
        size:               组件大小，有large、default、small，默认是default

    event
        change:             值改变事件，返回当前的值
        on-enter:           按下回车键时触发，返回event
        on-focus:           输入框聚焦时触发，返回event
        on-blur:            输入框失去焦点时触发，返回event

 -->
<template>
    <div class="l-number-input"
        :class="[
            {'l-number-input_right': controlsRight},
            'l-number-input_' + size
        ]"
    >
        <i-input
            ref="input"
            class="l-number-input_input"
            :class="['l-number-input_input-text-' + textAlign]"
            :value="curValue"
            :disabled="disabled"
            :readonly="readonly"
            :placeholder="placeholder"
            :prefix="prefix"
            :suffix="suffix"
            :size="size"
            @on-change="handleChange"
            @on-enter="handleEnter"
            @on-focus="handleFocus"
            @on-blur="handleBlur"
        >
            <!-- <LRender :render="renderControls"></LRender> -->
            <span
                slot="append"
                class="l-number-input_add"
                :disabled="disabled"
                @click="handleClick('add')">
                <Icon :type="controlsRight ? 'ios-arrow-up' : 'md-add'" />
            </span>
            <span
                :slot="controlsRight ?  'append' : 'prepend'"
                class="l-number-input_subtract"
                :disabled="disabled"
                @click="handleClick('subtract')">
                <Icon :type="controlsRight ? 'ios-arrow-down' : 'md-remove'" />
            </span>
            <!-- <div slot="append" v-if="controlsRight">
                asdf
            </div> -->
        </i-input>
    </div>
</template>

<script>
import { isEmpty } from '@/lib/check.js'

export default {
    name: 'l-number-input',
    props: {
        value: {
            type: [Number, String]
        },
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        step: {
            type: Number,
            default: 1
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: String,
        readonly: {
            type: Boolean,
            default: false
        },
        prefix: String,
        suffix: String,
        textAlign: {
            type: String,
            default: 'center'
        },
        controlsPosition: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: 'default'
        }
    },
    data () {
        return {
            curValue: this.value
        }
    },
    computed: {
        controlsRight () {
            return this.controlsPosition === 'right'
        }
    },
    mounted () {},
    methods: {
        handleClick (action) {
            if (this.disabled || this.readonly) return
            let value = isEmpty(this.curValue) ? 0 : Number(this.curValue)
            switch (action) {
                case 'add':
                    value += this.step
                    break
                case 'subtract':
                    value -= this.step
                    break
            }
            this.setCurrentValue(value)
        },
        handleChange (e) {
            if (!(e?.target?.value)) return
            let value = Number(e.target.value)
            if (isNaN(value)) {
                return this.setCurrentValue()
            }
            this.setCurrentValue(value)
        },
        setCurrentValue (val) {
            const oldVal = this.curValue
            let newVal = Number(val)
            if (isNaN(newVal)) newVal = ''
            if (newVal !== '' && newVal <= this.min) newVal = this.min
            if (newVal !== '' && newVal >= this.max) newVal = this.max
            // 由于当多次输入都为NaN时，传入的value都是空字符串，导致不能触发watch函数，所以需要手动清空
            if (newVal === '') this.$refs.input.currentValue = ''
            if (newVal === oldVal) return
            this.$emit('input', newVal)
            this.$emit('change', newVal, oldVal)
            this.curValue = newVal
        },
        handleEnter (event) {
            this.$emit('on-enter', event)
        },
        handleFocus (event) {
            this.$emit('on-focus', event)
        },
        handleBlur (event) {
            this.$emit('on-blur', event)
        }
    },
    watch: {
        value (val) {
            if (this.curValue === val) return
            this.setCurrentValue(val)
        }
    }
}
</script>

<style lang="less">
@import '~@/style/theme.less';

@height: 30px;
@width: 32px;
@smallHeight: 22px;
@smallWidth: 24px;
@smallFontSize: 12px;
@smallWidth_wrap: 130px;
@largeHeight: 38px;
@largeWidth: 40px;
@largeFontSize: @font-size-large;
@largeWidth_wrap: 180px;
@aligns: left, right, center;
@size: small, large;

// 循环生成input各对齐方式样式
.align-loop(@n) when (@n > 0) {
    @align: extract(@aligns, @n);
    .l-number-input_input-text-@{align}{
        input{
            text-align: extract(@aligns, @n);
        }
    }
    .align-loop(@n - 1);
}
.align-loop(length(@aligns));

// 循环生成各size的样式
.size-loop(@n) when (@n > 0) {
    @s: extract(@size, @n);
    @w: '@{s}Width';
    @h: '@{s}Height';
    @f: '@{s}FontSize';
    @w_w: '@{s}Width_wrap';
    .l-number-input_@{s}{
        &.l-number-input{
            width: @@w_w;
        }
        .l-number-input_add,
        .l-number-input_subtract{
            width: @@w;
            height: @@h;
            line-height: @@h;
            font-size: @@f;
        }
        &.l-number-input_right{
            .l-number-input_add,
            .l-number-input_subtract{
                display: block;
                width: @@w;
                height: @@h / 2;
                line-height: @@h / 2;
            }
        }
    }
    .size-loop(@n - 1);
}
.size-loop(length(@size));

.l-number-input{
    width: 160px;
    display: inline-block;
    position: relative;
    vertical-align: middle;
}
.l-number-input_add,
.l-number-input_subtract{
    display: inline-block;
    width: @width;
    height: @height;
    line-height: @height;
    font-size: @font-size-base;
    text-align: center;
    cursor: pointer;
    &[disabled]{
        background: @gray-lighter;
        cursor: not-allowed;
        color: @disabled-color;
    }
}
.l-number-input_right{
    .l-number-input_add,
    .l-number-input_subtract{
        display: block;
        height: @height / 2;
        line-height: @height / 2;
    }
    .l-number-input_add{
        border-bottom: @border-base;
    }
}
.l-number-input_input{
    .ivu-input-group-prepend,
    .ivu-input-group-append{
        padding: 0 !important;
    }
}
</style>
