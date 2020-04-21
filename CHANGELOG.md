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

