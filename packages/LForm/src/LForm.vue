<!--
        作者：1764635606@qq.com
        时间：2018-09-14
        描述：对bpform封装

    props:
        value:              数据对象，根据config中的key绑定数据（注意：会对其中的数据直接修改）
        config:             配置信息
        labelWidth:         所有label的宽度
        labelPosition:      所有label所在的位置（支持left，right，top）
        labelTextAlign:     所有label的textalign
        itemWidth:          所有单项的宽度
        contentWidth:       所有项的内容块的宽度
        inline:             是否为行内元素
        cacheKey:           要存储的缓存的键值（注意：不同账号之间需要区分可以通过不同key来实现，其他情况同理）

    methods:
        clearCache:         调用该方法可以清除数据缓存，默认使用cacheKey，可自己传key

    emit:
        on-change           数据改变时触发,返回data(深拷贝)

    config可配置信息
        type:               表单类型，支持字符串和数组，（注意：数组的支持不完善）
        hidden:             是否隐藏，仅控制display
        show:               是否显示，会控制渲染列表，支持函数
        key:                会根据key从data中获取数据
        label:              label的内容
        itemWidth:          单项的宽度
        labelWidth:         该项的label宽度
        contentWidth:       该项的内容块的宽度
        require:            是否必填，会显示星号
        render:             可自定义bp-form-item-content中的内容
        also:               其他参考bp-form-enca
-->

<template>
    <div class="l-form">
        <LFormGroup ref="lformGroup" :inline="inline" :labelWidth="labelWidth" :labelPosition="labelPosition" :labelTextAlign="labelTextAlign" :contentWidth="contentWidth" :itemWidth="itemWidth">
            <slot name="pre"></slot>
            <LFormItem
                v-for="(item, index) in configList"
                :key="item.key + '' + index"
                :label="item.label"
                :labelRender="item.labelRender"
                :itemWidth="item.itemWidth"
                :labelWidth="item.labelWidth"
                :contentWidth="item.contentWidth"
                :labelPosition="item.labelPosition"
                :labelTextAlign="item.labelTextAlign"
                :inline="item.inline"
                :className="item.className"
                :styleObj="item.styleObj"
                :isTitle="item.type === 'title'"
                v-show="!item.hidden">
                <span slot="label" class="my-require" v-if="item.require"></span>
                <LFormEnca
                    v-if="item.type && item.type !== 'title'"
                    :type="item.type"
                    :keyName="item.key"
                    @on-change="change"
                    @query-change="queryChange"
                    v-model="value[item.key]"
                    :config="item.config"
                    :request="item.request"
                    :list="item.list"
                    :editable="item.editable"
                    :clearable="item.clearable"
                    :disabled="item.disabled"
                    :placeholder="item.placeholder"
                    :maxlength="item.maxlength"
                    :loading="item.loading"
                    :require="item.require"
                    :rules="item.rules"
                    :noCheck="item.noCheck"
                    :DatePickerType="item.DatePickerType">
                </LFormEnca>
                <LRender v-if="item.render" :render="item.render" :params="item"></LRender>
            </LFormItem>
            <slot></slot>
        </LFormGroup>
    </div>
</template>

<script>
// import LFormGroup from './LFormGroup.vue'
// import LFormItem from './LFormItem.vue'
// import LFormEnca from './LFormEnca.vue'
// import { util } from '@/utils'
import { isFunction, isNull } from '@/utils/check.js'

export default {
    name: 'l-form',
    // components: { LFormGroup, LFormItem, LFormEnca },
    props: {
        value: {
            type: Object,
            default: () => {
                return {}
            }
        },
        config: {
            type: Array,
            default: () => {
                return []
            }
        },
        labelWidth: {
            type: [Number, String]
        },
        labelPosition: {
            type: String,
            default: 'top'
        },
        contentWidth: {
            type: [Number, String]
        },
        itemWidth: {
            type: [Number, String]
        },
        labelTextAlign: {
            type: String,
            default: 'left'
        },
        inline: {
            type: Boolean,
            default: false
        },
        cacheKey: {
            type: String
        }
    },
    data () {
        return {
        }
    },
    computed: {
        configList () {
            return this.config.filter((item) => {
                const show = item.show
                if (isFunction(show)) return show()
                else if (!isNull(show)) return !!show
                else return true
            })
        }
    },
    watch: {
        value: {
            handler (val) {
                if (this.cacheKey) {
                    let dataStr = JSON.stringify(val)
                    localStorage.setItem(this.cacheKey, dataStr)
                }
            },
            deep: true,
            immediate: true
        }
    },
    mounted () {
        if (this.cacheKey) {
            let storageStr = localStorage.getItem(this.cacheKey)
            if (storageStr) {
                this.$emit('input', JSON.parse(storageStr))
            }
        }
    },
    methods: {
        change (key, val, arr) { // 键名  值  级联的名称数组
            // let result = util.deepCopy(this.value)
            this.$emit('on-change', key, val, arr)
        },
        queryChange (key, val) { // 键名  值
            this.$emit('query-change', key, val)
        },
        clearCache (key) {
            let k = key || this.cacheKey
            localStorage.removeItem(k)
        },
        isNoError () {
            return !this.$refs.lformGroup.$children.some((item) => {
                return item.isError
            })
        },
        // 清除错误状态
        clearState () {
            for (let item of this.$refs.lformGroup.$children) {
                if (!item) continue
                item.isError = false
                item.errMsg = ''
            }
        },
        // 检测所有子组件的规则
        checkAllRules () {
            let promiseList = []
            for (let item of this.$refs.lformGroup.$children) {
                let child = item.$children[0]
                if (!child) continue
                promiseList.push(child.checkRules())
            }
            return Promise.all(promiseList).then((res) => {
                for (let item of res) {
                    if (item === 'empty' || item === true) continue
                    if (item === false) return Promise.resolve(false)
                }
                return Promise.resolve(true)
            })
        }
    }
}
</script>
