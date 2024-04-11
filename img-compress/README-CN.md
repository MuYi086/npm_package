# img-compress

[English](./README.md 'English')

![npm](https://img.shields.io/npm/v/@muyi086/img-compress) ![npm bundle size](https://img.shields.io/bundlephobia/min/@muyi086/img-compress) ![npm](https://img.shields.io/npm/dt/@muyi086/img-compress) ![GitHub](https://img.shields.io/github/license/MuYi086/npm_package)

## 安装
```SHELL
npm install @muyi086/img-compress
# common JS
const imgCompress = require('@muyi086/img-compress')
# es6
import imgCompress from '@muyi086/img-compress'
```

## 使用
目前仅支持 `pc` ,移动端框架`uniapp` 等会劫持 `canvas` 相关函数,导致无法创建浏览器原生的 `canvas`

```JS
// 未经cors批准加载的数据会导致画布被污染, canvas.toDataURL会报错
// 压缩图片,返回base64
console.log(imgCompress.compress(imgObj, quality))
// 下载已压缩的图片
console.log(imgCompress.downloadImg(imgObj, name, quality))
```

## 函数

函数名|参数|默认|是否必需|描述|
--|--|--|--|--|
compress|对象||必须|img对象|
compress|数字|1|可选|介于0和1之间的浮点数|
downloadImg|对象||必须|img对象|
downloadImg|字符串||必须|保存新图的名称|
downloadImg|数字|1|可选|介于0和1之间的浮点数|

## 注意
在指定图片格式为 `image/jpeg` 或 `image/webp`的情况下，可以从 `0` 到 `1` 的区间内选择图片的质量

## 参考
1. [HTMLCanvasElement.toDataURL()](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL 'HTMLCanvasElement.toDataURL()')
