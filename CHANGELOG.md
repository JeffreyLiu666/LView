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
