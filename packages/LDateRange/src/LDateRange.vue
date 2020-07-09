<!--
 * @Date: 2020-03-26 09:43:59
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-13 12:30:32
 * @LastEditors: junfeng.liu
 * @Description: 时间范围选择器

    props
        value:          值
        default:        默认选中时间范围，默认是week，初始化时传入empty表示不设默认值

 -->
<template>
    <div class="l-date-range">
        <DatePicker v-model="range" class="l-date-range-picker" :options="options" type="daterange" :editable="false" split-panels :placeholder="placeholder" @on-change="pickerChange"></DatePicker>
    </div>
</template>

<script>
import { formatDate, moveDate } from '@/utils/date'
import { isEmpty, isDeepEqual } from '@/utils/check'

export default {
    name: 'l-date-range',
    props: {
        value: {
            type: Array,
            default () {
                return []
            }
        },
        default: {
            type: String,
            default: 'week'
        },
        placeholder: {
            type: String,
            default: '选择查询日期区间'
        }
    },
    data () {
        return {
            range: [],
            options: {
                shortcuts: [
                    {
                        text: '今天',
                        value: () => {
                            return this.getToday()
                        }
                    },
                    {
                        text: '最近7天',
                        value: () => {
                            return this.getWeek()
                        }
                    },
                    {
                        text: '最近1个月',
                        value: () => {
                            return this.getMonth()
                        }
                    },
                    {
                        text: '最近3个月',
                        value: () => {
                            return this.get3Months()
                        }
                    },
                    {
                        text: '最近一年',
                        value: () => {
                            return this.getYear()
                        }
                    }
                ]
            }
        }
    },
    mounted () {
        if (!isEmpty(this.value) || this.default === 'empty') return

        this.range = this.getRangeByType(this.default)
        let range = [formatDate(this.range[0]), formatDate(this.range[1])]
        this.pickerChange(range)
    },
    methods: {
        getRangeByType (type) {
            switch (type) {
                case 'today':
                    return this.getToday()
                case 'week':
                    return this.getWeek()
                case '1month':
                    return this.getMonth()
                case '3months':
                    return this.get3Months()
            }
            return []
        },
        getToday () {
            let start = new Date()
            let end = new Date()
            return [start, end]
        },
        getWeek () {
            let start = moveDate(new Date(), { d: -7 })
            let end = new Date()
            return [start, end]
        },
        getMonth () {
            let start = moveDate(new Date(), { M: -1 })
            let end = new Date()
            return [start, end]
        },
        get3Months () {
            let start = moveDate(new Date(), { M: -3 })
            let end = new Date()
            return [start, end]
        },
        getYear () {
            let start = moveDate(new Date(), { y: -1 })
            let end = new Date()
            return [start, end]
        },
        pickerChange (val) {
            if (isDeepEqual(val, this.value)) return
            this.$emit('input', val)
            this.$emit('on-change', val)
        }
    },
    watch: {
        value: {
            handler: function (val) {
                if (isDeepEqual(val, this.range)) return
                this.range = val
            },
            immediate: true
        }
    }
}
</script>
