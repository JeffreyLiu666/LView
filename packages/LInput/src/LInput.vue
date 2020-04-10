<!--
 * @Date: 2020-04-07 17:06:58
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-10 14:26:11
 * @LastEditors: junfeng.liu
 * @Description: 输入框

	props:
       value:               绑定的值
       type:                input所有支持的类型和textarea
       placeholder：        占位文本
       prefix：             头部图标(支持textarea，但line-height为32px)
       suffix:              尾部图标(支持textarea，但line-height为32px)
       clearable:           是否显示情况按钮
       showEye:             当type='password'的时候生效，若为true则显示眼睛图标，可切换是否展示密码
       disabled:            设置输入框为禁用状态
       maxlength:           最大输入长度，除了checkChinese为true时，其它时候都为原生属性，只支持type=text和type=password
       readonly:            设置输入框为只读
       autosize:            textarea自适应高度
       rows:                textarea的行数
       max:                 原生属性，type==='number'时最大的数
       min:                 原生属性，type==='number'时最小的数
       step:                原生属性，type==='number'时步长
       showWordLimit:       是否显示输入字数统计
       checkChinese:        是否根据maxlength检测中文长度，一个中文长度占两位
       number:              是否在blur时将值转为number型
       floatLength:         浮点数小数点后长度，0为整形，负数为不检测，正数为保留小数点后几位(仅当type==='number')(仅当失焦或传入value时处理，实时会影响输入体验)
       size:                组件大小;有：large,small,default(所有错误的值都是default)
       isError:             是否为错误状态

    event:
        on-input            输入框输入时触发，返回value,返回的数据未处理
        on-enter            按下回车键时触发    无
        on-change           数据改变时触发,返回currentValue，只有和value值不相等时才出发
        on-focus            输入框聚焦时触发,返回event
        on-blur             输入框失去焦点时触发,返回event
        on-keyup            原生的 keyup 事件,返回event
        on-keydown          原生的 keydown 事件,返回event
        on-keypress         原生的 keypress 事件,返回event
        on-click-prefix     点击输入框头部图标时触发
        on-click-suffix     点击输入框尾部图标时触发

	注意：clearable支持同时与password或suffix之一同时存在
	      checkChinese和floatLength不要同时使用
-->

<template>
    <div class="l-input-wrapper" :class="wrapperClass">
        <span class="l-input-count" v-if="showWordLimit">{{ textLength }} / {{ maxlength }}</span>
        <textarea
            ref="textarea"
            @input="handleInput"
            @blur="handleBlur"
            @keyup.enter="handleEnter"
            @keyup="handleKeyup"
            @keypress="handleKeypress"
            @keydown="handleKeydown"
            @focus="handleFocus"
            @change="handleChange"
            @compositionstart="handleComposition"
            @compositionupdate="handleComposition"
            @compositionend="handleComposition"
            :value="currentValue"
            class="l-input"
            :class="inputClass"
            :style="textareaStyles"
            v-if="type === 'textarea'"
            :placeholder="placeholder"
            :disabled="disabled"
            :maxlength="maxlength"
            :readonly="readonly"
            :autofocus="autofocus"
            :rows="rows">
        </textarea>
        <template v-else>
            <div class="l-input-prepend" v-if="hasPrepend">
                <slot name="prepend"></slot>
            </div>
            <div class="l-input-block">
                <input
                    class="l-input"
                    ref="input"
                    @input="handleInput"
                    @blur="handleBlur"
                    @keyup.enter="handleEnter"
                    @keyup="handleKeyup"
                    @keypress="handleKeypress"
                    @keydown="handleKeydown"
                    @focus="handleFocus"
                    @change="handleChange"
                    @compositionstart="handleComposition"
                    @compositionupdate="handleComposition"
                    @compositionend="handleComposition"
                    :value="currentValue"
                    :type="input_type"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    :maxlength="maxlength"
                    :readonly="readonly"
                    :autofocus="autofocus"
                    :max="max"
                    :min="min"
                    :step="step"
                    :class="inputClass"
                    :autocomplete="autocomplete" />
                <span class="l-input-prefix" v-if="showPrefix" @click="handlePrefixClick">
                    <slot name="prefix"><Icon :type="prefix" /></slot>
                </span>
                <span
                    class="l-input-suffix l-input-clearable"
                    :class="{
                        'l-input-clearable-two': showSuffix || canShowEye,
                        'l-input-icon-disabled': disabled
                    }"
                    v-if="canShowClear"
                    @click="handleClear">
                    <Icon type="ios-close-circle" />
                </span>
                <span
                    class="l-input-suffix l-input-password"
                    :class="{'l-input-icon-disabled': disabled}"
                    v-if="canShowEye"
                    @click="handleEyeClick">
                    <Icon type="md-eye" :class="{'can-see': input_type === 'text'}" />
                </span>
                <span class="l-input-suffix" v-if="showSuffix" @click="handleSuffixClick">
                    <slot name="suffix"><Icon :type="suffix" /></slot>
                </span>
            </div>
            <div class="l-input-append" v-if="hasAppend">
                <slot name="append"></slot>
            </div>
        </template>
    </div>
</template>

<script>
    import { isEmpty, isCNChar, isNull } from '@/lib/check'
    import calcHeight from '@/lib/calcTextareaHeight'

    export default {
        name: 'l-input',
        props: {
            value: {},
            type: {
                type: String,
                default: 'text'
            },
            placeholder: {
                default: ''
            },
            prefix: {
                type: String
            },
            suffix: {
                type: String
            },
            clearable: {
                type: Boolean,
                default: false
            },
            showEye: {
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
            maxlength: {
                type: Number,
                default: Infinity
            },
            autofocus: {
                type: Boolean,
                default: false
            },
            autosize: {
                type: [Boolean, Object],
                default: false
            },
            rows: Number,
            max: {
                type: Number
            },
            min: {
                type: Number
            },
            step: {
                type: Number
            },
            showWordLimit: {
                type: Boolean,
                default: false
            },
            checkChinese: {
                type: Boolean,
                default: false
            },
            floatLength: {
                type: Number,
                default: -1
            },
            number: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: 'default'
            },
            isError: {
                type: Boolean,
                default: false
            },
            autocomplete: String // new-password可以禁止密码框自动填入，其它类型可用off
        },
        computed: {
            textLength () {
                let val = (this.currentValue ?? '').toString()
                let len = val.length
                if (this.checkChinese) {
                    len = this.getChineseLength(val)
                }
                return len
            },
            showPrefix () {
                return this.prefix || this.$slots.prefix
            },
            showSuffix () {
                return this.suffix || this.$slots.suffix
            },
            hasPrepend () {
                return !!this.$slots.prepend
            },
            hasAppend () {
                return !!this.$slots.append
            },
            canShowEye () {
                // suffix和eye只能同时存在一个，suffix优先级高
                return !this.showSuffix && this.showEye && this.type === 'password'
            },
            canShowClear () {
                return this.clearable && !this.disabled && !isEmpty(this.currentValue)
            },
            inputClass () {
                let arr = []
                if (this.isError) {
                    arr.push('l-input-error')
                }
                if (this.type === 'textarea') return arr
                if (this.prefix) {
                    arr.push('l-input-with-prefix')
                }
                if (this.suffix || this.canShowEye) {
                    arr.push('l-input-with-suffix')
                }
                return arr
            },
            wrapperClass () {
                let arr = []
                if (this.hasPrepend || this.hasAppend) {
                    arr.push('l-input-group')
                }
                if (this.hasPrepend) {
                    arr.push('l-input-group-with-prepend')
                }
                if (this.hasAppend) {
                    arr.push('l-input-group-with-append')
                }
                arr.push(`l-input-${this.size}`)
                return arr
            }
        },
        data () {
            return {
                input_type: this.type === 'number' ? 'text' : this.type,
                // input_type: this.type,
                currentValue: '',
                isFocus: false,
                isComposing: false, // 是否正在输入中
                textareaStyles: {}
            }
        },
        mounted () {
            this.setValue(this.value, true)
            this.$nextTick(this.resizeTextarea)
        },
        methods: {
            handlePrefixClick (event) { // 头部图标点击事件
                this.$emit('on-click-prefix', event)
            },
            handleSuffixClick (event) { // 尾部图标点击事件
                this.$emit('on-click-suffix', event)
            },
            handleEnter (event) {
                this.$emit('on-enter', event)
            },
            handleKeydown (event) {
                this.$emit('on-keydown', event)
            },
            handleKeypress(event) {
                this.$emit('on-keypress', event)
            },
            handleKeyup (event) {
                this.$emit('on-keyup', event)
            },
            handleFocus (event) {
                this.isFocus = true
                this.$emit('on-focus', event)
            },
            handleChange (event) {
                this.$emit('on-input-change', event)
            },
            handleBlur (e) {
                this.isFocus = false
                let val = e.target.value
                if (this.number) val = Number(val)
                this.setCurrentValue(val, true)
                this.$emit('on-blur', e)
            },
            handleComposition (e) {
                if (event.type === 'compositionstart') {
                    this.isComposing = true;
                }
                if (event.type === 'compositionend') {
                    this.isComposing = false;
                    this.handleInput(event);
                }
            },
            handleInput (e) {
                this.$emit('on-input', e)
                // e.isComposing支持较差，IE不支持，this.isComposing支持IE11以上
                if (e.isComposing || this.isComposing) return

                let val = e.target.value

                if (this.type === 'number' && isNaN(val)) {
                    this.$refs.input.value = this.currentValue
                    return
                }
                this.setCurrentValue(val)
            },
            resizeTextarea () {
                if (this.type !== 'textarea' || !this.autosize) return
                
                this.textareaStyles = calcHeight.calcTextareaHeight(this.$refs.textarea, this.autosize.minRows, this.autosize.maxRows)
            },
            handleEyeClick () {
                if (this.disabled) return
                const type = this.input_type
                this.input_type = type === 'password' ? 'text' : 'password'
            },
            handleClear () {
                if (this.disabled) return
                this.currentValue = ''
                this.$emit('input', '')
                this.$emit('on-change', '')
            },
            focus () {
                if (this.type === 'textarea') {
                    this.$refs.textarea.focus()
                } else {
                    this.$refs.input.focus()
                }
            },
            blur () {
                if (this.type === 'textarea') {
                    this.$refs.textarea.blur()
                } else {
                    this.$refs.input.blur()
                }
            },
            dealFloat (val, len) {
                if (isNaN(val)) return ''
                let result = Number(val)
                if (len === 0) {
                    result = parseInt(result)
                }
                else if (len > 0) {
                    result = result.toFixed(len)
                }
                return result
            },
            getChineseLength (val) {
                if (isNull(val)) return 0
                let len = 0
                for (let i of val.toString()) {
                    if (isCNChar(i)) {
                        len += 2
                    }
                    else {
                        len += 1
                    }
                }
                return len
            },
            checkChineseFunc (val) {
                if (isNull(val)) return val
                let len = 0
                let result = ''
                let max = Number(this.maxlength)
                for (let i of val.toString()) {
                    if (isCNChar(i)) {
                        len += 2
                    } else {
                        len += 1
                    }
                    result += i
                    if (len === max) {
                        return result
                    }
                    else if (len > max) {
                        return result.slice(0, -1)
                    }
                }
                return result
            },
            setCurrentValue (val, isBlur = false) {
                // 加个!isBlur是为了防止blur事件调用时直接return
                if (!isBlur && this.currentValue === val) return
                
                let result = val
                
                // 根据maxLength和中文规则处理长度
                if (this.checkChinese) {
                    result = this.checkChineseFunc(result)
                }

                if (isBlur && this.type === 'number') {
                    result = isNaN(result) ? '' : result
                }

                // 根据floatLength处理数据，为了不影响输入体验，只在isBlur为true时处理
                if (isBlur && this.type === 'number' && this.floatLength >= 0 && result !== '') {
                    result =  this.dealFloat(result, this.floatLength)
                }

                // 由于type === number的时候，e.target.value为NaN时，
                // val为空，可是输入框显示上还是有的，所以需要手动清空
                // if (result === '') this.$refs.input.value = ''

                // 如果和value相等则直接赋值就好
                if (this.value === result) return this.currentValue = result

                this.currentValue = result
                this.$emit('on-change', result)
                this.$emit('input', result)
                this.$nextTick(this.resizeTextarea)
            },
            setValue (val) {
                if (val === this.currentValue) return
                this.setCurrentValue(val, true)
            }
            // value改变时通过该函数设置currentValue
            // setValue (val) {
            //     let result = val

            //     // 根据maxLength和中文规则处理长度
            //     if (this.checkChinese) {
            //         result = this.checkChineseFunc(result)
            //     }

            //     // 根据floatLength处理数据，为了不影响输入体验，只在isFromValue为true时处理
            //     if (this.type === 'number' && this.floatLength >= 0) {
            //         result =  this.dealFloat(result, this.floatLength)
            //     }

            //     if (this.currentValue !== result) {
            //         this.$emit('on-change', result)
            //     }

            //     this.currentValue = result
            //     // 如果val和result相等则不触发input事件
            //     if (result === val) return
            //     this.$emit('input', result)
            // }
        },
        beforeDestroy () {
            calcHeight.destroy()
        },
        watch: {
            value (val) {
                this.setValue(val)
            }
        }
    }
</script>