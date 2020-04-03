<!--
 * @Date: 2020-03-10 21:05:26
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-02 21:39:09
 * @LastEditors: junfeng.liu
 * @Description: 数值范围

    props
        value:              值
        check:              是否验证大小关系，该功能具体实现未定
        disabled:           是否禁用，两个都为禁用
        readonly:           是否只读
        placeholderLeft:    左侧input的placeholder
        placeholderRight:   右侧侧input的placeholder
        prefix:             输入框头部图标
        suffix:             输入框尾部图标
        max:                最大值
        min:                最小值
 -->

<template>
    <div class="l-number-range">
        <Input
            ref="left"
            class="l-number-range-input"
            :value="curValue[0]"
            :placeholder="placeholderLeft"
            :disabled="disabled"
            :readonly="readonly"
            :prefix="prefix"
            :suffix="suffix"
            @on-change="handleLeftChange"
            @on-blur="handleLeftBlur" />
        <div class="l-number-range-line">~</div>
        <Input
            ref="right"
            class="l-number-range-input"
            :value="curValue[1]"
            :placeholder="placeholderRight"
            :disabled="disabled"
            :readonly="readonly"
            :prefix="prefix"
            :suffix="suffix"
            @on-change="handleRightChange"
            @on-blur="handleRightBlur" />
    </div>
</template>

<script>
import { isEmpty, isNull, isDeepEqual } from '@/lib/check'

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
    },
    data () {
        return {
            curValue: []
        }
    },
    mounted () {
        this.setValue(this.value)
    },
    methods: {
        handleLeftBlur () {
            const left = this.curValue[0]
            const right = this.curValue[1]
            if (isEmpty(left)) return
            if (left < this.min) {
                this.setCurrentValue([this.min, right])
            }
            if (left > this.max) {
                this.setCurrentValue([this.max, right])
            }
        },
        handleRightBlur () {
            const left = this.curValue[0]
            const right = this.curValue[1]
            if (isEmpty(right)) return
            if (right < this.min) {
                this.setCurrentValue([left, this.min])
            }
            if (right > this.max) {
                this.setCurrentValue([left, this.max])
            }
        },
        handleLeftChange (e) {
            if (!(e?.target?.value)) return
            const inputVal = Number(e.data)
            // 为了优化体验，这里先判断输入的值是否为NaN，如果是，则手动删除，right同理
            if (!isNull(e.data) && isNaN(inputVal)) return this.$refs.left.setCurrentValue(this.curValue[0])
            this.setCurrentValue([e.target.value, this.curValue[1]])
        },
        handleRightChange (e) {
            if (!(e?.target?.value)) return
            const inputVal = Number(e.data)
            if (!isNull(e.data) && isNaN(inputVal)) return this.$refs.right.setCurrentValue(this.curValue[1])
            this.setCurrentValue([this.curValue[0], e.target.value])
        },
        setCurrentValue (val) {
            const inputVal = val
            // 空字符串特殊处理
            const left = Number(val[0] === '' ? undefined : val[0])
            const right = Number(val[1] === '' ? undefined : val[1])
            if (
                isNaN(left)
                // (!isEmpty(left) && (left < this.min || left > this.max))
            ) {
                // const v = isNaN(left) ? '' : (left < this.min ? this.min : this.max)
                const v = ''
                val = [v, val[1]]
            }
            if (
                isNaN(right)
                // (!isEmpty(right) && (right < this.min || right > this.max))
            ) {
                // const v = isNaN(right) ? '' : (right < this.min ? this.min : this.max)
                const v = ''
                val = [val[0], v]
            }
            if (isDeepEqual(val, this.curValue)) {
                if (!isDeepEqual(val, inputVal)) {
                    // 由于如果相等就return可能会导致input组件的值
                    // 和curValue对不上，所以这里手动修改
                    this.$refs.left.setCurrentValue(val[0])
                    this.$refs.right.setCurrentValue(val[1])
                }
                return
            }
            this.$emit('input', val)
            this.$emit('change', val)
            this.curValue = val
        },
        // value改变是时候调用这个方法
        setValue (val) {
            if (isDeepEqual(val, this.curValue)) return
            const left = Number(val[0] === '' ? undefined : val[0])
            const right = Number(val[1] === '' ? undefined : val[1])
            val = [
                 left < this.min ? this.min : (left > this.max ? this.max : left),
                 right < this.min ? this.min : (right > this.max ? this.max : right)
            ]
            this.setCurrentValue(val)
        }
    },
    watch: {
        value: {
            handler: function (val) {
                this.setValue(val)
            },
            deep: true
        }
    }
}
</script>

