# verify-code

[English](./README.md 'English')

![npm](https://img.shields.io/npm/v/@muyi086/verify-code) ![npm bundle size](https://img.shields.io/bundlephobia/min/@muyi086/verify-code) ![npm](https://img.shields.io/npm/dt/@muyi086/verify-code) ![GitHub](https://img.shields.io/github/license/MuYi086/npm_package)

## 安装
```SHELL
npm install @muyi086/verify-code
# common JS
const verifyCode = require('@muyi086/verify-code')
# es6
import verifyCode from '@muyi086/verify-code'
```

## 使用
```JS
// 页面创建一个元素
<canvas id="canvas"></canvas>
// 导入和使用
verifyCode.random(3, 5)
// 完整方法
random(type, len, slash = true, point = true)
```
## 函数

函数名|参数|默认|是否必需|描述|
--|--|--|--|--|
random|type|数字|必需|1: 纯数字;2: 纯字母;3: 数字和字母|
random|len|数字|必需|生成的验证码长度|
random|slash|布尔 true|非必需|是否显示斜线|
random|point|布尔 true|非必需|是否显示点|