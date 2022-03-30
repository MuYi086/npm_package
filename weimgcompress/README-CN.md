## weimgcompress

[English](./README.md 'English')

![npm](https://img.shields.io/npm/v/weimgcompress) ![npm bundle size](https://img.shields.io/bundlephobia/min/weimgcompress) ![npm](https://img.shields.io/npm/dt/weimgcompress) ![GitHub](https://img.shields.io/github/license/ougege/npm_package)

#### 安装
```SHELL
npm install weimgcompress
# common JS
const weimgcompress = require('weimgcompress')
# es6
import weimgcompress from 'weimgcompress'
```

#### 使用
```JS
// 压缩图片,返回base64
console.log(weimgcompress.compress(imgObj, quality))
// 下载已压缩的图片
console.log(weimgcompress.downloadImg(imgObj, name, quality))
```

#### 函数

函数名|参数|默认|是否必需|描述|
--|--|--|--|--|
compress|对象||必须|img对象|
compress|数字|1|可选|介于0和1之间的浮点数|
downloadImg|对象||必须|img对象|
downloadImg|字符串||必须|保存新图的名称|
downloadImg|数字|1|可选|介于0和1之间的浮点数|

#### 注意
在指定图片格式为 image/jpeg 或 image/webp的情况下，可以从 0 到 1 的区间内选择图片的质量

#### 参考
1. [HTMLCanvasElement.toDataURL()](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL 'HTMLCanvasElement.toDataURL()')
