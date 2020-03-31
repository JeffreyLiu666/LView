# LView
基于iview的通用组件

## 当前版本
**1.0.0**

## 安装
```
npm i view-design LView
```

## 快速开始
```
import Vue from 'vue'
import iView from 'view-design'
import lView from 'LView'
import 'LView/css/index.css'

Vue.use(iView)
Vue.use(lView)
```

## 按需引入
通过[babel-plugin-component](https://github.com/ElementUI/babel-plugin-component)插件实现按需引入  
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
