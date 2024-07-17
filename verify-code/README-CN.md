# verify-code

[English](./README.md 'English')

![npm](https://img.shields.io/npm/v/@muyi086/verify-code) ![npm bundle size](https://img.shields.io/bundlephobia/min/@muyi086/verify-code) ![npm](https://img.shields.io/npm/dt/@muyi086/verify-code) ![GitHub](https://img.shields.io/github/license/MuYi086/npm_package)

## 安装
```SHELL
npm install @muyi086/verify-code
# common JS
const { verifyCode } = require('@muyi086/verify-code')
# es6
import { verifyCode } from '@muyi086/verify-code'
```

## 使用
```JS
// 页面创建一个元素
<canvas id="canvas"></canvas>
// 生成验证码
const codeArr = verifyCode.random(3, 5)
// 绘制到页面上
verifyCode.drawImg(codeArr, '#canvas')
// 完整方法
/**
 * @param {number} type 1: 纯数字;2: 纯字母;3: 数字和字母 
 * @param {number} len 生成的验证码长度
 * @param {boolean} slash 是否显示斜线
 * @param {boolean} point 是否显示点
 */
random(type, len, slash = true, point = true)
```