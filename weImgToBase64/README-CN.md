## weCal

[English](./README.md 'English')

#### 安装
```SHELL
npm install weimgtobase64
# common JS
const weimgtobase64 = require('weimgtobase64')
# es6
import weimgtobase64 from 'weimgtobase64'
```

#### 使用
```JS
// parse 图片 url
let url = 'http://img.qipeiren.com/UploadFile/UserProPic/2019/11/23/4b65b8aadcfb0ac65a91.jpg'
console.log(weimgtobase64.parse(url))
// parse 图片 object
let img = document.getElementById('test')
console.log(weimgtobase64.parse(img))
// useCanvas 图片 object
let img = document.getElementById('test')
console.log(weimgtobase64.useCanvas(img))
```

#### 函数

函数名|参数|默认|是否必需|描述|
--|--|--|--|--|
parse|字符串/对象||可选|一个图片对象或图片地址|
useCanvas|对象||必填|一个图片对象|

#### 注意
一旦您将未经CORS批准从另一个来源加载的任何数据绘制到画布中，画布就会被污染。受污染的画布不再被认为是安全的，任何从画布检索图像数据的尝试都将导致引发异常。

#### 参考
1. [Allowing cross-origin use of images and canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image 'Allowing cross-origin use of images and canvas')
