/*
 * @Date: 2020-03-26 09:43:59
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-27 10:27:30
 * @LastEditors: junfeng.liu
 * @Description: 渲染组件，通过render函数渲染
 *
 *  props
 *      render:         渲染的函数，传入h方法和props.params
 *      params:         xx
 *
 */
import { isFunction } from '@/utils/check'

export default {
    name: 'l-render',
    functional: true,
    props: {
        render: {
            type: Function
        },
        params: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    render: (h, ctx) => {
        if (!isFunction(ctx.props.render)) return ''
        return ctx.props.render(h, ctx.props.params)
    }
}
