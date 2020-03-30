<!--
 * @Date: 2020-03-10 21:05:26
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-30 14:08:11
 * @LastEditors: junfeng.liu
 * @Description: 数值范围

    props
        value:          值
        check:          是否验证大小关系，该功能有问题，慎用
        disabled:       是否禁用，两个都为禁用
        readonly:       是否只读
        prefix:         输入框头部图标
        suffix:         输入框尾部图标
        max:            最大值
        min:            最小值
 -->

<template>
    <div class="l-number-range">
        <Input
            class="l-number-range-input"
            v-model="value[0]"
            type="number"
            placeholder="请输入最小值"
            :disabled="disabled"
            :readonly="readonly"
            :prefix="prefix"
            :suffix="suffix"
            @on-change="handleMinChange" />
        <div class="l-number-range-line">~</div>
        <Input
            class="l-number-range-input"
            v-model="value[1]"
            type="number"
            placeholder="请输入最大值"
            :disabled="disabled"
            :readonly="readonly"
            :prefix="prefix"
            :suffix="suffix"
            @on-change="handleMaxChange" />
    </div>
</template>

<script>
import { isNull } from '@/lib/check'

export default {
    name: 'l-number-range',
    props: {
        value: {
            type: Array,
            default () {
                return []
            }
        },
        //FIXME: check不能保证值一定正确，如果用户输入了错误数字，由于iview的bug，可能会造成数据和实际显示对不上，因此需要另外逻辑处理
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
        prefix: {
            type: String
        },
        suffix: {
            type: String
        },
        max: {
            type: Number
        },
        min: {
            type: Number
        }
    },
    data () {
        return {
        }
    },
    mounted () {},
    methods: {
        handleMinChange () {
            let min = Number(this.value[0])
            let max = Number(this.value[1])
            if (!this.check) return this.$emit('input', this.value)
            if (isNaN(max) || min > max) this.$emit('input', [min, min + 1])
        },
        handleMaxChange () {
            let min = Number(this.value[0])
            let max = Number(this.value[1])
            if (!this.check) return this.$emit('input', this.value)
            if (isNaN(min) || min > max) this.$emit('input', [max - 1, max])
        }
    }
}
</script>

