# verify-code

[中文](https://github.com/MuYi086/npm_package/blob/master/verify-code/README-CN.md '中文')

![npm](https://img.shields.io/npm/v/@muyi086/verify-code) ![npm bundle size](https://img.shields.io/bundlephobia/min/@muyi086/verify-code) ![npm](https://img.shields.io/npm/dt/@muyi086/verify-code) ![GitHub](https://img.shields.io/github/license/MuYi086/npm_package)

## Install
```SHELL
npm install @muyi086/verify-code
# common JS
const verifyCode = require('@muyi086/verify-code')
# es6
import verifyCode from '@muyi086/verify-code'
```

## Use
```JS
// dom create
<canvas id="canvas"></canvas>
// import and use
verifyCode.random(3, 5)
// full code
/**
 * @param {number} type 1: number;2: letter;3: number + letter 
 * @param {number} len verify code length
 * @param {boolean} slash show slash
 * @param {boolean} point show point
 */
random(type, len, slash = true, point = true)
```