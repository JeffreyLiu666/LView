<!--
 * @Date: 2020-05-11 17:54:16
 * @Author: junfeng.liu
 * @LastEditTime: 2020-05-12 18:28:00
 * @LastEditors: junfeng.liu
 * @Description: 可通过传入路由配置实现菜单生成
 -->
<template>
    <LMenu
        ref="menu"
        :class="className"
        :value="currentActiveName"
        :collapsed="collapsed"
        :theme="theme"
        :mode="mode"
        :open-names="openNames"
        :accordion="accordion"
        :width="width"
        :collapsedWidth="collapsedWidth"
        :hide-trigger="hideTrigger"
        :transfer="transfer">
        <LMenuConfigItem v-for="item in config" :key="item.name" :config="item"></LMenuConfigItem>
        <template v-slot:other>
            <div :class="triggerClass" @click="trigger">
                <Icon type="md-arrow-dropleft" />
            </div>
        </template>
    </LMenu>
</template>

<script>
import LMenuConfigItem from './LMenuConfigItem'
import { getScrollBarWidth } from '@/lib/util.js'

const prefixCls = 'l-menu-config'
const triggerPrefixCls = `${prefixCls}-trigger`

export default {
    name: 'l-menu-config',
    components: { LMenuConfigItem },
    props: {
        value: [String, Number],
        config: {
            type: Array,
            default () {
                return []
            }
        },
        returnItem: {
            type: Boolean,
            default: true
        },
        theme: {
            type: String,
            default: 'dark'
        },
        mode: {
            type: String,
            default: 'vertical'
        },
        transfer: {
            type: Boolean,
            default: true
        },
        hideTrigger: {
            type: Boolean,
            default: true
        },
        width: Number,
        collapsedWidth: Number,
        openNames: Array,
        accordion: Boolean
    },
    data () {
        return {
            currentActiveName: this.value,
            collapsed: false,
            scrollBarWidth: 0
        }
    },
    computed: {
        className () {
            return {
                [`${prefixCls}`]: true
            }
        },
        triggerClass () {
            return {
                [`${triggerPrefixCls}`]: true,
                [`${triggerPrefixCls}-collapsed`]: this.collapsed
            }
        },
        styleObj () {
            return {
                marginRight: -this.scrollBarWidth + 'px'
            }
        }
    },
    created () {
        this.scrollBarWidth = getScrollBarWidth()
    },
    mounted () {
        this.$on('on-menu-item-select', (item) => {
            this.currentActiveName = item.name
            let result = this.returnItem ? item : item.name
            this.$emit('on-select', result)
        })
        if (!this?.$refs?.menu?.$el?.children) return
        for (let k in this.styleObj) {
            this.$refs.menu.$el.children[0].style[k] = this.styleObj[k]
        }
    },
    methods: {
        trigger () {
            this.collapsed = !this.collapsed
        }
    },
    watch: {
        value (val) {
            if (val === this.currentActiveName) return
            this.currentActiveName = val
        }
    }
}
</script>
