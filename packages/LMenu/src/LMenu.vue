<!--
 * @Date: 2020-05-08 10:44:30
 * @Author: junfeng.liu
 * @LastEditTime: 2020-05-12 18:09:13
 * @LastEditors: junfeng.liu
 * @Description: 基于iview的menu的扩展。
    使用的时候注意要组件间嵌套，如果组件的内容增加了层级可能会导致样式错乱;
    FIXME: 当mode为horizontal是多级嵌套会错乱，主要是iview的menu不支持

    props
        value               当前选中的item的name
        mode                菜单类型，可选值为 horizontal（水平） 和 vertical（垂直）
        theme               主题，可选值为 light、dark、primary，其中 primary 只适用于 mode="horizontal"
        openNames           展开的 Submenu 的 name 集合
        accordion           是否开启手风琴模式，开启后每次至多展开一个子菜单
        width               正常情况是菜单的宽度
        collapsedWidth      收起时菜单的宽度
        collapsed           是否收起

    events
        on-open-change      当 展开/收起 子菜单时触发
        on-select           选择菜单（LMenuItem）时触发

    methods
        updateOpened        手动更新展开的子目录，注意要在 $nextTick 里调用
        updateActiveName    手动更新当前选择项，注意要在 $nextTick 里调用

 -->
<template>
    <div :class="className" :style="menuStyle">
        <div class="l-menu-content">
            <Menu
                ref="menu"
                :mode="mode"
                :theme="theme"
                :active-name="currentActiveName"
                :open-names="openNames"
                :accordion="accordion"
                :width="'auto'"
                @on-open-change="handleOpenChange">
                <slot></slot>
            </Menu>
        </div>
        <slot name="other"></slot>
        <div :class="triggerClass" @click="toggleCollapsed" v-if="!hideTrigger">
            <Icon type="ios-arrow-back" />
        </div>
    </div>
</template>

<script>
const prefixCls = 'l-menu'
const triggerPrefixClas = `${prefixCls}-trigger`

export default {
    name: 'l-menu',
    provide () {
        return { menu: this }
    },
    props: {
        value: [String, Number],
        transfer: Boolean,
        mode: {
            type: String,
            default: 'vertical'
        },
        theme: String,
        // activeName: [String, Number],
        openNames: Array,
        accordion: Boolean,
        width: {
            type: Number,
            default: 256
        },
        collapsedWidth: {
            type: Number,
            default: 64
        },
        collapsed: {
            type: Boolean,
            default: false
        },
        hideTrigger: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            currentActiveName: this.value,
            insideCollapsed: this.collapsed
        }
    },
    computed: {
        menuWidth () {
            return (this.insideCollapsed ? this.collapsedWidth : this.width) + 'px'
        },
        menuStyle () {
            return {
                width: this.menuWidth
            }
        },
        iMenu () {
            return this.$refs?.menu
        },
        className () {
            return {
                [`${prefixCls}`]: true,
                [`${prefixCls}-dark`]: this.theme === 'dark',
                [`${prefixCls}-hide-trigger`]: this.hideTrigger
            }
        },
        triggerClass () {
            return {
                [`${triggerPrefixClas}`]: true,
                [`${triggerPrefixClas}-collapsed`]: this.insideCollapsed,
                [`${triggerPrefixClas}-dark`]: this.theme === 'dark'
            }
        }
    },
    mounted () {
        this.$on('on-menu-item-select', (name) => {
            this.currentActiveName = name
            this.$emit('input', name)
            this.$emit('on-select', name)
        })
    },
    methods: {
        handleOpenChange (args) {
            // 只有collapsed为false有用
            this.$emit('on-open-change', args)
        },
        updateOpened () {
            this.iMenu.updateOpened()
        },
        updateActiveName () {
            this.iMenu.updateActiveName()
        },
        toggleCollapsed () {
            this.insideCollapsed = !this.insideCollapsed
            this.$emit('update:collapsed', this.insideCollapsed)
            this.updateMenu()
        },
        updateMenu () {
            if (this.insideCollapsed) return
            this.$nextTick(() => {
                this.updateOpened()
                this.updateActiveName()
            })
        }
    },
    watch: {
        value (val) {
            if (val === this.currentActiveName) return
            this.currentActiveName = val
        },
        collapsed (val) {
            if (val === this.insideCollapsed) return
            this.insideCollapsed = val
            this.updateMenu()
        }
    }
}
</script>
