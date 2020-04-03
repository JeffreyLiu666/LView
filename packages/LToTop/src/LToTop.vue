<!--
 * @Date: 2020-03-26 09:43:59
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-03 12:43:10
 * @LastEditors: junfeng.liu
 * @Description: 回到顶部

    props
        wrapper:            滚动的容器，支持document和选择器，默认一个指定的选择器
        offset:             滚动多少后显示
        step:               每帧滚动距离

 -->
<template>
    <transition name="fade">
        <div class="l-to-top" v-show="show" @click="backToTop">
            <Icon type="ios-arrow-up" />
        </div>
    </transition>
</template>

<script>
import { isNull } from '@/lib/check.js'
import { throttle } from '@/lib/util.js'

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
            dom: null,
            el: null
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        init () {
            this.removeListener()
            // 默认整个文档滚动
            const defDom = document
            if (!this.wrapper) {
                this.dom = defDom
                this.el = document.documentElement
            }
            else if (typeof this.wrapper === 'string') {
                this.dom = document.querySelector(this.wrapper)
                this.el = this.dom
            }
            else if (this.wrapper instanceof HTMLElement) {
                this.dom = this.wrapper
                this.el = this.dom
            }
            else {
                this.dom = defDom
                this.el = document.documentElement
            }
            if (!this.dom) return console.error('没有获取dom，请检查')
            this.onScroll()
            this.throttleScroll = throttle(this.onScroll, 300)
            this.addListener()
        },
        // 根据滚动距离判断是否显示
        onScroll () {
            let scrollTop = this.el.scrollTop
            this.show = scrollTop >= this.offset
        },
        addListener () {
            if (!this.dom) return
            this.dom.addEventListener('scroll', this.throttleScroll)
        },
        removeListener () {
            if (!this.dom) return
            this.dom.removeEventListener('scroll', this.throttleScroll)
        },
        backToTop () {
            if (this.scrolling) return
            if (this.el instanceof HTMLElement) {
                this.animation()
            }
        },
        // 由于没有css动画，所以用js做动画
        animation () {
            const rAF = window.requestAnimationFrame || (func => setTimeout(func, 1000 / 60));
            const animationFunc = () => {
                let top = this.el.scrollTop
                this.el.scrollTop = top - this.step
                if (this.el.scrollTop <= 0) {
                    this.el.scrollTop = 0
                    return this.scrolling = false
                }
                rAF(animationFunc)
            }
            rAF(animationFunc)
        }
    },
    beforeDestroy () {
        this.removeListener()
    },
    watch: {
        wrapper (val) {
            this.removeListener()
            this.init()
        }
    }
}
</script>
