<!--
 * @Date: 2020-03-26 09:43:59
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-28 11:31:04
 * @LastEditors: junfeng.liu
 * @Description: 折叠隐藏组件，用于内容过多时将内容先隐藏，用户通过按钮点击展开

    props
        height:         折叠时内容块高度，默认200
        showText:       点击展示时按钮的文本
        hideText:       点击隐藏时按钮的文本
        needHide:       是否需要隐藏，如果为false则没有收起按钮
        animation:      是否需要动画

    slot
        default:        需要展示的内容

 -->
<template>
    <div class="l-fold">
        <div class="l-fold-wrapper" :style="{ height: heightComp }">
            <div ref="wrapper">
                <slot></slot>
            </div>
        </div>
        <div class="l-fold-operate" v-show="needOperate">
            <div class="l-fold-gradient" v-show="!show"></div>
            <div class="l-fold-btn" @click="toggleShow" v-show="showBtn">{{ btnText }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'l-fold',
    props: {
        height: {
            type: Number,
            default: 200
        },
        showText: {
            type: String,
            default: '点击展开更多'
        },
        hideText: {
            type: String,
            default: '点击收起'
        },
        needHide: {
            type: Boolean,
            default: true
        },
        animation: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            show: false,
            // 是否需要该功能
            needOperate: true,
            wrapperHeight: 0
        }
    },
    computed: {
        heightComp () {
            // 高度设为auto不会触发transition
            if (this.show || !this.needOperate) return this.animation ? this.wrapperHeight + 'px' : 'auto'
            return this.height + 'px'
        },
        showBtn () {
            return !(this.needHide === false && this.show === true)
        },
        btnText () {
            return this.show ? this.hideText : this.showText
        }
    },
    updated () {
        this.comp()
    },
    mounted () {
        this.comp()
    },
    methods: {
        comp () {
            this.wrapperHeight = this.$refs.wrapper.offsetHeight
            // const slot = this.$slots.default[0]
            if (this.wrapperHeight < this.height) {
                this.needOperate = false
                return
            }
            this.needOperate = true
        },
        toggleShow () {
            this.show = !this.show
        },
        hidden () {
            this.show = false
        }
    }
}
</script>
