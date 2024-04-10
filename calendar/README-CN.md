# calendar

[English](./README.md 'English')

![npm](https://img.shields.io/npm/v/@muyi086/calendar) ![npm bundle size](https://img.shields.io/bundlephobia/min/@muyi086/calendar) ![npm](https://img.shields.io/npm/dt/@muyi086/calendar) ![GitHub](https://img.shields.io/github/license/MuYi086/npm_package)

## 安装
```SHELL
npm install wecanlendar
# common JS
const calendar = require('@muyi086/calendar')
# es6
import calendar from '@muyi086/calendar'
```

## 使用
```JS
// 初始化后所有信息存储在@muyi086/calendar对象中
console.log(calendar)
```

## 属性说明
1. `currentMonthDay` : 当前月的公历信息
1. `currentMonthFarmDay` : 当前月的农历信息

## function

函数名|参数|默认|是否必需|描述|
--|--|--|--|--|
search|时间字符串|字符串|必需|自定义查询需输入一个字符串 字符串格式 '2019.12.12'或'2019-12-12'或'2019/12/12'|
