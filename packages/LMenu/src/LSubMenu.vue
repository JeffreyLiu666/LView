<!--
 * @Date: 2020-05-08 17:39:47
 * @Author: junfeng.liu
 * @LastEditTime: 2020-05-12 16:59:47
 * @LastEditors: junfeng.liu
 * @Description: des

    props
        name            子菜单的唯一标识，必填
        title           子菜单文本
        icon            子菜单图标

    slots
        title           优先级高于title
 -->
<template>
    <Dropdown class="l-sub-menu l-sub-menu-dropdown" placement="right-start" v-if="collapsed" :transfer="transfer">
        <DropdownItem :class="dropdownItemClass">
            <slot name="icon">
                <Icon :type="icon" v-if="icon" />
            </slot>
            <span v-if="!hideTitle">
                <slot name="title">{{ title }}</slot>
            </span>
        </DropdownItem>
        <DropdownMenu slot="list">
            <slot></slot>
        </DropdownMenu>
    </Dropdown>
    <Submenu class="l-sub-menu l-sub-menu-submenu" :name="name" v-else>
        <template v-slot:title>
            <slot name="icon">
                <Icon :type="icon" v-if="icon" />
            </slot>
            <slot name="title">{{ title }}</slot>
        </template>
        <slot></slot>
    </Submenu>
</template>

<script>
import menuChildMixin from './mixins/menuChildMixin'

const menuPrefixCls = 'l-menu'
const prefixCls = 'l-sub-menu'
const dPrefixClas = `${prefixCls}-dropdown`

export default {
    name: 'l-sub-menu',
    mixins: [menuChildMixin],
    props: {
    },
    data () {
        return {

        }
    },
    computed: {
        dropdownItemClass () {
            return {
                [`${dPrefixClas}-title`]: true,
                [`${menuPrefixCls}-title-collapsed`]: this.hideTitle
            }
        },
        transfer () {
            return this.menu.transfer
        }
    },
    mounted () {
    },
    methods: {
    }
}
</script>
