<!--
 * @Date: 2020-03-26 09:43:59
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-27 10:17:59
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
    <div class="l-hidden">
        <div class="l-hidden-wrapper" :style="{ height: heightComp }">
            <div ref="wrapper">
                <slot></slot>
            </div>
        </div>
        <div class="l-hidden-packup" v-show="needOperate">
            <div class="l-hidden-gradient" v-show="!show"></div>
            <div class="l-hidden-btn" @click="toggleShow" v-show="showBtn">{{ btnText }}</div>
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
        },
    },
    data () {
        return {
            show: false,
            // 是否需要该功能
            needOperate: true
        }
    },
    computed: {
        heightComp () {
            if (this.show || !this.needOperate) return this.animation ? this.$refs.wrapper.offsetHeight + 'px' : 'auto'
            return this.height  + 'px'
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
            let slot = this.$slots.default[0]
            if (slot.elm.offsetHeight < this.height) return this.needOperate = false
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

<style lang="less">
@import '~@/style/theme.less';

.l-hidden{
    position: relative;
}
.l-hidden-wrapper{
    overflow: hidden;
    transition: height .6s;
}
.l-hidden-packup{
    position: relative;
}
.l-hidden-gradient{
    position: absolute;
    top: -79px;
    width: 100%;
    height: 80px;
    background-image: linear-gradient(-180deg,rgba(255,255,255,.2),#fff);
}
.l-hidden-btn{
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: @blue;
    background: white;
    cursor: pointer;
}
</style>
