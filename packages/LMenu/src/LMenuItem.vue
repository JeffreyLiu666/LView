<!--
 * @Date: 2020-05-08 17:40:42
 * @Author: junfeng.liu
 * @LastEditTime: 2020-05-12 18:21:59
 * @LastEditors: junfeng.liu
 * @Description: des

    props
        name            菜单项的唯一标识，必填
        title           菜单项文本
        icon            菜单项图标
        to:             跳转的链接，支持 vue-router 对象
        replace:        路由跳转时，开启 replace 将不会向 history 添加新记录
        target:         相当于 a 链接的 target 属性
        append:         同 vue-router append

    slots
        default         优先级高于title
 -->

<script>
import menuChildMixin from './mixins/menuChildMixin'
import emitter from '@/mixins/emitter.js'
import mixinsLink from '@/mixins/link.js'

const menuPrefixCls = 'l-menu'
const prefixCls = 'l-menu-item'

export default {
    name: 'l-menu-item',
    mixins: [menuChildMixin, emitter, mixinsLink],
    props: {
        disabled: Boolean
    },
    data () {
        return {
        }
    },
    computed: {
        isHrefPattern () {
            return !!this.to
        },
        tagName () {
            if (!this.collapsed) return 'MenuItem'
            if (this.isHrefPattern) return 'a'
            return this.hideTitle ? 'div' : 'DropdownItem'
        },
        tagProps () {
            if (this.isHrefPattern) return {}

            const { linkUrl, target } = this
            return { href: linkUrl, target }
        },
        menuItemClass () {
            const isLink = this.tagName === 'a'

            return {
                [`${prefixCls}`]: true,
                [`${prefixCls}-link`]: isLink,
                [`${prefixCls}-link-collapsed`]: isLink && this.collapsed && !this.hideTitle,
                [`${prefixCls}-link-selected`]: isLink && this.selected,
                [`${menuPrefixCls}-title-collapsed`]: this.hideTitle
            }
        },
        selected () {
            return this.menu.currentActiveName === this.name
        }
    },
    mounted () {},
    methods: {
        handleItemClick (event, new_window = false) {
            if (this.disabled) return

            if (!new_window && this.target !== '_blank') {
                this.dispatch('l-menu', 'on-menu-item-select', this.name)
            }
            this.handleCheckClick(event, new_window)
        }
    },
    render () {
        const {
            menu,
            name,
            title,
            icon,
            tagName,
            tagProps,
            menuItemClass,
            hideTitle,
            disabled,
            selected,
            $slots
        } = this

        const linkProps = {
            to: this.to,
            replace: this.replace,
            target: this.target,
            append: this.append
        }

        // 得采用h函数的格式
        let props = {
            [(tagName === 'MenuItem' || tagName === 'DropdownItem') ? 'nativeOn' : 'on']: {
                click: this.handleItemClick
            },
            props: Object.assign({ selected }, linkProps),
            attrs: Object.assign({}, tagProps)
        }

        const content = $slots.default || title

        const baseContent = (
            <tagName class={ menuItemClass } name={ name } disabled={ disabled } { ...props }>
                { icon ? (<Icon type={ icon } />) : $slots.icon }
                <span>
                    { hideTitle ? '' : content }
                </span>
            </tagName>
        )

        if (!hideTitle) return baseContent
        return (
            <Tooltip placement="right" transfer={ menu.transfer }>
                { baseContent }
                <span slot="content">{ content }</span>
            </Tooltip>
        )
    }
}
</script>
