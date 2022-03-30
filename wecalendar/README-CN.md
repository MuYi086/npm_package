## wecalendar

[English](./README.md 'English')

![npm](https://img.shields.io/npm/v/wecalendar) ![npm bundle size](https://img.shields.io/bundlephobia/min/wecalendar) ![npm](https://img.shields.io/npm/dt/wecalendar) ![GitHub](https://img.shields.io/github/license/ougege/npm_package)

#### 安装
```SHELL
npm install wecanlendar
# common JS
const wecalendar = require('wecalendar')
# es6
import wecalendar from 'wecalendar'
```

#### 使用
```JS
// 初始化后所有信息存储在wecalendar对象中
console.log(wecalendar)
```

#### 属性说明
1. `currentMonthDay` : 当前月的公历信息
1. `currentMonthFarmDay` : 当前月的农历信息

#### function

函数名|参数|默认|是否必需|描述|
--|--|--|--|--|
search|时间字符串|字符串|必需|自定义查询需输入一个字符串 字符串格式 '2019.12.12'或'2019-12-12'或'2019/12/12'|
