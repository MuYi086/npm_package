# cal

[English](./README.md 'English')

![npm](https://img.shields.io/npm/v/@muyi086/cal) ![npm bundle size](https://img.shields.io/bundlephobia/min/@muyi086/cal) ![npm](https://img.shields.io/npm/dt/@muyi086/cal) ![GitHub](https://img.shields.io/github/license/MuYi086/npm_package)

## 安装
```SHELL
npm install @muyi086/cal
# common JS
const cal = require('@muyi086/cal')
# es6
import cal from '@muyi086/cal'
```

## 使用
```JS
const str = '-(-5+(-2*33//3****4)-2)+((5*6)/2+2)-23*4/2+43'
const value = cal.dealBracket(str)
```

## 函数

函数名|参数|默认|是否必需|描述|
--|--|--|--|--|
dealBracket|字符串|字符串|必需|一个包含表达式的字符串|
