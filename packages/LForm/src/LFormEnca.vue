<!--
 * @Date: 2020-02-25 12:49:46
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-27 11:25:51
 * @LastEditors: junfeng.liu
 * @Description: 将常用组件分装在一起，并添加一些功能

    props:
        keyName:            键值（on-change事件的第一个值）
        value:              绑定的值(支持v-model)
        list:               select,cascader等组件的数据
        type:               要用的组件类型
        DatePickerType:     datepicker时间选择器的类型
        radioType:          radio的类型，可填button或不填
        editable:           是否可编辑（部分组件支持）
        clearable:          是否可清空（部分组件支持）
        disabled:           是否禁用
        placeholder:        占位文本
        maxlength:          最大长度（部分组件支持）
        loading:            是否加载中（部分组件支持）
        config:             其他的一些配置信息（如果有组件需要一些其他信息，可用该参数）

    methods:

    emit:
        on-change           数据改变时触发,返回value
-->

<template>
    <div class="l-form-encapsulation">
        <!--单选框-->
        <RadioGroup :value="val" :type="radioType" v-if="type === 'radio'" @on-change="change">
            <Radio v-for="item in cList" :key="item.value" :label="item.value" :disabled="disabled">{{item.label}}</Radio>
        </RadioGroup>
        <!--多选框-->
        <Checkbox :value="val" @on-change="change" v-if="type === 'checkbox' && cList.toString() === ''">{{config.label ? config.label : ''}}</Checkbox>
        <CheckboxGroup :value="val" v-else-if="type === 'checkbox'" @on-change="change">
            <Checkbox v-for="item in cList" :key="item.value" :label="item.value" :style="{width: item.width?item.width:config.width}" :disabled="disabled || item.disabled">
                <Icon :type="item.icon" v-if="item.icon"></Icon>
                <span>{{item.label}}</span>
            </Checkbox>
        </CheckboxGroup>
        <!--选择框-->
        <Select
            :value="val"
            :disabled="disabled"
            :clearable="clearable"
            :placeholder="placeholder"
            :placement="config.placement"
            :multiple="config.multiple"
            :filterable="config.filterable"
            :remote="config.remote"
            :remote-method="config.remoteMethod"
            :transfer="config.transfer"
            :loading="isLoading"
            @on-query-change="queryChange"
            @on-change="change"
            v-if="type === 'select'">
            <Option
                v-for="it in cList"
                :key="it.value"
                :tag="it.label"
                :value="it.value">{{it.label}}</Option>
        </Select>
        <!--日期选择器-->
        <DatePicker
            class="date-picker"
            :value="val"
            :editable="editable"
            :clearable="clearable"
            :type="DatePickerType"
            :placeholder="placeholder"
            :disabled="disabled"
            :transfer="config.transfer"
            @on-change="change"
            v-if="type === 'datePicker'">
        </DatePicker>
        <!--时间选择器-->
        <TimePicker
            class="date-picker"
            :value="val"
            :editable="editable"
            :clearable="clearable"
            :type="config.type"
            :placeholder="placeholder"
            :disabled="disabled"
            :separator="':'"
            :transfer="config.transfer"
            @on-change="change"
            v-if="type === 'timePicker'">
        </TimePicker>
        <!-- 日期选择器 -->
        <LDateRange
            :value="val"
            :default="config.default"
            @on-change="change"
            v-if="type === 'dateRangePicker'">
        </LDateRange>
        <!--输入框-->
        <i-input
            :value="val"
            :clearable="clearable"
            :placeholder="placeholder"
            :disabled="disabled"
            :maxlength="maxlength"
            :show-word-limit="config.showWordLimit"
            :readonly="editable"
            :type="config.type"
            :showEye="config.showEye"
            :prefix="config.prefix"
            :suffix="config.suffix"
            :rows="config.rows"
            :autosize="config.autosize"
            :filterable="config.filterable"
            :multiple="config.multiple"
            :password="config.password"
            @input="change"
            @on-enter="handleEnter"
            @on-focus="handleFocus"
            @on-blur="handleBlur"
            @on-change="handleInput"
            v-if="type === 'input'">
            <span slot="prepend" v-if="config.prepend || config.prependRender">
                {{ config.prepend }}
                <LRender :render="config.prependRender" v-if="config.prependRender"></LRender>
            </span>
            <span slot="append" v-if="config.append || config.appendRender">
                {{ config.append }}
                <LRender :render="config.appendRender" v-if="config.appendRender"></LRender>
            </span>
        </i-input>
        <!--数字范围-->
        <LNumberRange
            v-model="val"
            :disabled="disabled"
            :readonly="editable"
            :prefix="config.prefix"
            :suffix="config.suffix"
            :check="config.check"
            @input="change"
            v-if="type === 'numberRange'"></LNumberRange>
        <!--级联选择器-->
        <Cascader
            :value="val"
            :data="cList"
            :clearable="clearable"
            :placeholder="placeholder"
            :disabled="disabled"
            :transfer="config.transfer"
            @on-change="cascaderChange"
            v-if="type === 'cascader'">
        </Cascader>
        <!--文本-->
        <div class="l-form-text-content" v-if="type === 'text'">{{val}}</div>
        <!--开关选择器-->
        <i-switch :value="val" :disabled="disabled" :size="config.size" @on-change="change" v-if="type === 'switch'">
            <span slot="open" v-if="config.openLabel">{{config.openLabel}}</span>
            <span slot="close" v-if="config.closeLabel">{{config.closeLabel}}</span>
        </i-switch>
        <!--按钮-->
        <Button
            :style="{ width: config.width }"
            :long="config.long"
            :disabled="disabled"
            :icon="config.icon"
            :type="config.type"
            @click="handleClick"
            v-if="type === 'button'">{{ config.text }}</Button>
        <!--多个按钮-->
        <template v-if="type === 'buttons'">
            <Button
                v-for="(item, index) in config.buttons"
                :key="'l-form-enca-btn-' + index"
                class="l-form-enca-btns"
                :style="{ width: item.width }"
                :long="item.long"
                :disabled="disabled || item.disabled"
                :icon="item.icon"
                :type="item.type"
                @click="handleClick($event, item)">{{ item.text }}</Button>
        </template>
    </div>
</template>
 
<script>
    import { util, check } from '@/lib'

    export default{
        name: 'l-form-enca',
        props: {
            keyName: {},
            value: {}, // 选中项的value
            list: {
                type: [Array, Object],
            }, // select基本结构：{value：'key'，label：'text'}
            type: {
                type: String,
                default: 'input'
            },
            DatePickerType: {
                type: String,
                default: 'date'
            },
            radioType: {
                type: String,
            },
            minPlaceholder: {
                type: String
            },
            maxPlaceholder: {
                type: String
            },
            editable: {
                type: Boolean,
                default: false
            },
            clearable: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            placeholder: {
                default: ''
            },
            maxlength: {
                type: Number
            },
            loading: {
                type: Boolean,
                default: false
            },
            multiple: {
                type: Boolean,
                default: false
            },
            config: {
                type: [Object, Array],
                default: () => {
                    return {}
                }
            },
            require: {
                type: Boolean,
                default: false
            },
            rules: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data () {
            return {
                requestParam: {}, // 请求参数
                isInsideRemote: false, // 是否内部实现远程请求
                rList: [], // 请求返回处理后的list
                baseList: [],// 请求返回的list
                val: undefined, // 为了兼容各个组件，这里设为undefined
                checkTriggers: {change: [], blur: []},
                timeoutId: '',
                isLoading: false
            }
        },
        computed: {
            cList () {
                let result = []
                if (!check.isEmpty(this.rList)) {
                    result = this.rList
                }
                else if (!check.isEmpty(this.list)) {
                    if (check.isArray(this.list)) {
                        result = this.list
                    }
                    else {
                        result.push(this.list)
                    }
                }
                return result
            },
            canSearch () {
                return this.type === 'select' && this.config?.requestParam?.urlParam && true
            }
        },
        mounted () {
            //由于datePicker对时区的处理与moment不同，这里先用moment处理一下
            if (this.type === 'datePicker' && this.DatePickerType === 'date') {
                this.$emit('input', this.formatDate(this.value))
                this.val = this.formatDate(this.value)
            } else {
                this.val = this.value
            }
            //判断select是否需要组件内部请求获取list
            if (this.canSearch) {
                this.getList()
                if (this.config.remote && check.isEmpty(this.config.remoteMethod)) {
                    //远程请求方法用on-query-change事件代替
                    this.isInsideRemote = true
                    // this.config.remoteMethod = (input) => {
                        // this.getList(input)
                    // }
                }
            }
            if (this.require) { // 如果是required则自动添加一条规则
                if (this.type === 'input') {
                    this.checkTriggers['blur'].push({type: 'require'})
                } else {
                    this.checkTriggers['change'].push({type: 'require'})
                }
            }
            for (let item of this.rules) { // 添加需要的事件类型
                if (!check.isObject(item)) continue
                if (check.isEmpty(item.trigger)) {
                    this.checkTriggers.change.push(Object.assign({}, item)) // 默认放到change事件中
                    continue
                }
                if (check.isEmpty(this.checkTriggers[item.trigger])) {
                    this.checkTriggers[item.trigger] = []
                }
                this.checkTriggers[item.trigger].push(Object.assign({}, item)) // 放入相应事件中
            }
        },
        methods: {
            checkRules () { // 将会检测所有rules，返回promise.all对象
                if (check.isEmpty(this.rules) && !this.require) return Promise.resolve('empty') //如果没有规则就返回‘empty’
                let promiseList = []
                if (this.require) { // 将required检测放在首位
                    promiseList.push(this.check('require', this.val, '该项为必填项'))
                }
                for (let item of this.rules) {
                    if (check.isEmptyObject(item) || (check.isEmpty(item.type) && check.isEmpty(item.validator))) continue
                    promiseList.push(this.check(item.validator || item.type, this.val, item.message))
                }
                return Promise.all(promiseList).then((res) => {
                    // 通过emit解耦合，但考虑遍历的情况，还是保留$parent的方式
                    this.$emit('checkResult', { isError: false, msg: '' })
                    this.$parent.errMsg = ''
                    this.$parent.isError = false
                    return Promise.resolve(true)
                }).catch((res) => {
                    this.$emit('checkResult', { isError: true, msg: res.msg })
                    this.$parent.errMsg = res.msg
                    this.$parent.isError = true
                    return Promise.resolve(false)
                })
            },
            checkHandle (list, val) { // 有相关事件触发的走这里
                if (check.isEmpty(list)) return
                let promiseList = list.map((item) => {
                    return this.check(item.validator || item.type, val, item.message)
                })
                Promise.all(promiseList).then((res) => {
                    this.$emit('checkResult', { isError: false, msg: '' })
                    this.$parent.errMsg = ''
                    this.$parent.isError = false
                }).catch((res) => {
                    this.$emit('checkResult', { isError: true, msg: res.msg })
                    this.$parent.errMsg = res.msg
                    this.$parent.isError = true
                })
            },
            check (type, val, msg = '') { // 返回promise对象,通过校验则返回resolve，未通过则返回reject\
                let result = false
                if (check.isFunction(type)) {
                    return new Promise((resolve, reject) => { // 自定义校验用promise包着
                        type(this.keyName, val, (err = {}) => {
                            if (!(err instanceof Error)) {
                                return resolve({ isOk: true, msg: '' })
                            }
                            return reject({ isOk: false, msg: err.message })
                        })
                    })
                }
                if (type !== 'require' && check.isEmpty(val)) { // 如果不是必填则可以为空
                    return Promise.resolve({ isOk: true, msg: msg })
                }
                switch (type) { // 各种校验
                    case 'require':
                        result = !check.isEmpty(val)
                        msg = msg || '该项为必填项'
                        break;
                    case 'string':
                        result = check.isString(val)
                        break;
                    case 'array':
                        result = check.isArray(val)
                        break;
                    case 'number':
                        result = check.isNumberString(val)
                        break;
                    case 'object':
                        result = check.isObject(val)
                        break;
                    case 'function':
                        result = check.isFunction(val)
                        break;
                    case 'IDCard':
                        result = check.isIDCard(val)
                        break;
                    case 'bankCardID':
                        result = check.isBankCardID(val)
                        break;
                    case 'chinese':
                        result = check.isCNChar(val)
                        break;
                    case 'ip':
                        result = check.isIP(val)
                        break;
                    case 'email':
                        result = check.isEmail(val)
                        break;
                    case 'contact':
                        result = check.isContact(val)
                        break;
                    case 'mobile':
                        result = check.isMobile(val)
                        break;
                    case 'phone400':
                        result = check.is400(val)
                        break;
                    case 'phone':
                        result = check.isPhone(val)
                        break;
                    case 'url':
                        result = check.isUrl(val)
                        break;
                    // case 'password':
                    //     result = check.isPassword(val)
                    //     break;
                    // case 'loginID':
                    //     result = check.isLoginID(val)
                    //     break;
                    default: // 潜规则，如果类型不存在则直接将type与val对比
                        result = type === val
                }
                if (result) {
                    return Promise.resolve({ isOk: result, msg: msg })
                } else {
                    return Promise.reject({ isOk: result, msg: msg }) // 直接抛出错误，结束promise.all
                }
            },
            formatList (list, key1, key2) { //处理list，将请求返回的list处理成所需格式
                if (!Array.isArray(list)) return
                return list.map((item) => {
                    return { value: item[key1], label: item[key2] }
                })
            },
            getList (inputValue) { // 内部实现远程请求(目前只用于select)
                if (!this.canSearch) return
                if (check.isEmptyObject(this.requestParam)) { // 处理requestParam
                    let requestParam = util.deepCopy(this.config.requestParam)
                    let valKey = check.isEmpty(requestParam.valueKey) ?  'id' : requestParam.valueKey
                    let labelKey = check.isEmpty(requestParam.labelKey) ? 'name' : requestParam.labelKey
                    let inputKey = check.isEmpty(requestParam.inputKey) ? labelKey : requestParam.inputKey
                    let urlParam = requestParam.urlParam
                    // 默认分页参数
                    let param = { pageIndex: 1, pageSize: 1000 }
                    // urlParam不为Object或没有url则不请求
                    if (!check.isObject(urlParam) || check.isEmpty(urlParam.url)) {
                        console.error('urlParam必须为Object类型且url不能为空')
                        return
                    }
                    // noSpin默认为true
                    urlParam = Object.assign({ noLoading: true }, urlParam)
                    if (!check.isEmpty(requestParam.param)) { //requestParam.param不变的参数
                        param = Object.assign({}, param, requestParam.param)
                    }
                    // 支持取跳转页面带的参数
                    // if (!check.isEmpty(requestParam.page)) { //requestParam.page页面的name
                    //     let pParam = util.getPageParam(this, requestParam.page)
                    //     pParam = pParam ? pParam : {}
                    //     //requestParam.pageParam用于取特定数据
                    //     if (Array.isArray(requestParam.pageParam) && !check.isEmpty(requestParam.pageParam)) {
                    //         for (let key of requestParam.pageParam) {
                    //             param[key] = pParam[key]
                    //         }
                    //     } else {
                    //         param = Object.assign({}, param, pParam)
                    //     }
                    // }
                    if (this.config.remote && this.config.filterable) { // 支持输入搜索
                        param[inputKey] = inputValue
                    }
                    this.requestParam = requestParam
                    this.requestParam.valueKey = valKey
                    this.requestParam.labelKey = labelKey
                    this.requestParam.inputKey = inputKey
                    this.requestParam.urlParam = urlParam
                    this.requestParam.param = param
                }
                else if (this.config.remote && this.config.filterable) {
                    this.requestParam.param[this.requestParam.inputKey] = inputValue
                }
                if (!this.__lform_ajax__ || !check.isFunction(this.__lform_ajax__.request)) {
                    throw new Error('未配置请求函数')
                }
                this.isLoading = true
                this.__lform_ajax__.request(this.requestParam.urlParam, this.requestParam.param).then((data) => {
                    // 列表数据必须遵循的返回格式{ data:{ list: [] }}或{ data:[] }
                    let list = []
                    if (Array.isArray(data)) list = data
                    else if (data && Array.isArray(data.list)) list = data.list
                    else return
                    this.baseList = util.deepCopy(list)
                    this.rList = this.formatList(list, this.requestParam.valueKey, this.requestParam.labelKey)
                }).finally(() => {
                    this.isLoading = false
                })
            },
            queryChange (e) { // select输入搜索
                this.$emit('query-change', this.keyName, e)
                if (!this.isInsideRemote) return
                let searchStr = e.replace(/(^\s*)|(\s*$)/g, '') // 去掉首尾空格
                // if (searchStr === '') {
                //     this.val = null
                // }
                if (this.timeoutId) { // 防抖
                    clearTimeout(this.timeoutId)
                }
                this.timeoutId = setTimeout(() => {
                    this.getList(searchStr)
                }, 800)
            },
            change (e) {
                let list = this.canSearch ? this.baseList : this.list
                this.val = e
                this.$emit('input', e)
                this.$emit('on-change', this.keyName, e, util.deepCopy(list))
                this.checkHandle(this.checkTriggers.change, e)
            },
            cascaderChange (val, list) {
                this.$emit('input', val)
                this.$emit('on-change', this.keyName, val, list)
                this.checkHandle(this.checkTriggers.change, val)
            },
            handleEnter (event) {
                this.checkHandle(this.checkTriggers.enter, this.val)
            },
            handleFocus (event) {
                this.checkHandle(this.checkTriggers.focus, this.val)
            },
            handleBlur (event) {
                this.checkHandle(this.checkTriggers.blur, this.val)
            },
            handleInput (event) {
                this.checkHandle(this.checkTriggers.input, event)
            },
            // 按钮点击
            handleClick (e, item) {
                // e的取值不要按第二位取，要根据最后一位取
                if (!check.isFunction(this.config.onClick)) return
                this.config.onClick(item, e)
            }
        },
        watch: {
            value (val) {
                this.val = val
            },
            loading (val) {
                this.isLoading = val
            },
            config: {
                handler: function (val) {
                    if (!this.canSearch) return
                    this.requestParam = {}
                    this.getList()
                },
                deep: true
            }
        }
    }
</script>

<style lang="less">
    .l-form-encapsulation{
        .l-form-text-content{
            line-height: 32px;
            font-size: 13px;
            padding: 0 7px;
        }
        .ivu-date-picker{
            display: block !important;
        }
    }
    .l-form-enca-btns+.l-form-enca-btns{
        margin-left: 16px;
    }
</style>
