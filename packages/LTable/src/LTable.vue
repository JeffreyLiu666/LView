<!--
 * @Date: 2020-03-26 09:43:59
 * @Author: junfeng.liu
 * @LastEditTime: 2021-02-23 21:13:43
 * @LastEditors: junfeng.liu
 * @Description: 表格组件

    props
        data:                   数据
        columns:                列配置
        stripe:                 是否显示间隔斑马纹
        border:                 是否显示纵向边框
        show-header:            是否显示表头
        show-summary:           是否在表尾显示合计行
        summary-method:         自定义的合计计算方法
        loading:                表格是否加载中

    columns                     除了iview中的配置，还有自定义的配置
        dataFunc:               显示该函数处理后返回的值
        buttons：               按钮数组
        links:                  link数组
        ellipsis:               文本将不换行，超出部分显示为省略号(原来为：overflowHide)
        custom:                 默认type === index将会根据分页递增，如果custom设为true将会使用iview的默认方式
        type===inputNumber:     使用LInputNumber。注意：需要配置onChange手动更新data

 -->
<template>
    <div class="l-table">
        <Table
            :width="width"
            :height="height"
            :data="data"
            :columns="cols"
            :stripe="stripe"
            :border="border"
            :show-header="showHeader"
            :show-summary="showSummary"
            :summary-method="summaryMethod"
            :span-method="spanMethod"
            :loading="loading"
            v-bind="$attrs"
            v-on="$listeners">
        </Table>
        <Page
            class="l-table-page"
            v-if="showPage"
            :current="current"
            :page-size="pageSize"
            :total="total"
            :show-total="showTotal"
            :show-elevator="showElevator"
            @on-change="handlePageChange" >
            <slot name="page"></slot>
        </Page>
    </div>
</template>

<script>
import { isFunction, isNull, isEmpty } from '@/utils/check'
import { deepCopy } from '@/utils/util'

export default {
    name: 'l-table',
    props: {
        data: Array,
        columns: {
            type: Array,
            default () {
                return []
            }
        },
        stripe: {
            type: Boolean,
            default: true
        },
        border: {
            type: Boolean,
            default: true
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        loading: {
            type: Boolean,
            default: false
        },
        total: {
            type: Number,
            default: 0
        },
        current: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 0
        },
        showTotal: {
            type: Boolean,
            default: true
        },
        showElevator: {
            type: Boolean,
            default: true
        },
        showPage: {
            type: Boolean,
            default: true
        },
        showSummary: {
            type: Boolean,
            default: false
        },
        summaryMethod: {
            type: Function
        },
        spanMethod: {
            type: Function
        },
        width: {
            type: [Number, String]
        },
        height: {
            type: [Number, String]
        }
    },
    computed: {
        cols () {
            return this.columns.map((item) => {
                return this.dealColItem(deepCopy(item))
            })
        }
    },
    data () {
        return {}
    },
    methods: {
        handlePageChange (cur) {
            this.$emit('update:current', cur)
            this.$emit('on-page-change', cur)
        },
        dealColItem (item) {
            if (isFunction(item.dataFunc)) return this.getCustomData(item)
            if (Array.isArray(item.buttons)) return this.getButtons(item)
            if (Array.isArray(item.links)) return this.getLinks(item)
            if (item.ellipsis) return this.getEllipsis(item)
            // 留下custom用于需要自定义时用
            if (item.type === 'index' && !item.custom) return this.getIndexCol(item)
            if (item.type === 'inputNumber' && !item.custom) return this.getInputNumber(item)
            if (!Array.isArray(item.children)) return item
            let list = []
            item.children.forEach((it) => {
                list.push(this.dealColItem(it))
            })
            item.children = list
            return item
        },
        // 设置type === 'index'的列
        getIndexCol (item) {
            item.indexMethod = (row) => (row._index + 1 + (this.current - 1) * this.pageSize)
            return item
        },
        // 将值设为dataFunc的返回值
        getCustomData (item) {
            if (item.type === 'html') {
                delete item.type
                item.render = (h, { row, column, index }) => {
                    let val = row[column.key]
                    return (
                        <span domPropsInnerHTML={ item.dataFunc(val, row, column, index) }></span>
                    )
                }
                return item
            }
            item.render = (h, { row, column, index }) => {
                let val = row[column.key]
                return (
                    <span>{ item.dataFunc(val, row, column, index) }</span>
                )
            }
            return item
        },
        // 生成按钮
        getButtons (item) {
            item.render = (h, params) => {
                let btns = item.buttons.map((btn) => {
                    let show = true
                    let hasPermission = true

                    if (isFunction(btn.show)) show = btn.show(params)
                    else if (!isNull(btn.show)) show = !!btn.show

                    if (isFunction(this.__l_checkPermission__) && !isEmpty(btn.permission)) {
                        hasPermission = this.__l_checkPermission__(btn.permission)
                    }

                    if (!show || !hasPermission) return null

                    return (
                        <Button style={ btn.style } icon={ btn.icon } type={ btn.type || 'primary' } size={ btn.size || 'small' } onClick={ item.onClick.bind(null, (Object.assign({}, params, btn))) }>{ btn.label }</Button>
                    )
                })
                return (
                    <div class="l-table-td-btns">{ ...btns }</div>
                )
            }
            return item
        },
        // 生成a标签样式的按钮
        getLinks (item) {
            item.render = (h, params) => {
                let links = item.links.map((link) => {
                    let show = true
                    let hasPermission = true

                    if (isFunction(link.show)) show = link.show(params)
                    else if (!isNull(link.show)) show = !!link.show

                    if (isFunction(this.__l_checkPermission__) && !isEmpty(link.permission)) {
                        hasPermission = this.__l_checkPermission__(link.permission)
                    }

                    if (!show || !hasPermission) return null

                    return (
                        <a onClick={ item.onClick.bind(null, (Object.assign({}, link, params))) }>{ link.label }</a>
                    )
                })
                return (
                    <div class="l-table-td-links">{ ...links }</div>
                )
            }
            return item
        },
        // 显示单行文本和省略号
        getEllipsis (item) {
            item.render = (h, { row, column }) => {
                let val = row[column.key]
                return (
                    <div class="l-view-text-ellipsis" title={ val }>{ val }</div>
                )
            }
            return item
        },
        getInputNumber (item) {
            item.render = (h, { row, column, index }) => {
                const { onChange, config = {} } = column
                const {
                    size = 'small',
                    min,
                    max,
                    step,
                    disabled,
                    placeholder,
                    controlsPosition,
                    floatLength,
                    textAlign,
                    readonly,
                    prefix,
                    suffix
                } = config
                let val = row[column.key]
                return (
                    <LNumberInput
                        style={ 'width: 100%;' }
                        value={ val }
                        size={ size }
                        min={ min }
                        max={ max }
                        step={ step }
                        placeholder={ placeholder }
                        controlsPosition={ controlsPosition }
                        floatLength={ floatLength }
                        textAlign={ textAlign }
                        readonly={ readonly }
                        disabled={ disabled }
                        prefix={ prefix }
                        suffix={ suffix }
                        onOn-change={ isFunction(onChange) ? cVal => {
                            onChange(cVal, row, column, index)
                        } : undefined }></LNumberInput>
                )
            }
            delete item.type
            item.className += ' inputNumberTd'
            return item
        }
    }
}
</script>
