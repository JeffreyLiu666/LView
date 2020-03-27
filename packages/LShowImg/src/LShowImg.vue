<!--
 * @Date: 2020-02-28 13:20:28
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-27 10:37:47
 * @LastEditors: junfeng.liu
 * @Description: 全浏览器展示图片

    porps
        value:          是否显示
        src:            图片地址
        alt:            img标签的alt属性
        imgStyle:       img样式
        transfer:       是否放到body下

 -->

<template>
    <div class="l-show-img" v-show="value" @click="close" v-transfer-dom :data-transfer="transfer">
        <span class="base-line"></span>
        <img :style="imgStyle" :src="src" :alt="alt" />
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
            type: String
        },
        transfer: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {

        }
    },
    mounted () {},
    methods: {
        close () {
            this.$emit('input', false)
            this.$emit('close')
        }
    }
}
</script>

<style lang="less">
.l-show-img{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9990;
    text-align: center;
    background: fade(black, 50%);
    .base-line{
        height: 100%;
        vertical-align: middle;
        display: inline-block;
    }
    img{
        max-width: 100%;
        max-height: 100%;
        vertical-align: middle;
    }
}
</style>

