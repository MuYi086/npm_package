# img-to-base64

[English](./README.md 'English')

![npm](https://img.shields.io/npm/v/@muyi086/img-to-base64) ![npm bundle size](https://img.shields.io/bundlephobia/min/@muyi086/img-to-base64) ![npm](https://img.shields.io/npm/dt/@muyi086/img-to-base64) ![GitHub](https://img.shields.io/github/license/MuYi086/npm_package)

## 安装
```SHELL
npm install @muyi086/img-to-base64
# common JS
const { imgToBase64 } = require('@muyi086/img-to-base64')
# es6
import { imgToBase64 } from '@muyi086/img-to-base64'
```

## 使用
目前仅支持 `pc` ,移动端框架`uniapp` 等会劫持 `canvas` 相关函数,导致无法创建浏览器原生的 `canvas`

```JS
// 未经cors批准加载的数据会导致画布被污染, canvas.toDataURL会报错
// parse 图片 url
const url = 'http://img.qipeiren.com/UploadFile/UserProPic/2019/11/23/4b65b8aadcfb0ac65a91.jpg'
console.log(await imgToBase64.parse(url))
// parse 图片 object
const img = document.getElementById('test')
console.log(await imgToBase64.parse(img))
// useCanvas 图片 object
const img = document.getElementById('test')
console.log(imgToBase64.useCanvas(img))
```

## 函数

函数名|参数|默认|是否必需|描述|
--|--|--|--|--|
parse|字符串/对象||可选|一个图片对象或图片地址|
useCanvas|对象||必填|一个图片对象|

## 注意
一旦您将未经 `CORS` 批准从另一个来源加载的任何数据绘制到画布中，画布就会被污染。受污染的画布不再被认为是安全的，任何从画布检索图像数据的尝试都将导致引发异常。

## 参考
1. [Allowing cross-origin use of images and canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image 'Allowing cross-origin use of images and canvas')
