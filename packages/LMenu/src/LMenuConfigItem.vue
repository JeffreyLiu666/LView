<!--
 * @Date: 2020-05-12 11:33:41
 * @Author: junfeng.liu
 * @LastEditTime: 2020-05-12 16:57:01
 * @LastEditors: junfeng.liu
 * @Description: des
 -->
<template>
    <LSubMenu
        :name="config.name"
        :icon="icon"
        :title="title"
        v-if="showChildren">
        <template v-slot:icon v-if="customIcon">
            <Icon :custom="`iconfont iconfont-${ customIcon }`" size="16"></Icon>
        </template>
        <template v-slot:title v-if="config.render">
            <LRender :render="config.render" :params="config"></LRender>
        </template>
        <l-menu-config-item v-for="item in config.children" :key="item.name" :config="item"></l-menu-config-item>
    </LSubMenu>
    <LMenuItem
        :name="config.name"
        :icon="icon"
        :title="title"
        :disabled="config.disabled"
        @click.native="handleClick"
        v-else>
        <template v-slot:icon v-if="customIcon">
            <Icon :custom="`iconfont iconfont-${ customIcon }`" size="16"></Icon>
        </template>
        <LRender :render="config.render" :params="config" v-if="config.render"></LRender>
    </LMenuItem>
</template>

<script>
import { deepCopy } from '@/utils/util.js'
import { isArray } from '@/utils/check.js'
import emitter from '@/mixins/emitter.js'

export default {
    name: 'l-menu-config-item',
    mixins: [emitter],
    props: {
        config: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
        }
    },
    computed: {
        title () {
            const { config } = this
            return config?.meta?.title || ''
        },
        icon () {
            const { config } = this
            return config?.meta?.icon || ''
        },
        customIcon () {
            const { config } = this
            return config?.meta?.customIcon || ''
        },
        showChildren () {
            const { config } = this
            return isArray(config.children) && config.children.length >= 1 && !config?.meta?.hiddenSubMenu
        }
    },
    mounted () {},
    methods: {
        handleClick () {
            this.dispatch('l-menu-config', 'on-menu-item-select', deepCopy(this.config))
        }
    }
}
</script>
