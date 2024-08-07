# img-to-base64

[中文](https://github.com/MuYi086/npm_package/blob/master/img-to-base64/README-CN.md '中文')

![npm](https://img.shields.io/npm/v/@muyi086/img-to-base64) ![npm bundle size](https://img.shields.io/bundlephobia/min/@muyi086/img-to-base64) ![npm](https://img.shields.io/npm/dt/@muyi086/img-to-base64) ![GitHub](https://img.shields.io/github/license/MuYi086/npm_package)

## Install
```SHELL
npm install @muyi086/img-to-base64
# common JS
const { imgToBase64 } = require('@muyi086/img-to-base64')
# es6
import { imgToBase64 } from '@muyi086/img-to-base64'
```

## Use
Currently only supports pc, mobile framework uniapp and others will hijack canvas related functions, causing unable to create the native canvas of the browser.

```JS
// Data loaded without CORS approval will cause the canvas to be polluted, and the canvas.toDataURL will report an error
// parse img url
const url = 'http://img.qipeiren.com/UploadFile/UserProPic/2019/11/23/4b65b8aadcfb0ac65a91.jpg'
console.log(await imgToBase64.parse(url))
// parse img object
const img = document.getElementById('test')
console.log(await imgToBase64.parse(img))
// useCanvas img object
const img = document.getElementById('test')
console.log(imgToBase64.useCanvas(img))
```

## Function

function|parameter|default|required|description|
--|--|--|--|--|
parse|string/object||optional|a img object or img url|
useCanvas|object||required|a img object|


## Tips
As soon as you draw into a canvas any data that was loaded from another origin without `CORS` approval, the canvas becomes tainted.A tainted canvas is one which is no longer considered secure, and any attempts to retrieve image data back from the canvas will cause an exception to be thrown.

## Wiki
1. [Allowing cross-origin use of images and canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image 'Allowing cross-origin use of images and canvas')