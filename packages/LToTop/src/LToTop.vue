<!--
 * @Date: 2020-03-26 09:43:59
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-27 10:46:31
 * @LastEditors: junfeng.liu
 * @Description: 回到顶部

    props
        wrapper:            滚动的容器，支持document和选择器，默认一个指定的选择器
        offset:             滚动多少后显示
        step:               滚动速度

 -->
<template>
    <transition name="fade">
        <div class="l-to-top" v-show="show" @click="backToTop">
            <Icon type="ios-arrow-up" />
        </div>
    </transition>
</template>

<script>
export default {
    name: 'l-to-top',
    props: {
        // 滚动的容器，默认body
        wrapper: {
            type: [Document, String],
            default: '.content-wrapper.ivu-layout-content'
        },
        // 滚动多少后显示
        offset: {
            type: Number,
            default: 20
        },
        step: {
            type: Number,
            default: 30
        }
    },
    data () {
        return {
            scrolling: false,
            show: false,
            dom: {}
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        init () {
            this.removeListener()
            const defDom = document.body
            if (!this.wrapper) {
                this.dom = defDom
            }
            else if (typeof this.wrapper === 'string') {
                this.dom = document.querySelector(this.wrapper)
            }
            else if (this.wrapper instanceof HTMLElement) {
                this.dom = this.wrapper
            }
            else {
                this.dom = defDom
            }
            if (!this.dom) return console.error('没有获取dom，请检查')
            this.onScroll({target: this.dom})
            this.addListener()
        },
        // 根据滚动距离判断是否显示
        onScroll (e) {
            if (e.target.scrollTop >= this.offset) this.show = true
            else this.show = false
        },
        addListener () {
            this.dom.addEventListener('scroll', this.onScroll)
        },
        removeListener () {
            if (this.dom instanceof HTMLElement) {
                this.dom.removeEventListener('scroll', this.onScroll)
            }
        },
        backToTop () {
            if (this.scrolling) return
            if (this.dom instanceof HTMLElement) {
                this.animation()
            }
        },
        // 由于没有css动画，所以用js做动画
        animation () {
            setTimeout(() => {
                let top = this.dom.scrollTop
                this.dom.scrollTop = top - this.step
                if (this.dom.scrollTop <= 0) return this.scrolling = false
                this.animation()
            }, 1000 / 60)
        }
    },
    beforeDestroy () {
        this.removeListener()
    },
    watch: {
        wrapper (val) {
            this.init()
        }
    }
}
</script>

<style lang="less">
.l-to-top{
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 50px;
    height: 50px;
    line-height: 50px;
    border-radius: 50%;
    background: fade(black, 60%);
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    color: white;
}
</style>
