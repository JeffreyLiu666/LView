<!--
 * @Date: 2020-03-10 21:05:26
 * @Author: junfeng.liu
 * @LastEditTime: 2020-09-18 13:04:22
 * @LastEditors: junfeng.liu
 * @Description: 数值范围

    props
        value:              值
        check:              是否验证大小关系，该功能具体实现未定
        disabled:           是否禁用，两个都会禁用
        readonly:           是否只读
        placeholderLeft:    左侧input的placeholder
        placeholderRight:   右侧侧input的placeholder
        prefix:             输入框头部图标
        suffix:             输入框尾部图标
        max:                最大值
        min:                最小值
        floatLength:        LInput的属性，用于控制保留位数

    event
        on-change:          值改变事件，返回当前的值
 -->

<template>
    <div class="l-number-range">
        <LInput
            ref="left"
            class="l-number-range-input"
            type="number"
            number
            :value="currentValue[0]"
            :placeholder="placeholderLeft"
            :disabled="disabled"
            :readonly="readonly"
            :prefix="prefix"
            :suffix="suffix"
            :floatLength="floatLength"
            @on-change="handleLeftChange"
            @on-blur="handleLeftBlur" />
        <div class="l-number-range-line">~</div>
        <LInput
            ref="right"
            class="l-number-range-input"
            type="number"
            number
            :value="currentValue[1]"
            :placeholder="placeholderRight"
            :disabled="disabled"
            :readonly="readonly"
            :prefix="prefix"
            :suffix="suffix"
            :floatLength="floatLength"
            @on-change="handleRightChange"
            @on-blur="handleRightBlur" />
    </div>
</template>

<script>
import { isEmpty, isDeepEqual } from '@/utils/check'
import { deepCopy } from '@/utils/util'

export default {
    name: 'l-number-range',
    props: {
        value: {
            type: Array,
            default () {
                return []
            }
        },
        // TODO: 该功能先不做，还没想好
        check: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        placeholderLeft: {
            type: String,
            default: '请输入最小值'
        },
        placeholderRight: {
            type: String,
            default: '请输入最大值'
        },
        prefix: {
            type: String
        },
        suffix: {
            type: String
        },
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        floatLength: Number
    },
    data () {
        return {
            currentValue: []
        }
    },
    mounted () {
        this.setValue(this.value)
    },
    methods: {
        handleLeftBlur () {
            const left = this.currentValue[0]
            const right = this.currentValue[1]
            if (isEmpty(left)) return
            if (left < this.min) {
                this.setCurrentValue([this.min, right])
            } else if (left > this.max) {
                this.setCurrentValue([this.max, right])
            }
        },
        handleRightBlur () {
            const left = this.currentValue[0]
            const right = this.currentValue[1]
            if (isEmpty(right)) return
            if (right < this.min) {
                this.setCurrentValue([left, this.min])
            } else if (right > this.max) {
                this.setCurrentValue([left, this.max])
            }
        },
        handleLeftChange (val) {
            this.setCurrentValue([val, this.currentValue[1]])
        },
        handleRightChange (val) {
            this.setCurrentValue([this.currentValue[0], val])
        },
        checkSize (val) {
            const left = Number(val[0] === '' ? undefined : val[0])
            const right = Number(val[1] === '' ? undefined : val[1])
            return [
                left < this.min ? this.min : (left > this.max ? this.max : left),
                right < this.min ? this.min : (right > this.max ? this.max : right)
            ]
        },
        checkNaN (val) {
            return [
                isNaN(val[0]) ? '' : val[0],
                isNaN(val[1]) ? '' : val[1]
            ]
        },
        setCurrentValue (val) {
            const inputVal = val
            val = this.checkNaN(val)

            if (isDeepEqual(val, this.currentValue)) {
                if (!isDeepEqual(val, inputVal)) {
                    // 由于如果相等就return可能会导致input组件的值
                    // 和curValue对不上，所以这里手动修改
                    this.$refs.left.setCurrentValue(val[0])
                    this.$refs.right.setCurrentValue(val[1])
                }
                return
            }
            this.$emit('input', val)
            this.$emit('on-change', val)
            this.currentValue = val
        },
        // value改变是时候调用这个方法
        setValue (val) {
            if (isDeepEqual(val, this.currentValue)) return

            let localVal = deepCopy(val)
            localVal = this.checkSize(localVal)
            localVal = this.checkNaN(localVal)

            // 如果和value相等则直接赋值，这样可以避免在change事件中修改value时造成死循环
            if (isDeepEqual(localVal, val)) {
                this.currentValue = localVal
                return
            }
            // 如果数据处理后和curValue相等，则setCurrentValue会直接return，导致和父组件数据对不上
            if (isDeepEqual(localVal, this.currentValue)) {
                this.$emit('input', localVal)
                this.$emit('on-change', localVal)
                return
            }
            this.setCurrentValue(localVal)
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

