<!--
 * @Date: 2020-02-28 13:20:28
 * @Author: junfeng.liu
 * @LastEditTime: 2020-07-06 10:11:31
 * @LastEditors: junfeng.liu
 * @Description: 全浏览器展示图片

    porps
        value:          是否显示
        src:            图片地址
        alt:            img标签的alt属性
        imgStyle:       img样式
        transfer:       是否放到body下
        maskClose:      点击组件是否关闭
        mode:           图片大小处理模式，zoom: 对图片缩放，保持整个图片在屏幕内;auto: 对图片不处理，对于超出屏幕大小的图片进行滚动

 -->

<template>
    <div :class="className" v-show="visible" @click="handleMaskClick" v-transfer-dom :data-transfer="transfer">
        <span class="l-view-base-line-middle"></span>
        <img :style="imgStyle" :src="src" :alt="alt" />
        <Icon class="l-show-img-close" type="md-close-circle" @click="close" />
    </div>
</template>

<script>
import transferDom from '@/directives/transfer-dom.js'

export default {
    name: 'l-show-img',
    directives: { 'transfer-dom': transferDom },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        src: {
            type: String,
            default: ''
        },
        alt: {
            type: String,
            default: '图片'
        },
        imgStyle: {
            type: [String, Array, Object]
        },
        transfer: {
            type: Boolean,
            default: false
        },
        maskClose: {
            type: Boolean,
            default: true
        },
        mode: {
            type: String,
            default: 'zoom'
        }
    },
    data () {
        return {
            visible: this.value
        }
    },
    computed: {
        className () {
            const prefixCls = 'l-show-img'
            return {
                [prefixCls]: true,
                [`${prefixCls}-auto`]: this.mode === 'auto'
            }
        }
    },
    mounted () {},
    methods: {
        close () {
            this.visible = false
            this.$emit('input', false)
            this.$emit('close')
        },
        handleMaskClick () {
            if (!this.maskClose) return
            this.close()
        }
    },
    watch: {
        value (val) {
            this.visible = val
        }
    }
}
</script>

