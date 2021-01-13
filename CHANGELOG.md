# 更新日志

## 1.0.1

*2020-03-27*

#### 新特性

- LCell
    - 列表项组件

- LDateRange
    - 时间范围选择器

- LFold
    - 内容折叠组件

- LForm
    - 配置化表单组件

- LFormGroup
    - 表单组件

- LFormItem
    - 表单子组件

- LNumberRange
    - 数值范围组件

- LRender
    - 渲染函数组件

- LShowImg
    - 全屏展示图片组件

- LTable
    - 表格组件

***
## 1.1.0

*2020-03-28*

#### 新特性

- LNumberInput
    - 数字输入框

***
## 1.2.1

*2020-03-30*

#### 新特性

- 样式
    - less文件的加入包里
    - css按组件拆开

#### BUG FIX

- LFold
    - 解决有时候高度显示不正确

***
## 1.2.2

*2020-03-31*

#### 新特性

- 按需引入
    - 支持通过[babel-plugin-component](https://github.com/ElementUI/babel-plugin-component)插件实现按需引入  
    ```
    修改babel.config.js

    plugins: [
        [
            'component',
            {
                libraryName: 'l-view-vue',
                styleLibraryName: 'style',
                camel2Dash: false
            }  
        ]
    ]
    ```

***
## 1.3.1

*2020-04-10*

#### 新特性

- LInput
    - 新增输入框组件，支持多种功能

- LNumberInput
    - input换成LInput
    - 在blur事件中做max和min判断
    - 在超过max或min时会禁用相关按钮
    - 新增floatLength属性
    - 调整内部逻辑

- LNumberRange
    - input换成LInput
    - 新增placeholderLeft和placeholderRight
    - min和max的判断在blur中实现
    - 新增floatLength属性
    - 调整内部逻辑

- LDateRange
    - 新增placeholder

- LShowImg
    - 新增maskClose
    - 新增关闭图标

- LToTop
    - 支持通过slot自定义图标
    - 调整内部逻辑

- LFormEnca
    - 去掉iView的Input，换成LInput

- LTable
    - 支持LNumberInput

#### 非兼容性更新

- LNumberInput
    - change事件改为on-change

- LFormEnca
    - 由于input更换，部分props不同

***
## 1.3.2

*2020-04-13*

#### 新特性

- LInput
    - 不处理空值，包括空字符串，null，undefined

#### BUG FIX

- LInput
    - 解决在error的时候边框颜色不正确

***
## 1.4.0

*2020-04-13*

#### 新特性

- LButton
    - 新增LButton组件，在iview的button基础上加了防抖和节流功能

- LInput
    - 新增搜索框功能，包括search、searchButton两个props和on-search事件
    - 新增on-clear事件，点击清除按钮时触发

- LFormEnca
    - 将Button换为LButton
    - 支持LInput的搜索框功能

***
## 1.4.1

*2020-04-21*

#### 新特性

- LFormEnca
    - 新增noCheck参数，用于控制是否校验
    - 完善LNumberRange的props

***
## 1.5.0

*2020-05-13*

#### 新特性

- LButton
    - 不再基于iview的button，重写了
    - 新增了两个酷炫的type：cool-hover和cool-hover-dark

- LButtonGroup
    - 新增按钮组组件，配合LButton使用

- LLoading
    - 新增Loading组件

- LMenu
    - 新增LMenu组件及配套的LMenuItem和LSubMenu

- LMenuConfig
    - 新增LMenuConfig组件，可配置化生成Menu

- LFormEnca
    - 完善对LButton的props支持
    - 新增buttonGroup类型

#### BUG FIX

- directive - transfer
    - 解决在组件销毁时，el还存在

***
## 1.5.1

*2020-05-13*

#### 新特性

- LMenu
    - 监听value和openNames的变化自动调用updateActiveName和updateOpened

- LMenuConfig
    - 添加updateOpened和updateActiveName两个方法

#### BUG FIX

- LButton
    - 解决点击按钮时无故跳转

***
## 1.6.1

*2020-06-12*

#### 新特性

- LUpload
    - 新增LUpload组件，主要是上传文件

- LTable
    - 扩展对LNumberInput的属性的支持

- vue-ssr
    - 兼容在vue-ssr中的使用

#### BUG FIX

- LFormEnca
    - 解决报this.formatDate错误

***
## 1.6.2

*2020-06-29*

#### 新特性

- LFormEnca
    - 新增对LUpload组件的支持

***
## 1.6.3

*2020-06-30*

#### BUG FIX

- LInput
    - 解决部分时机autosize的自适应无效

***
## 1.6.4

*2020-07-01*

#### BUG FIX

- LInput
    - 解决在ssr模式中textarea会报document不存在

***
## 1.6.7

*2020-07-09*

#### 新特性

- LShowImg
    - 新增mode属性，有zoom(缩放)和auto(超出滚动)两种

- LTable
    - buttons和links新增show属性，支持函数

#### 优化

- 按需引入
    - 将公共js提取出来，减小每个组件的体积

***
## 1.6.8

*2020-09-17*

#### 非兼容性更新

- LForm
    - 调整show属性的策略，以前是show加judgeConfig的使用方式，现在是（boolean型或方法）加计算属性

***
## 1.6.9

*2020-09-18*

#### 新特性

- LForm
    - 新增config属性searchType和searchCD，用于控制内部请求时是节流还是防抖的方式，默认防抖

#### BUG FIX

- LForm
    - 解决在使用select内部请求且config.filterable为false时，每次选择后都重新请求的bug

***
## 1.6.10

*2020-10-16*

#### 新特性

- LForm
    - 将config的属性透传给子组件
    - 新增类型‘title’，用于类似分割形式的标题

***
## 1.6.11

*2020-10-29*

#### 新特性

- LForm
    - 新增labelRender，实现灵活的label

#### 非兼容性更新

- LUpload
    - 调整checkReqFn策略，除了判断请求返回状态外，还得返回指定格式的data数据

***
## 1.6.12

*2020-11-02*

#### 新特性

- LInput
    - 优化floatLength，使其在输入时也能对位数控制，且不再四舍五入

#### BUG FIX

- LUpload
    - 解决首次加载时不处理value的值
    - 解决将value置空时，内部list未置空
## 1.6.13

*2020-11-02*

#### 新特性

- LUpload
    - 新增before-remove，可以拦截删除动作

#### BUG FIX

- LUpload
    - 在设置max-length且开启多选时，不会再超出max-length

- LButton
    - 解决未设置icon的时候，还是有占位

## 1.6.14

*2020-11-30*

#### 新特性

- LForm
    - 新增两个插槽

## 1.6.15

*2020-12-02*

#### 新特性

- LInput
    - 现在输入的时候，输入单独一个负号不会直接清空。注意：不会赋值，只存在输入框里，且失焦的时候回清空

#### BUG FIX

- LForm
    - 解决部分组件传入初始值被置空

## 1.6.16

*2020-12-04*

#### BUG FIX

- LInput
    - 解决使用prefix的插槽时，输入框没有缩进

## 1.6.18

*2021-01-13*

#### 新特性

- install
    - 实现对权限判断函数注册

- LTable
    - links和buttons新增permission属性，可用于权限校验

- LFormEnca
    - 新增request参数，可代替全局请求函数

- LForm
    - 对LFormEnca的request做了支持

#### BUG FIX

- install
    - 解决请求函数注册时层级错误，之前版本可直接`Vue.prototype.__lform_ajax__ = { request: reqFunc }`

