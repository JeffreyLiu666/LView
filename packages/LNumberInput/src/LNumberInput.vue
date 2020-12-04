<!--
 * @Date: 2020-03-27 16:33:07
 * @Author: junfeng.liu
 * @LastEditTime: 2020-12-01 21:45:05
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
        floatLength:        LInput的属性，用于控制保留位数

    event
        on-change:          值改变事件，返回当前的值，只有和value值不相等时才触发
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
        <LInput
            ref="input"
            class="l-number-input_input"
            :class="['l-number-input_input-text-' + textAlign]"
            type="number"
            number
            :value="currentValue"
            :disabled="disabled"
            :readonly="readonly"
            :placeholder="placeholder"
            :prefix="prefix"
            :suffix="suffix"
            :size="size"
            :floatLength="floatLength"
            @on-change="handleChange"
            @on-enter="handleEnter"
            @on-focus="handleFocus"
            @on-blur="handleBlur"
        >
            <span
                slot="append"
                class="l-number-input_add"
                :disabled="disabledAdd"
                @click="handleClick('add')">
                <Icon :type="controlsRight ? 'ios-arrow-up' : 'md-add'" />
            </span>
            <span
                :slot="controlsRight ?  'append' : 'prepend'"
                class="l-number-input_subtract"
                :disabled="disabledSub"
                @click="handleClick('subtract')">
                <Icon :type="controlsRight ? 'ios-arrow-down' : 'md-remove'" />
            </span>
        </LInput>
    </div>
</template>

<script>
import { isEmpty } from '@/utils/check.js'

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
        },
        floatLength: Number
    },
    data () {
        return {
            currentValue: ''
        }
    },
    computed: {
        controlsRight () {
            return this.controlsPosition === 'right'
        },
        disabledAdd () {
            return this.disabled || this.currentValue >= this.max
        },
        disabledSub () {
            return this.disabled || this.currentValue <= this.min
        }
    },
    mounted () {
    },
    methods: {
        handleClick (action) {
            if (this.disabled || this.readonly) return
            let value = isEmpty(this.currentValue) ? 0 : Number(this.currentValue)
            switch (action) {
                case 'add':
                    value += this.step
                    break
                case 'subtract':
                    value -= this.step
                    break
            }
            this.setCurrentValue(value, true)
        },
        handleChange (val) {
            // 为了优化体验，这里先判断输入的值是否为NaN，如果是，则手动删除，right同理
            // （LInput内部实现了控制）
            // if (isNaN(newVal)) return this.$refs.input.setCurrentValue(this.currentValue)
            this.setCurrentValue(val === '' ? null : val)
        },
        checkSize (val) {
            if (val === '') return ''
            if (val <= this.min) val = this.min
            if (val >= this.max) val = this.max
            return val
        },
        setCurrentValue (val, isFromValue = false) {
            const oldVal = this.currentValue
            // 加!isFromValue是因为watch里已经有判断了，调用了setCurrentValue说明和value不一样了，
            // 即使和curValue一样也还是需要更新value
            if (!isFromValue && val === oldVal) return

            if (isFromValue) {
                val = this.checkSize(val)
            }

            if (isNaN(val)) val = ''

            // 由于在使用组件时，如果在input或change事件中
            // 改变value的值会导致死循环，所以value改变调用时，再加个判断
            if (this.value === val) {
                this.currentValue = val
                return
            }

            this.$emit('input', val)
            this.$emit('on-change', val, oldVal)
            this.currentValue = val
        },
        handleEnter (event) {
            this.$emit('on-enter', event)
        },
        handleFocus (event) {
            this.$emit('on-focus', event)
        },
        handleBlur (event) {
            this.$emit('on-blur', event)
            let val = event.target.value
            if (val === '') return
            this.setCurrentValue(Number(val), true)
        },
        setValue (val) {
            if (this.currentValue === val) return
            // 不处理空值
            if (isEmpty(val)) {
                this.currentValue = val
                return
            }
            this.setCurrentValue(val, true)
        }
    },
    watch: {
        value: {
            handler: 'setValue',
            immediate: true
        }
    }
}
</script>
